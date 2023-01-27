import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Chats.css'
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Chat from './Chat';
import { db } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    }

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) => 
                setPosts(
                    snapshot.docs.map(doc => ({
                    id:doc.id,
                    data: doc.data(),
                }))
            )
        );
    },[])

    const takeSnap = () => {
        navigate('/')
    }

    return (
        <div className='chats'>
            <div className='chats_header'>
                <Avatar src={user.profilePic} onClick={signOut} className='chats_avatar'/>
                <div className='chats_search'>
                    <SearchIcon className='chats_searchIcon' />
                    <input placeholder='Friends' type="text"/>
                </div>
                <ChatBubbleIcon className='chats_chatIcon'/>
            </div>

            <div className='chat_posts'>
                {posts.map(
                    ({  id, 
                        data: {profilePic, username, timestamp, imageUrl, read}
                    }) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>
            <RadioButtonUncheckedIcon
                className="chats_takePicIcon"
                onClick={takeSnap}
                fontSize='large'
            />
        </div>
    )
}

export default Chats
