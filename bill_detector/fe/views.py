from django import template
from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import Image
from craft_text_detector import Craft
import pytesseract
import cv2 as cv
from PIL import Image
import os

# Create your views here.
def index(request):
    # all_images = Image.objects.all()
    context = {
        'all_images': 'all_images'
    }
    return render(request, 'index.html', context)

def post_index(request):
    # result = Image.objects.all()
    result = image_process_ocr()
    context = {
        'result': result
    }
    return render(request, 'post_index.html', context)

def detail(request, image_id):
    return HttpResponse('Looking for Image ID' % image_id)

def result(request, image_id):
    return HttpResponse('Looking for Image result' % image_id)

def image_process_ocr():
    abs_path = os.path.dirname(__file__)
    path = abs_path + '/input/7.jpg'
    img = cv.imread(path)
    h, w, c = img.shape
    text = pytesseract.image_to_string(img)
    boxes = pytesseract.image_to_boxes(img)
    for b in boxes.splitlines():
        b = b.split(' ')
        img_box = cv.rectangle(img, (int(b[1]), h - int(b[2])), (int(b[3]), h - int(b[4])), (0, 255, 0), 2)
    print(img_box)
    return boxes