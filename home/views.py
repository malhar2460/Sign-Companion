import cv2
import numpy as np
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import os
import mysql.connector
from PIL import Image
from .models import *
from .serializer import *
import base64
from django.core.files.base import ContentFile
from io import BytesIO
import cv2
import threading
from django.http import StreamingHttpResponse
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math
import logging
import os
import sys
from django.shortcuts import render
from django.http import HttpResponse, StreamingHttpResponse

from django.views.decorators.csrf import csrf_protect

cv2.setLogLevel(logging.ERROR)

urllib3_logger = logging.getLogger('urllib3')
urllib3_logger.setLevel(logging.CRITICAL)

sys.stderr = open(os.devnull, 'w')

classifier = Classifier('D:/Desktop/Python/facerecognition/backend/home/new_model.h5', 'labels.txt')
label = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

@api_view(['POST'])
def dash(request):
    option = request.data.get('option')
    connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                        host='127.0.0.1', port='3306',
                                        database='sdp')
    cursor = connection.cursor()
    if option == 'sign_to_text_tbl':
        cursor.execute('SELECT img_id, user_id, TO_BASE64(sign) AS sign, letter, translation_date FROM sign_to_text_tbl;')
        result = cursor.fetchall()
        query1 = f"SELECT column_name FROM information_schema.columns WHERE table_schema = 'sdp' AND table_name = '{option}' ORDER BY ORDINAL_POSITION;"
        cursor.execute(query1)
        headers = cursor.fetchall()

        cursor.close()
        connection.close()


        return Response({'res': result, 'headers': headers})
    else:
        if option == "log_in_tbl":
            cursor.execute(f'select USER_ID,EMAIL,FNAME,LNAME,DOB,CREATED_AT from log_in_tbl;')
        else:
            cursor.execute( f'SELECT * FROM {option};')
        result = cursor.fetchall()
        decoded_result = [[item.decode('utf-8') if isinstance(item, bytes) else item for item in row] for row in result]
        query1 = f"SELECT column_name FROM information_schema.columns WHERE table_schema = 'sdp' AND table_name = '{option}' AND column_name != 'passwd' order by ORDINAL_POSITION;"
        cursor.execute(query1)
        headers = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return Response({'res':result,'headers':headers})

from datetime import datetime
@api_view(['POST']) 
def data(request):
    user_id = request.data.get('user_id')
    guest_id = request.data.get('guest_id')
    duration = request.data.get('duration')
    date = request.data.get('date')
    time = request.data.get('time')
    if user_id != 'notfound':
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        time_obj = datetime.strptime(time, '%I:%M:%S %p')

        formatted_time = time_obj.strftime('%H:%M:%S')
        cursor.execute(f"INSERT INTO info (user_id,duration, arrival_date, arrival_time) VALUES ({user_id},{duration}, '{date}', '{formatted_time}')")
        cnn.commit()
    else:
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        time_obj = datetime.strptime(time, '%I:%M:%S %p')

        formatted_time = time_obj.strftime('%H:%M:%S')
        cursor.execute(f"INSERT INTO info (guest_id,duration, arrival_date, arrival_time) VALUES ({guest_id},{duration}, '{date}', '{formatted_time}')")
        cnn.commit()
    return Response({"done":"done"})

@api_view(['GET'])
def get_last_guest_id(request):
    connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                       host='127.0.0.1', port='3306',
                                       database='sdp')
    cursor = connection.cursor()

    query = 'SELECT guest_id FROM guest ORDER BY guest_id DESC LIMIT 1;'
    cursor.execute(query)

    result = cursor.fetchone()

    cursor.close()
    connection.close()

    last_guest_id = result[0] if result else 0 
    return Response({'lastGuestId': last_guest_id})


@api_view(['POST'])
def guest(request):
    guest_id = request.data.get('guest_id')
    print(guest_id)
    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                       host='127.0.0.1', port='3306',
                                       database='sdp')
    cursor = cnn.cursor()

    cursor.execute(f"INSERT INTO `guest` () VALUES({guest_id});")
    cnn.commit()

    cursor.execute("SELECT guest_id FROM guest ORDER BY guest_id DESC LIMIT 1;")
    guest_id = cursor.fetchone()[0]


    return Response({'guest_id': guest_id})


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        passwd = request.data.get('passwd')
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                host='127.0.0.1',port='3306',
                                    database='sdp')
        cursor = cnn.cursor()
        email = False
        cursor.execute(f"select user_id from log_in_tbl where email='{username}'")
        results = cursor.fetchall()
        if len(results) == 0:
            auth = 'Email'
            return Response({'auth':auth,'id':results})
        else:
            email = True
        cursor.execute(f"select user_id from log_in_tbl where email='{username}' AND passwd='{passwd}'")
        results = cursor.fetchall()

        cursor.execute(f"select fname from log_in_tbl where email='{username}' AND passwd='{passwd}'")
        fname = cursor.fetchall()
        cnn.close()
        if len(results) == 0 :
            auth = 'False'
            return Response({'auth':auth})
        else:
            auth = 'True'
            return Response({'auth':auth,'id':results,'fname':fname})



