import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const passwordField = useRef();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const username = usernameField.current.value;
    const password = passwordField.current.value;

    const errors = {};
    if (!username) {
      errors.username = 'The username field must not be empty.'
    }
    if (!password) {
      errors.password = 'The password field must not be empty.'
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // To-do
  };

  return (
    <Body>
      <h1>Log In</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username"
          label="Username or email address"
          error={formErrors.username}
          fieldRef={usernameField}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          error={formErrors.password}
          fieldRef={passwordField}
        />
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
      <hr />
      <p>For new users, register <Link to="/register">here</Link>.</p>
    </Body>
  );
}
