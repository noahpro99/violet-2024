import pymongo
from pymongo.database import Database

myclient = pymongo.MongoClient(
    "mongodb+srv://noahpro:O2Gia6NohPSWmfYq@cluster0.7lgfviy.mongodb.net/?retryWrites=true&w=majority",
    uuidRepresentation="standard",
)

database_name = "maternal_health_db"
if database_name not in myclient.list_database_names():
    myclient[database_name].create_collection("users")
    myclient[database_name].create_collection("results")

db = myclient.get_database(database_name)


def get_mongo_db() -> Database:
    return db
