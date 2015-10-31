"""cms URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from rest_framework import routers
from mould.api import JobWorkViewSet, PartViewSet, MouldViewSet, MouldTypeViewSet, MouldDetailViewSet
from client.api import ClientViewSet

from web import views as web_views

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'job-work', JobWorkViewSet)
router.register(r'client', ClientViewSet)
router.register(r'mould', MouldViewSet)
router.register(r'mould-type', MouldTypeViewSet)
router.register(r'mould-detail', MouldDetailViewSet)
router.register(r'part', PartViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', auth_views.login, {'extra_context': {'next': '/'}}),
    url(r'^logout/$', auth_views.logout),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^$',web_views.index)
]