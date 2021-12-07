from rest_framework import serializers
from frontend.models import Photo

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['Id', 'source', 'isBill']