@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        fname = request.data.get('fname')
        lname = request.data.get('lname')
        date = request.data.get('date')
        passwd = request.data.get('passwd')
        email = request.data.get('email')
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                host='127.0.0.1',port='3306',
                                    database='sdp')
        cursor = cnn.cursor()
        insert = "INSERT INTO log_in_tbl (username, passwd, email) VALUES('%s','%s','%s');"
        cursor.execute(f"select email,passwd from log_in_tbl where email='{email}'")
        results = cursor.fetchall()
        if len(results) == 0 :
            auth = 'True'
            cursor.execute(f"INSERT INTO log_in_tbl (fname,lname,dob, passwd, email,created_at) VALUES('{fname}','{lname}','{date}','{passwd}','{email}','{current_time}')")
            cnn.commit()
            state = 'pass'
            cnn.close()
            cursor.close()
        else:
            state = 'False'
            auth = 'False'
   
    return Response({'state':state,'auth':auth})

@api_view(['POST'])
def contact(request):
    fname = request.data.get('fname')
    lname = request.data.get('lname')
    email = request.data.get('email')
    phone = request.data.get('phone')
    msg = request.data.get('msg')
    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
    cursor = cnn.cursor()
    current_time = str(datetime.now().strftime('%Y-%m-%d'))
    cursor.execute("INSERT INTO contact_us_tbl VALUES (%s,%s,%s,%s,%s,%s)", (fname,lname,email,phone,msg,current_time))
    cnn.commit()
    return Response({'res':'The message was sent successfully'})

@api_view(['POST'])
def speech(request):
    transcript = request.data.get('transcript')
    if transcript == '':
        return Response({'response':"Transcript was empty"})
    else:
        user_id = request.data.get('user_id')
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                    host='127.0.0.1',port='3306',
                                    database='sdp')
        cursor = cnn.cursor()
        current_time = str(datetime.now().strftime('%Y-%m-%d'))
        cursor.execute("INSERT INTO speech_to_sign_tbl (user_id, transcript, translation_date) VALUES (%s, %s, %s)", (user_id, transcript, current_time))
        cnn.commit()
        return Response({'response':'Got the message'})

@api_view(['GET'])
def user(request):
    try:
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        cursor.execute("select sign from sign_to_text where user_id=1 order by img_id DESC limit 1")
        results = cursor.fetchone()[0]
        cnn.close()
        # print(results)
        user_id = User(user_id=1)
        img_id = Sign_to_text(img_id = 1)
        img = Sign_to_text(img_id=1,user_id = user_id,sign=results)
        serializer = SignSerializer(img)
        return Response(serializer.data)
    except Sign_to_text.DoesNotExist:
        return Response(status=404)

def write_file(data,file):
    with open(file,'wb') as f:
        f.write(data)

@api_view(['POST'])
def process_text(request):
    if request.method == 'POST':
        text = request.data.get('text')
        user_id = request.data.get('user_id')
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        current_time = str(datetime.now().strftime('%Y-%m-%d'))
        insert = "Insert into text_to_sign_tbl(user_id,text,translation_date) values(%s,%s,%s)"
        cursor.execute(insert,(user_id,text,current_time))
        cnn.commit()
        cnn.close()
        return Response({'message':'done'})
    return Response({'message':'not done'})


import numpy as np

model_path = 'D:/Desktop/Python/facerecognition/backend/home/new_model.h5'
model = load_model(model_path)

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    return img_array

def preprocess_image_from_array(img_array):
    img_array = preprocess_input(img_array)
    return img_array

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input
import numpy as np
import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model('D:/Desktop/Python/facerecognition/backend/home/new_model.h5')

def preprocess_image_from_array(img_array):
    img_array = preprocess_input(img_array)
    return img_array

import cv2

