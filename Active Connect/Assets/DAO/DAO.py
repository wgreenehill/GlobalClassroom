from email.mime import application
from multiprocessing import connection
import mysql.connector 
from mysql.connector import Error


class DAO:
    def __init__(self) -> None:
        pass

    def connect(self):
        try:
            connection = mysql.connector.connect(host='localhost',
                                                database='activeconnect',
                                                user='root',
                                                password='')
            if connection.is_connected():
                db_Info = connection.get_server_info()
                print("Connected to MySQL Server version ", db_Info)

        except Error as e:
            print("Error while connecting to MySQL", e)
        return connection
    def disconnect(self,connection):
        if connection.is_connected():
            connection.close()
            print("MySQL connection is closed")
