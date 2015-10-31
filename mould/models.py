import datetime
from django.db import models
from client.models import Client
from common.models import BaseModel

# Create your models here.


class Mould(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class MouldDetail(BaseModel):
    detail = models.CharField(max_length=255)

    def __str__(self):
        return self.detail


class MouldType(BaseModel):
    detail = models.CharField(max_length=255)

    def __str__(self):
        return self.detail


class Part(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class JobWork(BaseModel):
    job_date = models.DateField(default=datetime.date.today, null=True, blank=True)
    client = models.ForeignKey(Client, null=True, blank=True, related_name='jobworks')
    mould = models.ForeignKey(Mould, null=True, blank=True, related_name='jobworks')
    mould_detail = models.ForeignKey(MouldDetail, null=True, blank=True, related_name='jobworks')
    cavity = models.IntegerField(null=True, blank=True)
    mould_type = models.ForeignKey(MouldType, null=True, blank=True, related_name='jobworks')
    part = models.ForeignKey(Part, null=True, blank=True, related_name='jobworks')
    drawing_no = models.CharField(max_length=255, null=True, blank=True)
    challan_no = models.CharField(max_length=255, null=True, blank=True)
    bill_no = models.CharField(max_length=255, null=True, blank=True)
    dispatch_date = models.DateField(default=datetime.date.today, null=True, blank=True)

    def __str__(self):
        return 'PE-'+str(100+self.id)



