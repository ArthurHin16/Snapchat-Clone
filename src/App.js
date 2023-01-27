import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture"
import Preview from './Preview';
import Chats from './Chats'
import ChatView from './ChatView';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login/>
        ): (
          <>
            <img  className='app_logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c536.png" alt="snapchat"/>
            <div className='app_bodyBackground'>
              <div className='app_body'>
                <Routes>
                  <Route path="/chats/view" element={<ChatView />}/>
                  <Route path="/chats" element={<Chats />}/>
                  <Route path="/preview" element={<Preview />}/>
                  <Route exact path="/" element={<WebcamCapture />}></Route>
                </Routes>
              </div>
            </div>
          </>
          
        )}
      </Router>
    </div>
  );
}

export default App;
