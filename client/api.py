# Serializers define the API representation.
from rest_framework import serializers, viewsets, routers, filters
from client.models import Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name')



# ViewSets define the view behavior.
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    search_fields = ('name',)
