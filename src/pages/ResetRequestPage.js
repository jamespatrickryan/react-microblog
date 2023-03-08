import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function ResetRequestPage() {
  const [formErrors, setFormErrors] = useState({});
  const emailField = useRef();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    emailField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post('/tokens/reset', {
      email: emailField.current.value,
    });
    if (!response.ok) {
      setFormErrors(response.body.errors.json);
    } else {
      emailField.current.value = '';
      setFormErrors({});
      flash(
        'We have sent you an email with instructions to reset your password',
        'info'
      );
    }
  };

  return (
    <Body>
      <h1>Reset your password</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="email"
          label="Email address"
          error={formErrors.email}
          fieldRef={emailField}
        />
        <Button variant="primary" type="submit">
          Reset password
        </Button>
      </Form>
    </Body>
  );
}
