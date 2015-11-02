# Serializers define the API representation.
from rest_framework import serializers, viewsets, routers, filters
from client.models import Client
from mould.models import Mould, MouldType, MouldDetail, Part


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ('id', 'name')


class MouldSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mould
        fields = ('id', 'name')
        
        
class MouldTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MouldType
        fields = ('id', 'detail')
        
        
class MouldDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MouldDetail
        fields = ('id', 'detail')
        
        
class PartSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Part
        fields = ('id', 'name')


# ViewSets define the view behavior.
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    search_fields = ('name',)
