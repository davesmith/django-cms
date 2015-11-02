# Serializers define the API representation.
from django.db import models
import django_filters
from rest_framework import serializers, viewsets, routers, filters
from client.api import ClientSerializer
from client.models import Client
from mould.models import JobWork, Mould, MouldDetail, MouldType, Part


class MouldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mould
        fields = ('id', 'name')


class MouldDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = MouldDetail
        fields = ('id', 'detail')


class MouldTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MouldType
        fields = ('id', 'detail')


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = ('id', 'name')


class JobWorkSerializer(serializers.ModelSerializer):

    client = ClientSerializer(allow_null=True)
    mould = MouldSerializer(allow_null=True)
    mould_detail = MouldDetailSerializer(allow_null=True)
    mould_type = MouldTypeSerializer(allow_null=True)
    part = PartSerializer(allow_null=True)

    def validate_client(self, value):
        return (Client.objects.get_or_create(name=value.get("name")))[0] if value else value

    def validate_mould(self, value):
        return (Mould.objects.get_or_create(name=value.get("name")))[0] if value else value

    def validate_mould_detail(self, value):
        return (MouldDetail.objects.get_or_create(detail= value.get("detail")))[0] if value else value

    def validate_mould_type(self, value):
        return (MouldType.objects.get_or_create(detail=value.get("detail")))[0] if value else value

    def validate_part(self, value):
        return (Part.objects.get_or_create(name=value.get("name")))[0] if value else value
    
    class Meta:
        model = JobWork
        fields = ('id', 'job_date', 'client', 'mould', 'mould_detail', 'cavity', 'mould_type', 'part', 'drawing_no', 'challan_no', 'bill_no', 'dispatch_date')


class JobWorkFilter(django_filters.FilterSet):
    filter_overrides = {
        models.CharField: {
            'filter_class': django_filters.CharFilter,
            'extra': lambda f: {
                'lookup_type': 'icontains',
            }
        }
    }

    class Meta:
        model = JobWork
        fields = ('client__name', 'mould__name', 'mould_detail__detail', 'mould_type__detail', 'cavity', 'part__name'
                     ,'drawing_no', 'challan_no', 'bill_no', 'dispatch_date')


# ViewSets define the view behavior.
class JobWorkViewSet(viewsets.ModelViewSet):
    queryset = JobWork.objects.all().select_related('client').select_related('part').select_related('mould_detail')\
        .select_related('mould_type').select_related('part')
    serializer_class = JobWorkSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = JobWorkFilter


class MouldViewSet(viewsets.ModelViewSet):
    queryset = Mould.objects.all()
    serializer_class = MouldSerializer
    search_fields = ('name',)


class MouldTypeViewSet(viewsets.ModelViewSet):
    queryset = MouldType.objects.all()
    serializer_class = MouldTypeSerializer
    search_fields = ('detail',)


class MouldDetailViewSet(viewsets.ModelViewSet):
    queryset = MouldDetail.objects.all()
    serializer_class = MouldDetailSerializer
    search_fields = ('detail',)


class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer
    search_fields = ('name',)

