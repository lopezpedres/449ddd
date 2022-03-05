import React, { useState } from 'react';
import { FormControl, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = ({ setShowAvatar, messages, otherUser, conversationId, user, postMessage, putMessage }) => {
  const classes = useStyles();
  const [text, setText] = useState('');

  const latestMessage = messages[messages.length - 1]
  const handleInputFocus = async () => {

    //Only the recipient can update the messsage
    try {
      if (latestMessage.senderId !== user.id && latestMessage.readStatus === false) {


        const reqBody = {
          text: latestMessage.text,
          conversationId,
          messageId: latestMessage.id,
          recipientId: otherUser.id,
          sender: conversationId ? null : user,
        };

        await putMessage(reqBody);

      }
    } catch (error) {
      console.error(error);

    }

  }

  const handleChange = (event) => {
    setText(event.target.value);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: formElements.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setText('');
    setShowAvatar(false)
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          onFocusCapture={handleInputFocus}
        />
      </FormControl>
    </form>
  );
};

export default Input;
