import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#91A3C0',
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: 'bold',
  },
  bubble: {
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
  },
  avatar: {
    height: 20,
    width: 20,
    marginLeft: 11,
    marginTop: 6,
  },
}));

const SenderBubble = ({LatestMessage,setShowAvatar, showAvatar,time, text, readStatus, otherUser, messageId }) => {
  const classes = useStyles();
  useEffect(() => {
    if (LatestMessage.readStatus && messageId === LatestMessage.id)
      setShowAvatar(true)
      
    }
  , [setShowAvatar,messageId,LatestMessage.readStatus,LatestMessage.id])
  


  return (
    <Box className={ classes.root }>
      <Typography className={ classes.date }>{ time }</Typography>
      <Box className={ classes.bubble }>
        <Typography className={ classes.text }>{ text }</Typography>
      </Box>
      { showAvatar && messageId === LatestMessage.id  ?

        <Avatar
          alt={ otherUser.username }
          src={ otherUser.photoUrl }
          className={classes.avatar}
        /> :
        null }
    </Box>
  );
};

export default SenderBubble;
