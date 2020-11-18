import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

const Form = () => {
  const [values, setValues] = useState({
    name: '',
    message: ''
  });

  const handleChange = (e) => {
    console.log(e);
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/postMessage',
      data: {
        name: values.name,
        message: values.message
      }
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    setValues({
      name: '',
      message: ''
    });
  };

  return (
    <>
      <h1>Contact Form</h1>
      <p>Send me a message</p>

      <form style={{ maxWidth: '600px', margin: '0 auto' }}>
        <TextField
          label='Name'
          name='name'
          value={values.name}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label='Message'
          name='message'
          value={values.message}
          fullWidth
          onChange={handleChange}
        />
        <Button style={{ margin: '1rem' }} onClick={sendMessage}>
          Send
        </Button>
      </form>
    </>
  );
};

export default Form;
