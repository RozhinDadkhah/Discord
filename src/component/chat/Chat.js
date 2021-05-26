import React, { useEffect, useState } from 'react'
import './Chat.css'
import Chatheader from './Chatheader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectChannelName, selectChannelId } from '../../features/appSlice';
import db from '../../firebase'
import firebase from 'firebase'

function Chat() {
    const channelId = useSelector(selectChannelId)
    const user = useSelector(selectUser)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])


    useEffect(() => {
        if (channelId) {
            db.collection("channels").doc(channelId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault()

        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("")
    }

    return (
        <div className='chat'>
            <Chatheader channelName={channelName} />
            <div className='chat__messages'>
                {messages.map((message) => (
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                    />
                ))}
            </div>
            <div className='chat__input'>
                <AddCircleIcon fontSize='large' />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder={`Message ${channelName}`} disabled={!channelId} />
                    <button className='chat__inputbutton' type='submit' disabled={!channelId} onClick={sendMessage}>Send Message</button>
                </form>
                <div className='chat__inputicons'>
                    <CardGiftcardIcon fontSize='large' />
                    <GifIcon fontSize='large' />
                    <EmojiEmotionsIcon fontSize='large' />
                </div>
            </div>
        </div>
    )
}

export default Chat