def classify_image_from_array(img_array):
    img_array = cv2.resize(img_array, (224, 224))
    preprocessed_img = preprocess_image_from_array(img_array)
    preprocessed_img = np.expand_dims(preprocessed_img, axis=0)
    
    preprocessed_img = (preprocessed_img * 255.0).astype(np.uint8)
    
    cv2.imwrite('D:/Desktop/Python/facerecognition/backend/home/final_pred.png', cv2.cvtColor(preprocessed_img[0], cv2.COLOR_BGR2RGB))

    prediction = model.predict(preprocessed_img)
    return prediction

from django.core.mail import send_mail
from django.core.mail import get_connection
import string
import secrets

def generate_random_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    random_password = ''.join(secrets.choice(characters) for _ in range(length))
    
    return random_password

@api_view(['POST'])
def mailsenderapi(request):
    inputemail = request.data.get('inputemail', None)
    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
    cursor = cnn.cursor()
    insert = f"select email from log_in_tbl where email = '{inputemail}';"
    cursor.execute(insert)
    result = cursor.fetchall()
    if len(result) == 0:    
        return Response({'status':'failed'})
    else:
        new_password = generate_random_password()
        subject = 'Forogot password'
        message = 'For your account '+inputemail+ ', your new password for Sign Companion website is ' + new_password
        from_email = "malhar.c.prajapati@gmail.com"
        recipient_list = [inputemail]
        email_settings = {
            'host': 'smtp.gmail.com',
            'port': 587,
            'user': 'malhar.c.prajapati@gmail.com',
            'password': 'mzsb mxcx scjy onhc',  
            'use_tls': True,  
        }
        connection = get_connection(
            host=email_settings['host'],
            port=email_settings['port'],
            username=email_settings['user'],
            password=email_settings['password'],
            use_tls=email_settings['use_tls'],
        )
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        insert = f"update log_in_tbl set passwd = '{new_password}' where email = '{inputemail}';"
        cursor.execute(insert)
        cnn.commit()
        cnn.close()
        cursor.close()
        send_mail(
            subject,
            message,
            from_email,
            recipient_list,
            fail_silently=False,
            auth_user=email_settings['user'],
            auth_password=email_settings['password'],
            connection=connection
        )
        return Response({'status':'success'})
    
@api_view(['POST'])
def change_password(request):
    passwd = request.data.get('passwd')
    changed_pass = request.data.get('changed_password')
    inputemail = request.data.get('email')
    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
    cursor = cnn.cursor()
    insert = f"select passwd from log_in_tbl where email = '{inputemail}';"
    cursor.execute(insert)
    print(insert)
    result = cursor.fetchone()
    if result[0] != passwd:
        print(result[0],passwd)
        return Response({'status':'failed'})
    else:
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        insert = f"update log_in_tbl set passwd = '{changed_pass}' where email = '{inputemail}';"
        cursor.execute(insert)
        cnn.commit()
        cnn.close()
        cursor.close()
        return Response({'status':'success'})
    

