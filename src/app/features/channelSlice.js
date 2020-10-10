import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        id: null,
        name: null,
    },
    reducers: {
        setChannel: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
        }
    }
});

export const { setChannel } = channelSlice.actions;

export const selectChannelId = state => state.channel.id;
export const selectChannelName = state => state.channel.name;

export default channelSlice.reducer;
