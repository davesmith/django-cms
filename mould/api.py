# Serializers define the API representation.
from rest_framework import serializers, viewsets, routers
from mould.models import JobWork


class JobWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobWork
        fields = ('id', 'job_date', 'client', 'mould', 'mould_detail', 'cavity', 'mould_type', 'part', 'drawing_no', 'challan_no', 'bill_no', 'dispatch_date')


# ViewSets define the view behavior.
class JobWorkViewSet(viewsets.ModelViewSet):
    queryset = JobWork.objects.all()
    serializer_class = JobWorkSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'job-work', JobWorkViewSet)
