from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers
from frontend.models import Photo
from frontend.serializers import ImageSerializer
import pytesseract
import cv2 as cv
import os
from urllib.request import urlopen
import numpy as np
import json

base_path = os.path.dirname(__file__)
from imgurpython import ImgurClient
client = ImgurClient(client_id='dd9d6daefb1b7a8', client_secret='c8bb7e89fae8303c927e75801ec943330dd6998e')

# from .Google import Create_Service
# CLIENT_SECRET_FILE = "/home/datnt/Projects/Django/BillDetector/bill_detector/frontend/client_secrets.json"
# API_NAME = 'drive'
# API_VERSION = 'v3'
# SCOPES = ['https://wwww.googleapis.com/auth/drive']
# service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
# print(dir(service))

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

# @csrf_exempt
def postRequest(request, *args, **kwargs):
    if request.method == "POST":
        return render(request, 'frontend/index.html')


# @csrf_exempt
def imageApi(request):
    if request.method == 'GET':
        images = Photo.objects.all()
        images_serializer = ImageSerializer(images, many=True)
        return render(request, 'frontend/index.html')

    elif request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        images = json.loads(body_unicode)
        result = []

        # image_data = JSONParser().parse(request)
        # image_serializer = ImageSerializer(data=image_data)

        texts = image_process_ocr(images)
        print('Uploading...')
        for i in range(len(images)):
            item = uploadImage(
                client = client,
                image_path = base_path + '/output/' + images[i],
                # album="billdetector",
                image_name = images[i],
                description = "Hoa don" if isBill(texts[i]) else "Khong phai hoa don"
            )
            print(isBill(texts[i]))
            result.append(item)
        
        # if image_serializer.is_valid():
        #     print('req', image_serializer.data)
        # #     process OCR
        # #     image_serializer.save()
        #     return JsonResponse(image_serializer.data, safe=False)
        # else:
        #     return HttpResponse('Object is invalid!')
        return JsonResponse(result, safe=False)

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
        # 'album': album,
        # 'name': image_name,
        'title': image_name,
        'description': description
    }
    return client.upload_from_path(image_path, config=config, anon=False)

def removeFilesInPath(mydir):
    filelist = [ f for f in os.listdir(mydir) ]
    for f in filelist:
        os.remove(os.path.join(mydir, f))