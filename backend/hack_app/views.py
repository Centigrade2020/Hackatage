from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import make_password,check_password
from .models import get_auth,add_user,get_user,authenticate,chk_auth,logout_user,u_user,add_data
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


@api_view(["POST"])
@parser_classes([JSONParser])
def getUser(request):
    try:
        data =request.data
        user = get_user(data['email'])
        return Response({"message":json.loads(json_util.dumps(user))})
    except Exception as e:
        print("get user",e)
        return Response({"message":"Some error Occurred"})

@api_view(["POST"])
@parser_classes([JSONParser])
def update_user(request):
    try:
        data = request.data
        print(data['email'])
        u_user(data['email'],data['phone'],data['day'],data['month'],data['year'],data['city'],data['state'],data['country'])
        user = get_user(data['email'])
        return Response({"message":json.loads(json_util.dumps(user))})
    except Exception as e:
        print("update user ",e)
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
            print(chk)
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
    logout_user(data['id'])

@api_view(["POST"])
@parser_classes([JSONParser])
def ask_ai(request):
    print("hi")
    data = request.data
    # message = "Generate list of jsons of 3 itineraries for"+str(data['days'])+ "days in"+data['city']+"with budget "+str(data['budget'])+" in json format of example {'_id':,'plan':[{'day':1,'activities':{'time':'','description':'','budget':'Rs '}},],'Total_Budget':'Rs ','key':"+data['days']+"_"+data['city']+"} only as list of json not any text"
    message = "Generate list of jsons of 3 itineraries for"+str(data['days'])+ "days in"+data['city']+"with budget "+str(data['budget'])+""" in json format of example  [{_id:"643a9091a7e8be42cd8ac139",
      plan: [
        {
          day: 1,
          activities: [
            {
              time: "9:00 AM",
              description: "Arrive in Dubai and check-in to hotel",
            },
            {
              time: "11:00 AM",
              description: "Visit the Dubai Mall",
            },
            {
              time: "3:00 PM",
              description: "Take a tour of the Burj Khalifa",
            },
            {
              time: "7:00 PM",
              description: "Experience the Dubai Fountain show",
            },
          ],
        },
        {
          day: 2,
          activities: [
            {
              time: "10:00 AM",
              description: "Visit the Palm Jumeirah Island",
            },
            {
              time: "2:00 PM",
              description: "Relax at the Jumeirah Beach",
            },
            {
              time: "7:00 PM",
              description: "Dine at the Burj Al Arab",
            },
          ],
        },
        {
          day: 3,
          activities: [
            {
              time: "9:00 AM",
              description: "Explore the Dubai Miracle Garden",
            },
            {
              time: "1:00 PM",
              description: "Visit the Dubai Museum",
            },
            {
              time: "5:00 PM",
              description: "Shop at Souk Madinat Jumeirah",
            },
            {
              time: "8:00 PM",
              description: "Experience nightlife at the Dubai Marina",
            },
          ],
        },
      ],
      key: "3-dubai,ae",
    },
    {
      _id: "643a8f77a7e8be42cd8ac137",
      plan: [
        {
          day: 1,
          activities: [
            {
              time: "9:00 AM",
              description: "Arrive at Ngurah Rai International Airport",
            },
            {
              time: "11:00 AM",
              description: "Check-in to hotel",
            },
            {
              time: "1:00 PM",
              description: "Lunch at Warung Nasi Ayam Bu Oki",
            },
            {
              time: "3:00 PM",
              description: "Visit Tanah Lot Temple",
            },
            {
              time: "6:00 PM",
              description: "Dinner at La Lucciola",
            },
          ],
        },
        {
          day: 2,
          activities: [
            {
              time: "7:00 AM",
              description: "Breakfast at hotel",
            },
            {
              time: "9:00 AM",
              description: "Visit Tegallalang Rice Terraces",
            },
            {
              time: "12:00 PM",
              description: "Lunch at Bebek Tepi Sawah Restaurant",
            },
            {
              time: "3:00 PM",
              description: "Visit Ubud Monkey Forest",
            },
            {
              time: "6:00 PM",
              description: "Dinner at Warung Enak",
            },
          ],
        },
        {
          day: 3,
          activities: [
            {
              time: "6:00 AM",
              description: "Depart for Mount Batur sunrise trek",
            },
            {
              time: "11:00 AM",
              description: "Return from trek and have late breakfast",
            },
            {
              time: "1:00 PM",
              description: "Visit Tirta Empul Temple",
            },
            {
              time: "4:00 PM",
              description: "Relax at Kuta Beach",
            },
            {
              time: "8:00 PM",
              description: "Farewell dinner at Bambu Restaurant",
            },
          ],
        },
      ],
      key: "3-bali,id",
    }] """
    
    if message:
        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages= [ {"role": "system", "content": message} ]
        )
        
    reply = chat.choices[0].message.content
    # add_data(reply)
    print(reply)
    return Response(reply.strip())

@api_view(["POST"])
@parser_classes([JSONParser])
def flight(request):
    print("hello")
    data = request.data
    # message = 
