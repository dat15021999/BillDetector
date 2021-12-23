from django.http.response import JsonResponse
from django.shortcuts import render
import pytesseract
import cv2 as cv
import os
from urllib.request import urlopen
import numpy as np
import json
from imgurpython import ImgurClient
import time

base_path = os.path.dirname(__file__)
client = ImgurClient(client_id='dd9d6daefb1b7a8', client_secret='c8bb7e89fae8303c927e75801ec943330dd6998e')

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

# @csrf_exempt
def imageApi(request):
    if request.method == 'GET':
        return render(request, 'frontend/index.html')

    elif request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        images = json.loads(body_unicode)
        result = []

        texts = image_process_ocr(images)
        start = time.time()
        print('Detecting...')
        for i in range(len(images)):
            item = uploadImage(
                client = client,
                image_path = base_path + '/output/' + images[i],
                image_name = images[i],
                description = "Hóa đơn" if isBill(texts[i]) else "Không phải hóa đơn"
            )
            print(isBill(texts[i]))
            result.append(item)
        end = time.time()
        print('Tổng thời gian:', end - start, 's trên {} yêu cầu'.format(len(images)))
        return JsonResponse(
            [
                getLineBorder(images),
                result
            ],
            safe=False
        )

def image_process_ocr(images):
    result = []

    removeFilesInPath(base_path + "/output")

    for image in images:
        img = cv.imread(base_path + '/input/' + image)
        result.append(pytesseract.image_to_string(img))
        height, width, c = img.shape

        boxes = pytesseract.image_to_boxes(img)
        for b in boxes.splitlines():
            if b[0] == 'H' or b[0] == 'h' or b[0] == 'o' or b[0] == 'O':
                b = b.split(' ')
                x, y, w, h = int(b[1]), int(b[2]), int(b[3]), int(b[4])
                cv.rectangle(img, (x, height - y), (w, height - h), (0, 255, 0), 2)
                cv.putText(img, b[0], (x, height - y + 13), cv.FONT_HERSHEY_SIMPLEX, 0.4, (50, 205, 50), 1)
                
        cv.imwrite(os.path.join(base_path + '/output/', image), img)

    return result


def isBill(text):
    return 'HOA DON' in text or 'Hoa Don' in text or 'Hoa don' in text or 'hoa don' in text

def url_to_image(url, readFlag=cv.IMREAD_COLOR):
    resp = urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    return cv.imdecode(image, readFlag)

def uploadImage(client, image_path, image_name, description):
    
    config = {
        'title': image_name,
        'description': description
    }
    return client.upload_from_path(image_path, config=config, anon=False)

def removeFilesInPath(mydir):
    filelist = [ f for f in os.listdir(mydir) ]
    for f in filelist:
        os.remove(os.path.join(mydir, f))

def getLineBorder(images):
    result = []
    for image in images:
        current_index = 0
        img = cv.imread(base_path + '/input/' + image)
        height, width, c = img.shape
        # result.append(pytesseract.image_to_boxes(img))
        lines = pytesseract.image_to_string(img).splitlines()
        coordinates = pytesseract.image_to_boxes(img).splitlines()
        # print(lines)
        # print(coordinates)
        image_lines = []
        for line in lines:
            collapse_string = line.replace(" ", "")
            if collapse_string != '':
                current_line = []
                length = len(collapse_string)

                while coordinates[current_index] == '~' or collapse_string[0] != coordinates[current_index][0] and collapse_string[-1] != coordinates[current_index + length - 1][0]:
                    current_index += 1
                start_char = coordinates[current_index].split(' ')
                end_char = coordinates[current_index + length - 1].split(' ')

                floor = start_char[2] if start_char[2] < end_char[2] else end_char[2]
                floor = 1 - int(floor)/height

                ceil = start_char[4] if start_char[4] > end_char[4] else end_char[4]
                ceil = 1 - int(ceil)/height

                current_line.append(line)
                current_line.append(round(floor, 3))
                current_line.append(round(ceil, 3))

                image_lines.append(current_line)
                current_index = current_index + length
        result.append(image_lines)

    return result