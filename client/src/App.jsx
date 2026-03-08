import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Uhome from './pages/Uhome';
import Cabs from './pages/Cabs';
import BookCab from './pages/BookCab';
import Mybookings from './pages/Mybookings';

import Alogin from './pages/Alogin';
import Aregister from './pages/Aregister';
import Ahome from './pages/Ahome';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import Bookings from './pages/Bookings';
import Acabs from './pages/Acabs';
import Acabedit from './pages/Acabedit';
import Addcar from './pages/Addcar';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/uhome" element={<Uhome />} />
      <Route path="/cabs" element={<Cabs />} />
      <Route path="/bookcab/:id" element={<BookCab />} />
      <Route path="/mybookings" element={<Mybookings />} />

      <Route path="/admin/login" element={<Alogin />} />
      <Route path="/admin/register" element={<Aregister />} />
      <Route path="/admin/home" element={<Ahome />} />
      
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/users/edit/:id" element={<UserEdit />} />
      
      <Route path="/admin/bookings" element={<Bookings />} />
      
      <Route path="/admin/cabs" element={<Acabs />} />
      <Route path="/admin/cabs/edit/:id" element={<Acabedit />} />
      <Route path="/admin/cabs/add" element={<Addcar />} />
    </Routes>
  );
};

export default App;