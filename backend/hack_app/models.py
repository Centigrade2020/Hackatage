import pymongo
import environ

env = environ.Env()
environ.Env.read_env()

client = pymongo.MongoClient((env("MONGO_CONN")))
dbname = client['TripDB']



def get_auth():
    coll = dbname['users']
    user = coll.find_one({'email':"dd@gmail.com",'password':"123"})
    return user

def add_user(fname,lname,email,password):
    coll = dbname['users']
    user = coll.find({"email":email})
    for i in user:
        if i['email']:
            return False
    coll.insert_one({"fname":fname,"lname":lname,"email":email,"password":password})

    return True
   
def get_user(email):
    coll = dbname['users']
    user = coll.find({"email":email})
    for i in user:
        if i:
            return i
        return None
def authenticate(userId):
    coll = dbname['users']
    coll.update_one({"_id":userId},{"$set":{"is_authenticated":True}})
    user = coll.find_one({"_id":userId})
    return user

def chk_auth(userId):
    coll = dbname['users']
    user = coll.find_one({"_id":userId})
    return user['is_authenticated']

def logout_user(email):
    coll = dbname['email']
    coll.update_one({"email":email},{"$set":{"is_authenticated":False}})

def add_data(data,email ):
    coll=dbname['user_trips']
    coll.insert_one({"data":data.strip(),"email":email})
    print(data.strip())
#         phone,
#         day,
#         month,
#         year,
#         city,
#         state,
#         country

def booking(data):
    print(data['_id'])
    # print(data['plan'])
    # print(data['flight'])
    # print(data['hotel'])
    # print(data['email'])
    coll = dbname['bookings']
    coll.insert_one({"_id":data["_id"],"email":data['email'],"plan":data['plan'],"hotel":data['hotel']})

def get_book_data(email):
    coll = dbname['bookings']
    user = coll.find_one({"email":email})
    return user




def u_user(userId,phone,day,month,year,city,state,country):
    coll = dbname['users']
    coll.update_one({"email":userId},{"$set":{"phone":phone,"day":day,"month":month,"year":year,"city":city,"state":state,"country":country}})

    
