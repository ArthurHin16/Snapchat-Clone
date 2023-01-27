import { StopRounded } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import ReactTimeago from 'react-timeago'
import "./Chat.css"
import { selectImage } from './features/appSlice'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser} from './features/appSlice';

function Chat({id, profilePic, username, timestamp, imageUrl, read}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const open = () => {
        if(!read) {
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read: true,
                },
                { merge: true }
            );
            navigate('/chats/view');
        }
    };
    return (
        <div onClick={open} className='chat'>
            <Avatar src={user.profilePic} className='chat_avatar'/>
            <div className='chat_info'>
                <h4>{username}</h4>
                <p>
                    {!read && "Tap to view - "} {" "}
                    <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/> 
                </p>
            </div>

            {!read && <StopRounded className='chat_readIcon'/>}
        </div>
    )
}

export default Chat
