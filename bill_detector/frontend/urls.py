from django.urls import path
from django.conf.urls import url
from frontend import views

urlpatterns = [
    path('', views.index),
    path('x/', views.postRequest),
    url(r'^photos/$', views.imageApi)
]