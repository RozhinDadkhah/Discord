import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChanel from './SidebarChanel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import { Headset, InfoOutlined } from '@material-ui/icons';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';

function Sidebar() {

    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([])

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map((doc) => ({
                id: doc.id,
                channel: doc.data(),
            })))
        ))
    }, [])

    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel name')
        
        if(channelName){
            db.collection('channels').add({
                channelName:channelName,
            })
        }
    }

    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <h3>rozhin da</h3>
                <ExpandMoreIcon />
            </div>
            <div className='sidebar__chanels'>
                <div className='sidebar__chanelheader'>
                    <div className='sidebar__header'>
                        <ExpandMoreIcon />
                        <h4>Text chanel</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className='sidebar__addchanel' />
                </div>
                <div className='sidebar__chanellist'>
                    {channels.map(({id,channel}) => (
                        <SidebarChanel key={id} id={id} channelName={channel.channelName}/>
                    ))}
                </div>
            </div>
            <div className='sidebar__voice'>
                <SignalCellularAltIcon className='sidebar__voiceIcon' fontSize='large' />
                <div className='sidebar__voiceInfo'>
                    <h3>Voice connected</h3>
                    <p>Stream</p>
                </div>
                <div className='sidebar__voiceIcons'>
                    <InfoOutlined />
                    <CallIcon />
                </div>
            </div>
            <div className='sidebar__profile'>
                <Avatar src={user.photo} onClick={() => auth.signOut()} />
                <div className='sidebar__profileInfo'>
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>
                <div className='sidebar__profileIcons'>
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
