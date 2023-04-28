from django.urls import path

from . import views

urlpatterns = [
    path('test-get', views.test_get),
    path('test-post', views.test_post),
    path('get-authorize-url', views.get_authorize_url)
]
