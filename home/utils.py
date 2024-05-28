import cv2
import threading
from django.http import StreamingHttpResponse
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math

import logging

# Disable OpenCV logging
cv2.setLogLevel(logging.ERROR)
logging.basicConfig(filename='opencv.log', level=logging.ERROR)

import os
import sys

# Redirect stderr to null device
sys.stderr = open(os.devnull, 'w')

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def __del__(self):
        self.video.release()

    def get_frame(self):
        image = self.frame
        _, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()

def gen(camera):
    classifier = Classifier('model.h5', 'labels.txt')
    label = ['A','B','C']
    cnt = 0
    detector = HandDetector(detectionCon=0.75, maxHands=2)
    
    while True:
        img = camera.frame
        imgoutput = img.copy()
        hand, img = detector.findHands(img)
        
        if hand:
            success, img = camera.video.read()
            hands, img = detector.findHands(img)

            if hands and len(hands) == 2:
                x1, y1, w1, h1 = hands[0]['bbox']
                x2, y2, w2, h2 = hands[1]['bbox']
                x = min(x1, x2)
                y = min(y1, y2)
                w = max(x1 + w1, x2 + w2) - x
                h = max(y1 + h1, y2 + h2) - y

                crop = img[y - 20:y + h + 20, x - 20:x + w + 20]
                imgwhite = np.ones((300, 300, 3), np.uint8) * 255
                ratio = h / w

                if ratio > 1:
                    k = 300 / h
                    wcal = math.ceil(k * w)
                    imgresize = cv2.resize(crop, (wcal, 300))
                    wgap = math.ceil((300 - wcal) / 2)
                    imgwhite[:, wgap:wcal + wgap] = imgresize
                    prediction, index = classifier.getPrediction(imgwhite)

                else:
                    k = 300 / w
                    hcal = math.ceil(k * h)
                    himgresize = cv2.resize(crop, (300, hcal))
                    hgap = math.ceil((300 - hcal) / 2)
                    imgwhite[hgap:hcal + hgap, :] = himgresize
                    prediction, index = classifier.getPrediction(imgwhite)

                print(label[index])
            else:
                if len(hand) == 1:
                    hand = hand[0]
                    x, y, w, h = hand['bbox']
                    imgwhite = np.ones((300, 300, 3), np.uint8) * 255
                    crop = img[y - 20:y + h + 20, x - 20:x + w + 20]
                    if crop.size != 0:
                        imgcropshape = crop.shape
                        ratio = h / w
                        if ratio > 1:
                            k = 300 / h
                            wcal = math.ceil(k * w)
                            imgresize = cv2.resize(crop, (wcal, 300))
                            imgresizeshape = imgresize.shape
                            wgap = math.ceil((300 - wcal) / 2)
                            imgwhite[:, wgap:wcal + wgap] = imgresize
                            prediction, index = classifier.getPrediction(imgwhite)

                        else:
                            k = 300 / w
                            hcal = math.ceil(k * h)
                            himgresize = cv2.resize(crop, (300, hcal))
                            himgresizeshape = himgresize.shape
                            hgap = math.ceil((300 - hcal) / 2)
                    prediction, index = classifier.getPrediction(imgwhite)

                print(label[index])
                    
        _, jpeg = cv2.imencode('.jpg', img)
        frame = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')



# def gen(camera):
#     classifier = Classifier('model.h5', 'labels.txt')
#     label = ['A','B','C']
#     cnt = 0
#     detector = HandDetector(detectionCon=0.75, maxHands=2)
    
#     while True:
#         img = camera.frame
#         imgoutput = img.copy()
#         hand, img = detector.findHands(img)
        
#         if hand:
#             success, img = camera.video.read()
#             hands, img = detector.findHands(img)

#             if hands and len(hands) == 2:
#                 # Combine the bounding boxes of both hands
#                 x1, y1, w1, h1 = hands[0]['bbox']
#                 x2, y2, w2, h2 = hands[1]['bbox']
#                 x = min(x1, x2)
#                 y = min(y1, y2)
#                 w = max(x1 + w1, x2 + w2) - x
#                 h = max(y1 + h1, y2 + h2) - y

#                 # Crop the combined hand region
#                 crop = img[y - 20:y + h + 20, x - 20:x + w + 20]
#                 imgwhite = np.ones((300, 300, 3), np.uint8) * 255
#                 ratio = h / w

#                 if ratio > 1:
#                     k = 300 / h
#                     wcal = math.ceil(k * w)
#                     imgresize = cv2.resize(crop, (wcal, 300))
#                     wgap = math.ceil((300 - wcal) / 2)
#                     imgwhite[:, wgap:wcal + wgap] = imgresize
#                     prediction, index = classifier.getPrediction(imgwhite)

#                 else:
#                     k = 300 / w
#                     hcal = math.ceil(k * h)
#                     himgresize = cv2.resize(crop, (300, hcal))
#                     hgap = math.ceil((300 - hcal) / 2)
#                     imgwhite[hgap:hcal + hgap, :] = himgresize
#                     prediction, index = classifier.getPrediction(imgwhite)

#                 print(prediction, index)
#             else:
#                 hand = hand[0]
#                 x, y, w, h = hand['bbox']
#                 imgwhite = np.ones((300, 300, 3), np.uint8) * 255
#                 crop = img[y - 20:y + h + 20, x - 20:x + w + 20]
#                 imgcropshape = crop.shape
#                 ratio = h / w

#                 if ratio > 1:
#                     k = 300 / h
#                     wcal = math.ceil(k * w)
#                     imgresize = cv2.resize(crop, (wcal, 300))
#                     imgresizeshape = imgresize.shape
#                     wgap = math.ceil((300 - wcal) / 2)
#                     imgwhite[:, wgap:wcal + wgap] = imgresize
#                     prediction, index = classifier.getPrediction(imgwhite)

#                 else:
#                     k = 300 / w
#                     hcal = math.ceil(k * h)
#                     himgresize = cv2.resize(crop, (300, hcal))
#                     himgresizeshape = himgresize.shape
#                     hgap = math.ceil((300 - hcal) / 2)
#                     imgwhite[hgap:hcal + hgap, :] = himgresize
#                     prediction, index = classifier.getPrediction(imgwhite)

#                 print(prediction, label[index])

#         _, jpeg = cv2.imencode('.jpg', img)
#         frame = jpeg.tobytes()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

