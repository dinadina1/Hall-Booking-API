# Hall Booking API
The Hall Booking API allows users to manage the booking of halls for events or gatherings.
<p>It's developed using by NodeJs, ExpressJs.</p>
<p>API Documentation : https://documenter.getpostman.com/view/33767617/2sA3BobXek</p>
<br>
Base URL : https://hall-booking-api-cyeo.onrender.com
<br><br>
 It provides endpoints to:

## View all available rooms:
### GET /rooms/all
This endpoint returns a list of all available rooms along with their details such as room ID, seating capacity, amenities, and price per hour.
<br>
API URL : https://hall-booking-api-cyeo.onrender.com/rooms/all

## Create a new room:
### POST /rooms/create
This endpoint allows users to create a new room by providing details such as room ID, seating capacity, amenities, and price per hour.
<br>
API URL : https://hall-booking-api-cyeo.onrender.com/rooms/create

## Book a hall:
### POST /booking
Users can book a hall by providing booking details such as customer name, booking date, start time, end time, and room ID. The API checks for room availability and ensures that the requested time slot is not already booked.
<br>
API URL : https://hall-booking-api-cyeo.onrender.com/booking

## View all rooms with booked data:
### GET /viewbooking
This endpoint returns a list of all rooms along with details such as room name, booking status, customer name, booking date, start time, and end time.
<br>
API URL : https://hall-booking-api-cyeo.onrender.com/viewbooking

## View all customers with booked data:
### GET /customers
Users can view all customers who have booked a room, along with booking details such as room name, booking date, start time, and end time.
<br>
API URL : https://hall-booking-api-cyeo.onrender.com/customers

## View all bookings for a particular customer:
### GET /customers/:customerName
This endpoint allows users to view all bookings made by a particular customer. Users need to provide the customer's name as a parameter in the request URL.
<br>
API URL : https://hall-booking-api-cyeo.onrender.com/customers/selva
