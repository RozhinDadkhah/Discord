import React from 'react'
import { useDispatch } from 'react-redux'
import './SidebarChanel.css'
import { setChannelInfo } from '../../features/appSlice'

function SidebarChanel({ id, channelName }) {
    const dispatch = useDispatch()
    return (
        <div className='sidebarchanel' onClick={() => dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName,
        }))}>
            <h4><span className='sidebarchanel__hash'>#</span>{channelName}</h4>
        </div>
    )
}

export default SidebarChanel
