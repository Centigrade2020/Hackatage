from django.urls import path
from . import views

urlpatterns=[
    path("",views.home,name='home'),
    path("test",views.get_db,name='test'),
    path("create_user",views.create_user,name='cus'),
    path("login_user",views.login_user,name='lus'),
]