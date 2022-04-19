from DAO import DAO 
class Events(DAO):

    def __init__(self) -> None:
        super().__init__()

    def getEvents(self):
        
        con = super().connect()
        cursor = con.cursor()
        cursor.execute("select * from event;")
        events = cursor.fetchall()
        for event in events:
            print(event)
        super().disconnect(con)
    
    def getEventByMonth(self, month, year):

        try:

            con = super().connect()
            cursor = con.cursor()
            print(year)
            sqlSelectQuery = "select * from event where month = %s and year = %s;"
            queryParameters = (month, year)
            cursor.execute(sqlSelectQuery,queryParameters)
            events = cursor.fetchall()
            for event in events:
                print(event)
        except Error as e:
            print("no event")
        finally:
            super().disconnect(con)



e = Events()
e.getEvents()
e.getEventByMonth(5,2022)
e.getEventByMonth(7,2022)


