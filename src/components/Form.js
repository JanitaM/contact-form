import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import axios from 'axios';

const Form = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    content: ''
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    setIsSending(true);

    axios({
      method: 'post',
      url:
        'https://ln34dstzff.execute-api.us-east-1.amazonaws.com/dev/email/send',
      crossDomain: 'true',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name: values.name,
        email: values.email,
        content: values.content
      }
    })
      .then((response) => {
        setIsSending(false);
        console.log(response);
      })
      .catch((error) => console.log(error));

    setValues({
      name: '',
      email: '',
      content: ''
    });
  };

  return (
    <>
      <h1>Contact Form</h1>
      <p>Send a message</p>

      <form style={{ maxWidth: '600px', margin: '0 auto' }}>
        {isSending ? (
          <Typography component='h4'>Sending...</Typography>
        ) : (
          <>
            <TextField
              style={{ marginBottom: '1rem' }}
              label='Name'
              name='name'
              value={values.name}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '1rem' }}
              label='Email'
              name='email'
              value={values.email}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '1rem' }}
              label='Message'
              name='content'
              value={values.content}
              fullWidth
              onChange={handleChange}
            />
            <Button style={{ margin: '1rem' }} onClick={sendMessage}>
              Send
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default Form;
