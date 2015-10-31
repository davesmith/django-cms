from django.contrib import admin

# Register your models here.
from mould.models import Mould, MouldDetail, MouldType, Part, JobWork


class MouldAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created', 'updated')


class MouldDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'detail', 'created', 'updated')

    
class MouldTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'detail', 'created', 'updated')
    

class PartAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created', 'updated')
    
  
class JobWorkAdmin(admin.ModelAdmin):
    list_display = ('id', 'job_date', 'client', 'mould', 'mould_detail', 'cavity', 'mould_type', 'part', 'drawing_no', 'challan_no', 'bill_no', 'dispatch_date')
    
    
admin.site.register(Mould, MouldAdmin)
admin.site.register(MouldDetail, MouldDetailAdmin)
admin.site.register(MouldType, MouldTypeAdmin)
admin.site.register(Part, PartAdmin)
admin.site.register(JobWork, JobWorkAdmin)