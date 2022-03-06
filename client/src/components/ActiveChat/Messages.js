import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const {setShowAvatar, showAvatar,messages, otherUser, userId } = props;
  const latestMessage = messages[messages.length - 1]

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble 
          key={message.id} 
          messageId={message.id}
          showAvatar={showAvatar}
          setShowAvatar={setShowAvatar}
          text={message.text} 
          time={time} 
          latestMessage={latestMessage}
          otherUser={otherUser}/>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
