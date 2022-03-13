import React, { useContext, useEffect } from 'react';
import { Box,Avatar } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import {socket} from '../../context/socket'
import { readStatusContext } from '../../context/ReadMessageContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  avatar:{
    background: '#3F92FF',
    marginRight: 10,
    width:20,
    height:20,
    fontSize:10,
  }
}));

const Chat = ({ conversation, setActiveChat }) => {
  const classes = useStyles();
  const { otherUser } = conversation;

  const [stateMessages, dispatch] = useContext(readStatusContext)
  let anyUnReadMessage = stateMessages.unReadMessages.filter(urm=>urm.senderId===otherUser.id&&urm)

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
    
    if(anyUnReadMessage.length!==0){
      dispatch({type:"reset", message:new Set(anyUnReadMessage)})}
      const unReadMessageIds = anyUnReadMessage.map(urm=>urm.id)
      await axios.patch("/api/messages/read", {"unReadMessageIds":unReadMessageIds});

      socket.emit("read-messages",{type:"read-message"});

  }
  useEffect(() => {
    socket.on("read-messages",(data)=>{dispatch({type:data.type})})
  
    return () => {
      socket.off("read-messages",(data)=>{dispatch({type:data.type})})
    }
  }, [dispatch])
  

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />

      {anyUnReadMessage.length>0 && anyUnReadMessage[0]?.senderId === otherUser.id &&
        <Avatar className={classes.avatar}>{anyUnReadMessage.length}</Avatar>}
    </Box>
  );
};

export default Chat;
