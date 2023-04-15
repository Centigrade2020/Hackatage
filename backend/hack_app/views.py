from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import make_password,check_password
from .models import get_auth,add_user,get_user,authenticate,chk_auth,logout_user
from bson import json_util
import json
import openai
import environ

env = environ.Env()
environ.Env.read_env()

openai.api_key=env("OPENAI_KEY")

def home(request):
    return render(request,"index.html",{})

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
            hash_pass = make_password(data['passwd'])
            res = add_user(data['fname'],data['lname'],data['email'],hash_pass)
            print(res)
            if res:
                login(data['email'],data['passwd'])
                return Response({'message':"Success","status_code":201})
            return Response({"message":"User Already Exists","status_code":403})
        
    except Exception as e:
        print("Sign Up error ",e)
        return Response({"message":"Some error Occurred"})     



def login(email,password):
    try :
        user = get_user(email)
        for i in user:
            if i:
                passwd = i['password']
        if check_password(password,passwd):
            u = authenticate(i["_id"]) 
            return u
        else:
            return False
    except Exception as e:
        print("login ",e)
        return False

@api_view(["POST"])
@parser_classes([JSONParser])
def login_user(request):
    try:
        if request.data:
            data = request.data
            chk = login(data['email'],data['passwd'])
            if chk:
                print(json.loads(json_util.dumps(chk)))
                return Response({'message':json.loads(json_util.dumps(chk)),"status_code":200,"is_authenticated":chk['is_authenticated']})
            else:
                return Response({"message":"wrong Password"})
    except Exception as e:
        print("login error: ",e)
        return Response({"message":"Some error occured"})

@api_view(["POST"])
@parser_classes([JSONParser])
def logout(request):
    data = request.data
    logout_user(data['email'])

@api_view(["POST"])
@parser_classes([JSONParser])
def ask_ai(request):
    print("hi")
    data = request.data
    req_json={
    '_id':'',
    'Plan':[
        {
        'day':1,
        'activities':
            {
            'time':'',
            'description':'',
            'budget':'Rs '
            }
        },
    ],
    'Total_Budget':'Rs '
    }
    message = "Generate itinerary for"+str(data['days'])+ "days in"+data['city']+"with budget "+str(data['budget'])+" in json format of example {'_id':'','Plan':[{'day':1,'activities':{'time':'','description':'','budget':'Rs '}},],'Total_Budget':'Rs '}"
    
    if message:
        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages= [ {"role": "system", "content": message} ]
        )
        
    reply = chat.choices[0].message.content
    print(reply)
    return Response(reply)
