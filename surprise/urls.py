from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('reply/', views.save_reply, name='save_reply'),
]
