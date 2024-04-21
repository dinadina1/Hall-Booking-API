const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sample Rooms data
let rooms = [
  {
    roomId: "R1",
    seatsAvailable: "4",
    amenities: "tv,ac,heater",
    pricePerhr: "100",
  },
];

// Sample Bookings data
let bookings = [
  {
    customer: "Selva",
    bookingDate: "03-07-2023",
    startTime: "12:00 PM",
    endTime: "11:59 AM",
    bookingID: 1,
    roomId: "R1",
    status: "booked",
  },
];

// Function to convert 12-hour time format to 24-hour format
const convertTo24HourFormat = (time12h) => {
  var [time, modifier] = time12h.split(" ");
  var [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return hours + ":" + minutes + ":00";
};


// API to get all rooms
app.get("/rooms/all", (req, res) => {
  res.status(200).json({ roomsList: rooms });
});


// API to create a new room
app.post("/rooms/create", (req, res) => {
  const newRoom = req.body;
  const idExists = rooms.some((room) => room.roomId === newRoom.roomId);
  if (!idExists) {
    rooms.push(newRoom);
    return res
      .status(200)
      .json({ newRoom, message: "Room created successfully" });
  } else {
    return res.status(400).json({ message: "Room ID already exists" });
  }
});


// API to booking hall
app.post("/booking", async (req, res) => {
  const data = req.body;
  const roomExists = rooms.find((room) => room.roomId == data.roomId);

  // Check roomID exists or not
  if (roomExists == undefined) {
    return res.status(400).json({ message: "Room ID does not exist" });
  } else {
    const id = bookings.length
      ? bookings[bookings.length - 1].bookingID + 1
      : 1;
    data.bookingID = id;
    data.status = "booked";

    let dateCheck = bookings.filter(
      (status) =>
        status.bookingDate == data.bookingDate && status.roomId == data.roomId
    );


    // Check room is already booked or not
    let timeCheck = dateCheck.filter((time) => {
      let times = new Date(
        `${data.bookingDate} ${convertTo24HourFormat(data.startTime)}`
      );
      let times1 = new Date(
        `${data.bookingDate} ${convertTo24HourFormat(data.endTime)}`
      );
      let start = new Date(
        `${time.bookingDate} ${convertTo24HourFormat(time.startTime)}`
      );
      let end = new Date(
        `${time.bookingDate} ${convertTo24HourFormat(time.endTime)}`
      );

      // Check given time is between start and end time
      let givenStart = parseFloat(`${times.getHours()}.${times.getMinutes()}`);
      let givenEnd = parseFloat(`${times1.getHours()}.${times1.getMinutes()}`);
      let startTime = parseFloat(`${start.getHours()}.${start.getMinutes()}`);
      let endTime = parseFloat(`${end.getHours()}.${end.getMinutes()}`);

      return givenStart < endTime && givenEnd > startTime;
    });

    if (timeCheck.length) {
      return res
        .status(400)
        .json({ message: "Room is already booked at this date and time" });
    } else {
      bookings.push(data);
      res.status(200).json({ bookings });
    }
  }
});


// API to view all rooms with booking
app.get("/viewbooking", (req, res) => {
  const allBooking = bookings.map((booking) => {
    const room = rooms.find((room) => room.roomId === booking.roomId);
    return {
      roomName: room.roomId,
      bookedStatus: booking.status,
      customerName: booking.customer,
      date: booking.bookingDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });
  if (allBooking.length) {
    res.status(200).json({ allBooking });
  } else {
    res.status(400).json({ message: "No Booking Found" });
  }
});


// API to view all customers with booked data
app.get("/customers", (req, res) => {
  const allCustomers = bookings.map((customer) => {
    return {
      customerName: customer.customer,
      roomName: customer.roomId,
      date: customer.bookingDate,
      startTime: customer.startTime,
      endTime: customer.endTime,
    };
  });
  if (allCustomers.length) {
    res.status(200).json({ allCustomers });
  } else {
    res.status(400).json({ message: "No Customers Found" });
  }
});


// API to view all bookings for a particular customer
app.get("/customers/:customerName", (req, res) => {
  const customerName = req.params.customerName;
  const customerBookings = bookings.filter(
    (booking) => booking.customer.toLowerCase() === customerName.toLowerCase()
  );
  if (customerBookings.length) {
    res.status(200).json({ customerBookings });
  } else {
    res.status(400).json({ message: "No Bookings Found" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

