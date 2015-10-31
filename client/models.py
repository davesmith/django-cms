from django.db import models
from common.models import BaseModel

# Create your models here.


class Client(BaseModel):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=16, null=True, blank=True)

    def __str__(self):
        return self.name
