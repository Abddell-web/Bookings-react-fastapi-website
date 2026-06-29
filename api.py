from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import mysql.connector
import json
from fastapi import HTTPException


connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="hotel_db"
    )
cursor = connection.cursor(dictionary=True)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   
        "http://127.0.0.1:3000",
        "http://localhost:5173",   
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def complicated():
    cursor.execute("SELECT * FROM hotels")
    hotels_comp = cursor.fetchall()
    for hot in hotels_comp:
      hot["amenities"] = json.loads(hot["amenities"])
      hot["highlights"] = json.loads(hot["highlights"])
    return hotels_comp

complicated_infos = complicated()
class UserCreate(BaseModel):
    username: str
    passw: str

class BookingCreate(BaseModel):
    id_user: int
    id_hotel: int
    payed: int

class Highlight(BaseModel):
    label: str
    value: str

class HotelCreate(BaseModel):
    name: str
    description: str
    rating: int
    img: str
    category: str
    location: str
    price: float
    rooms: int
    founded: int
    checkIn: str
    checkOut: str
    languages: str
    amenities: list[str]
    highlights: list[Highlight]

class HotelUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[int] = None
    img: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    price: Optional[float] = None
    rooms: Optional[int] = None
    founded: Optional[int] = None
    checkIn: Optional[str] = None
    checkOut: Optional[str] = None
    languages: Optional[str] = None
    amenities: Optional[list[str]] = None
    highlights: Optional[list[Highlight]] = None

class BookingCreate(BaseModel):
    id_user: int
    id_hotel: int
    payed: int

def sanitize(value: str) -> str:
    for char in ["'", '"', ";", "--", "#", ")", "("]:
        value = value.replace(char, "")
    return value

@app.post("/api/auth/login")
def user_login(user:UserCreate):
    username = sanitize(user.username)
    cursor.execute("SELECT * FROM users WHERE username = %s and passw = %s",(username,user.passw))
    data = cursor.fetchone()
    if data:
        return data
    return  {"username": "Username  or password incorrect"}

@app.post("/api/auth/register")
def user_register(user: UserCreate):
    username = sanitize(user.username)
    cursor.execute(
        "SELECT id FROM users WHERE username = %s",
        (username,)
    )
    if cursor.fetchone():
        return {"error": "Username already exists"}
    cursor.execute(
        "INSERT INTO users (username, passw) VALUES (%s, %s)",
        (username, user.passw)
    )
    connection.commit()
    return {
        "id": cursor.lastrowid,
        "username": username
    }

@app.get("/api/users")
def users():
    cursor.execute("SELECT * FROM users")
    data = cursor.fetchall()
    return data

@app.get("/api/users/{id_user}")
def user_id(id_user:int):
    cursor.execute(f"SELECT * FROM users WHERE id = {id_user}")
    data = cursor.fetchall()
    return data

@app.put("/api/users/{id_user}")
def modify_user(id_user: int, user: UserCreate):
    data = user.model_dump()
    data["username"] = sanitize(data["username"])
    cursor.execute(
        """
        UPDATE users
        SET
            username = %s,
            passw = %s
        WHERE id = %s
        """,
        (
            data["username"],
            data["passw"],
            id_user
        )
    )
    connection.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": id_user,
        **data
    }

@app.delete("/api/users/{id_user}")
def delete_user(id_user:int):
    cursor.execute(f"DELETE FROM users WHERE id = {id_user}")
    connection.commit()
    return {}

@app.put("/api/users/{id_user}/email")
def update_email(id_user: int, payload: dict):
    email = payload.get("email", "")
    cursor.execute(
        "UPDATE users SET email = %s WHERE id = %s",
        (email, id_user)
    )
    connection.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": id_user, "email": email}
####################
@app.get("/api/hotels", tags=["hotel"])
def hotels():
    return complicated_infos 