from datetime import datetime
@api_view(['POST'])
def process_video(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    serialized_data = serializer.data
    user = serialized_data

    flag = False
    if request.method == 'POST':
        print ("Inside the post if")
        flag = True
        image_data = request.data.get('image_data')
        user_id = None
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        if not request.data.get('guest_id') and request.data.get('user_id') != "G" and request.data.get('user_id') != "None" and request.data.get('user_id') != "n":
          user_id = request.data.get('user_id')
          print("USER_ID ",str(user_id))
        elif request.data.get('user_id') == "n":
            user_id = 0
            print("GUEST_ID ",str(user_id))
        print("Original",request.data.get('user_id'))
        id = 1
        if image_data:
            image_data = base64.b64decode(image_data.split(',')[1])
            content_file = ContentFile(image_data)
            image_path = os.path.join('D:/Desktop/Python/facerecognition/image1.png')
            with open(image_path, 'wb') as f:
                f.write(image_data)

            with open(image_path, 'rb') as f:
                img = f.read()
                img1 = f.read()
            cnn.commit()
            cnn.close()
            img = cv2.imread(image_path)

            if img is None:
                return Response({'error': 'Failed to read image file'})
            
            detector = HandDetector(detectionCon=0.61, maxHands=2)
            classifier = Classifier('D:/Desktop/Python/facerecognition/backend/home/new_model.h5','D:/Desktop/Python/facerecognition/labels.txt')
            label = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            result = [] 

            value = 0
            lab_image = cv2.cvtColor(img,cv2.COLOR_BGR2LAB)

            l_channel, a_channel, b_channel = cv2.split(lab_image)

            clahe = cv2.createCLAHE(clipLimit=4.0,tileGridSize=(8,8))
            enhanced_l_channel = clahe.apply(l_channel)

            enhanced_lab_image = cv2.merge((enhanced_l_channel,a_channel,b_channel))
            img = cv2.cvtColor(enhanced_lab_image,cv2.COLOR_LAB2BGR)
            cv2.imwrite('D:/Desktop/Python/facerecognition/image2.png',img)
            hands, _ = detector.findHands(img)
            if hands:
                
                cv2.imwrite('D:/Desktop/Python/facerecognition/image3.png',img)

                blank_image = np.ones_like(img) * 255

                if len(hands) == 1:
                    hand = hands[0]
                    landmarks = hand['lmList']
                    xo, yo, wo, ho = hand['bbox']
                    if len(landmarks) >= 21:
                        for landmark in landmarks:
                            x, y = landmark[:2]
                            cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

                        connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
                                    [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
                                    [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
                        for connection in connections:
                            start_point = landmarks[connection[0]][:2]
                            end_point = landmarks[connection[1]][:2]
                            cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
                    crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image4.png',blank_image)
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image5.png',crop)
                    print("Original Image Shape:", crop.shape)

                    input_image_path = "D:/Desktop/Python/facerecognition/image5.png" 

                    input_image = cv2.imread(input_image_path)
                    input_image = cv2.resize(input_image, (224, 224))
                    input_image = input_image / 255.0 
                    input_image = np.expand_dims(input_image, axis=0)

                    predictions = model.predict(input_image)
                    print(predictions)
                    predicted_class_index = np.argmax(predictions[0])

                    print("Predicted Class Index:", predicted_class_index)
                    class_labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

                    result = class_labels[predicted_class_index]

                    print("Predicted Class Label:", result)
                    
                    print("USer_id from process video",user_id)
                    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                        host='127.0.0.1',port='3306',
                                        database='sdp')
                    cursor = cnn.cursor()

                    current_time = str(datetime.now().strftime('%Y-%m-%d'))
                    cursor.execute("insert into sign_to_text_tbl (user_id,letter,translation_date,sign) values(%s,%s,%s,%s)"
                    ,(user_id,result,current_time,image_data))
                    cnn.commit()
                    return Response({'result': result,'user':user})
                elif len(hands) == 2:
                    x1, y1, w1, h1 = hands[0]['bbox']
                    x2, y2, w2, h2 = hands[1]['bbox']
                    xo = min(x1, x2)
                    yo = min(y1, y2)
                    wo = max(x1 + w1, x2 + w2) - xo
                    ho = max(y1 + h1, y2 + h2) - yo
                    for hand in hands:
                        landmarks = hand['lmList']

                        if len(landmarks) >= 21:
                            for landmark in landmarks:
                                x, y = landmark[:2]
                                cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

                            connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
                                        [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
                                        [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
                            for connection in connections:
                                start_point = landmarks[connection[0]][:2]
                                end_point = landmarks[connection[1]][:2]
                                cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
                    crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image4.png',blank_image)
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image5.png',crop)
                    
                    input_image_path = "D:/Desktop/Python/facerecognition/image5.png"

                    input_image = cv2.imread(input_image_path)
                    input_image = cv2.resize(input_image, (224, 224)) 
                    input_image = input_image / 255.0  
                    input_image = np.expand_dims(input_image, axis=0)

                    predictions = model.predict(input_image)
                    print(predictions)
                    predicted_class_index = np.argmax(predictions[0])

                    print("Predicted Class Index:", predicted_class_index)
                    class_labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

                    result = class_labels[predicted_class_index]

                    print("Predicted Class Label:", result)

                    print("USer_id from process video",user_id)
                    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                        host='127.0.0.1',port='3306',
                                        database='sdp')
                    cursor = cnn.cursor()
                  
                    current_time = str(datetime.now().strftime('%Y-%m-%d')) 
                    cursor.execute("insert into sign_to_text_tbl (user_id,letter,translation_date,sign) values(%s,%s,%s,%s)"
                    ,(user_id,result,current_time,image_data))
                    cnn.commit()
                    return Response({'result': result,'user':user})
            else:
                result.append(' ')


            os.remove(image_path)

            return Response({'result': result,'user':user})
        return Response(image_data)
    else:
        return Response({'error': flag})