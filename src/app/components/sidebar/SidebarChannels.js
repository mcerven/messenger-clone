import { Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../../firebase';
import { setChannel } from '../../features/channelSlice';
import CustomInput from '../common/CustomInput';
import SidebarChannel from './SidebarChannel';
import './SidebarChannels.css';

function SidebarChannels() {
    const [channels, setChannels] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('channels')
            .onSnapshot(snapshot => {
                const newChannels = snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                ));
                setChannels(newChannels);
            });
    }, []);

    useEffect(() => {
        const selectedChannel = {
            id: null,
            name: null,
        };

        if (channels?.length > 0) {
            selectedChannel.id = channels[0].id;
            selectedChannel.name = channels[0].data.name;
        }
        dispatch(setChannel(selectedChannel));
    }, [channels]);

    return (
        <div className="sidebarChannels">
            <CustomInput placeholder="Search Messenger">
                <Search />
            </CustomInput>
            <div className="sidebarChannels__list">
                {channels.map(({id, data: {name}}) => (
                    <SidebarChannel
                        key={id}
                        id={id}
                        name={name}
                        />
                ))}
            </div>
        </div>
    )
}

export default SidebarChannels;

