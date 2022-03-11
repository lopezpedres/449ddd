import React from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';

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
      const unReadMessageIds = anyUnReadMessage.map(irm=>irm.id)
      await axios.patch("/api/messages/read", {"unReadMessageIds":unReadMessageIds});

  }


  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />

      {anyUnReadMessage?.length>0 && anyUnReadMessage[0].senderId === otherUser.id &&
        <Avatar className={classes.avatar}>{anyUnReadMessage.length}</Avatar>}
    </Box>
  );
};

export default Chat;
