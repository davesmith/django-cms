# Serializers define the API representation.
from rest_framework import serializers, viewsets, routers
from client.api import ClientSerializer
from mould.models import JobWork, Mould, MouldDetail, MouldType, Part


class JobWorkSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        return_obj = super(JobWorkSerializer, self).to_representation(instance)
        return_obj.update({'client': instance.client.name if instance.client else None,
                           'mould': instance.mould.name if instance.mould else None,
                           'mould_detail': instance.mould_detail.detail if instance.mould_detail else None,
                           'mould_type': instance.mould_type.detail if instance.mould_type else None,
                           'part': instance.part.name if instance.part else None})
        return return_obj

    class Meta:
        model = JobWork
        fields = ('id', 'job_date', 'client', 'mould', 'mould_detail', 'cavity', 'mould_type', 'part', 'drawing_no', 'challan_no', 'bill_no', 'dispatch_date')



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
        
        
# ViewSets define the view behavior.
class JobWorkViewSet(viewsets.ModelViewSet):
    queryset = JobWork.objects.all().select_related('client').select_related('part').select_related('mould_detail').select_related('mould_type')
    serializer_class = JobWorkSerializer


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

