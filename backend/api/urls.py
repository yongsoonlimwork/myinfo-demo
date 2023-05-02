from django.urls import path

from . import views

urlpatterns = [
    path('authorize-url', views.get_authorize_url, name='authorize-url'),
    path('person-info', views.get_person_info, name='person-info'),
    path('person-info-sample', views.get_person_info_sample, name='person-info-sample')
]
