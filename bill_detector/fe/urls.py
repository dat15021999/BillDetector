from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:image_id>/', views.detail, name='detail'),
    path('<int:image_id>/result/', views.result, name='result'),
    path('i/', views.post_index, name="post_index")
]