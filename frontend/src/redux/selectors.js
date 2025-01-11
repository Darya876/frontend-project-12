import { createSelector } from '@reduxjs/toolkit';
import { selectors as channelsSelectors } from './channelsSlice.js';
import { selectors as messagesSelectors } from './messagesSlice';


export const getAllChannels = (state) => channelsSelectors.selectAll(state);
export const getAllMessages = (state) => messagesSelectors.selectAll(state);

export const getCurrentChannelId = (state) => state.channels.getCurrentChannelId;
export const getModalChannel = (state) => channelsSelectors.selectById(state, state.modal.channelId);
export const getCurrentChannel = createSelector((state) => state, getCurrentChannelId, (state, currentChannelId) => channelsSelectors.selectById(state, currentChannelId));
export const getCurrentChannelMessages = createSelector([getAllMessages, getCurrentChannelId], (allMessages, currentChannelId) => allMessages.filter(({ channelId }) => channelId === currentChannelId));