@app.post("/api/hotels", tags=["hotel"])
def create_hotels(hotel:HotelCreate):
    new_hotel = hotel.model_dump()

    cursor.execute(
        """
        INSERT INTO hotels
        (name, description, rating, img, category, location, price,
         rooms, founded, checkIn, checkOut, languages, amenities, highlights)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            new_hotel["name"],
            new_hotel["description"],
            new_hotel["rating"],
            new_hotel["img"],
            new_hotel["category"],
            new_hotel["location"],
            new_hotel["price"],
            new_hotel["rooms"],
            new_hotel["founded"],
            new_hotel["checkIn"],
            new_hotel["checkOut"],
            new_hotel["languages"],
            json.dumps(new_hotel["amenities"]),
            json.dumps(new_hotel["highlights"]),
        ),
    )

    connection.commit()

    new_hotel["id"] = cursor.lastrowid
    return new_hotel
@app.get("/api/hotels/{id_hotel}", tags=["hotel"])
def hotels_id(id_hotel: int):
    cursor.execute(
        "SELECT * FROM hotels WHERE id = %s",
        (id_hotel,)
    )

    hotel = cursor.fetchone()

    if hotel is None:
        return {}

    hotel["amenities"] = json.loads(hotel["amenities"])
    hotel["highlights"] = json.loads(hotel["highlights"])

    return hotel
@app.put("/api/hotels/{id_hotel}", tags=["hotel"])
def modify_hotel(id_hotel:int , hotel:HotelUpdate):
    data = hotel.model_dump()

    cursor.execute(
        """
        UPDATE hotels
        SET
            name = %s,
            description = %s,
            rating = %s,
            img = %s,
            category = %s,
            location = %s,
            price = %s,
            rooms = %s,
            founded = %s,
            checkIn = %s,
            checkOut = %s,
            languages = %s,
            amenities = %s,
            highlights = %s
        WHERE id = %s
        """,
        (
            data["name"],
            data["description"],
            data["rating"],
            data["img"],
            data["category"],
            data["location"],
            data["price"],
            data["rooms"],
            data["founded"],
            data["checkIn"],
            data["checkOut"],
            data["languages"],
            json.dumps(data["amenities"]),
            json.dumps(data["highlights"]),
            id_hotel
        )
    )

    connection.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Hotel not found")

    data["id"] = id_hotel
    return data
@app.delete("/api/hotels/{id_hotel}", tags=["hotel"])
def delete_hotel(id_hotel:int):
  cursor.execute("DELETE FROM hotels WHERE id = %s", (id_hotel,))
  connection.commit()
  return {}
#######################
@app.get("/api/bookings", tags=["bookings"])
def bookings():
  cursor.execute("SELECT * FROM bookings")
  data = cursor.fetchall()
  return data
@app.get("/api/bookings/{id_booking}", tags=["bookings"])
def bookings_id(id_booking:int):
    cursor.execute(f"SELECT * FROM bookings WHERE id = {id_booking}")
    data = cursor.fetchone()
    return data
@app.get("/api/bookings/user/{user_id}", tags=["bookings"])
def bookings_user(user_id:int):
  cursor.execute(f"SELECT * FROM bookings where user_id = {user_id}")
  data = cursor.fetchall()
  return data
@app.post("/api/bookings", tags=["bookings"])
def create_booking(booking: BookingCreate):
    cursor.execute(
        """
        INSERT INTO bookings (user_id, hotel_id, payed)
        VALUES (%s, %s, %s)
        """,
        (
            booking.id_user,
            booking.id_hotel,
            booking.payed
        )
    )

    connection.commit()

    return {"id": cursor.lastrowid}
@app.put("/api/bookings/{id_booking}", tags=["bookings"])
def modify_booking(id_booking: int, booking: BookingCreate):
    data = booking.model_dump()

    cursor.execute(
        """
        UPDATE bookings
        SET
            id_user = %s,
            id_hotel = %s,
            payed = %s
        WHERE id = %s
        """,
        (
            data["id_user"],
            data["id_hotel"],
            data["payed"],
            id_booking
        )
    )

    connection.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Booking not found")

    return {
        "id": id_booking,
        **data
    }
@app.delete("/api/bookings/{id_booking}", tags=["bookings"])
def delete_booking(id_booking:int):
  cursor.execute("DELETE FROM bookings WHERE id = %s", (id_booking,))
  connection.commit()
  return {}
#######################
