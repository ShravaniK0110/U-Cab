Ucab - Cab Booking App
Ucab is a cab booking web app built with the MERN stack. Users can browse available cabs, book rides, and track their booking history. Admins can manage cabs, users, and bookings from a separate dashboard.

Team

Shravani Kurumbhatte — Team Lead
Aashna Patil — Member
Varun Pame — Member

Tech Stack

Frontend: React.js, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Auth: JWT, bcryptjs


Getting Started
Make sure you have Node.js and MongoDB installed on your machine.
Backend
bashcd server
npm install
npm run dev
Create a .env file in the server folder:
MONGO_URI=mongodb://localhost:27017/ucab
JWT_SECRET=ucabsecretkey123
PORT=8000
Frontend
bashcd client
npm install
npm run dev
Open http://localhost:5173 in your browser.

How It Works
Users register, browse cabs, and book rides by selecting a pickup and drop location with a date and time. The app calculates the fare before confirming the booking.
Admins have a separate login where they can add and manage cabs, view all registered users, and monitor bookings through a dashboard.

API Overview

/api/users — register, login, manage users
/api/admin — admin register and login
/api/cars — add, edit, delete, view cabs
/api/bookings — create and view bookings
