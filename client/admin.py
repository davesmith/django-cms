from django.contrib import admin

# Register your models here.
from client.models import Client


class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'email', 'phone')
    

admin.site.register(Client, ClientAdmin)