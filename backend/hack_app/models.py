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

def add_user(fname,lname,email,password) -> bool:
    coll = dbname['users']
    user = coll.find({"email":email})
    for i in user:
        if i['email']:
            return False
    coll.insert_one({"fname":fname,"lname":lname,"email":email,"password":password})
    return True
   
    

    # return user