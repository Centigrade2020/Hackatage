from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import JSONParser
from .models import get_auth,add_user


def home(request):
    return render(request,"index.html",{})

# print(env("MONGO_CONN"))
@api_view(["POST"])
@parser_classes([JSONParser])
def get_db(request):
    print(get_auth())
    return Response({})

@api_view(["POST"])
@parser_classes([JSONParser])
def create_user(request):
    try:
        if request.data:
            data = request.data
            res = add_user(data['fname'],data['lname'],data['email'],data['passwd'])
            print(res)
            if res:
                return Response({'message':"Success","status_code":201})
            return Response({"message":"User Already Exists","status_code":403})
        
    except Exception as e:
        print(e)
        return Response({"message":"Some error Occurred"})     