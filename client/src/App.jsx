import { useState } from 'react'
import './index.css'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyBlogs from './Pages/MyBlogs';
import CreatePost from './Pages/CreatePost';
import PostDetails from './Pages/PostDetails';
import EditPost from './Pages/EditPost';
import Profile from './Pages/Profile';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import {UserContextProvider} from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/write' element={ <CreatePost/> } />
        <Route path='/posts/post/:id' element={ <PostDetails/> } />
        <Route path='/edit/:id' element={ <EditPost/> } />
        <Route path='/myblogs/:id' element={ <MyBlogs/> } />
        <Route path='/profile/:id' element={ <Profile/> } />
      </Routes>
    </UserContextProvider>
  );
}

export default App
