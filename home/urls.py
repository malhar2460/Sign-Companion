from django.urls import path
from . import views

urlpatterns = [
    # path('', views.hand_tracking, name='hand_tracking'),
    # path('handtracking/video/', views.hand_tracking_video, name='hand_tracking_video'),
    # path('',views.Home1),

    # path('try/',views.VideoCamera),
    # path('',views.index),
    path('dash/',views.dash),
    path('data/',views.data),
    path('user/',views.user),
    path('login/',views.login),
    path('contact/',views.contact),
    path('guest/',views.guest),
    path('guest_last/',views.get_last_guest_id),
    path('text/',views.process_text),
    path('speech/',views.speech),
    path('signup/',views.signup),
    path('mail/',views.mailsenderapi),
    path('change_password/',views.change_password),
    path('video-stream/', views.process_video, name='video_stream'),
    # path('prediction/', views.get_hand_gesture_prediction, name='prediction'),
 
    # path('',views.predict)
]
