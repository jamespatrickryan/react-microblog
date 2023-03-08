import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function EditUserPage() {
  const [formErrors, setFormErrors] = useState({});
  const oldPasswordField = useRef();
  const passwordField = useRef();
  const confirmField = useRef();
  const navigate = useNavigate();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    oldPasswordField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordField.current.value !== confirmField.current.value) {
      setFormErrors({confirm: 'New passwords do not match.',});
    } else {
      const response = await api.put('/me', {
        old_password: oldPasswordField.current.value,
        password: passwordField.current.value,
      });
      if (response.ok) {
        setFormErrors({});
        flash('Your password has been reset.', 'success');
        navigate('/me');
      } else {
        setFormErrors(response.body.errors.json);
      }
    }
  };

  return (
    <Body sidebar>
      <h1>Change your password</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="oldPassword"
          label="Old password"
          type="password"
          error={formErrors.old_password}
          fieldRef={oldPasswordField}
        />
        <InputField
          name="password"
          label="New password"
          type="password"
          error={formErrors.password}
          fieldRef={passwordField}
        />
        <InputField
          name="confirm"
          label="Confirm new password"
          type="password"
          error={formErrors.confirm}
          fieldRef={confirmField}
        />
        <Button variant="primary" type="submit">
          Change password
        </Button>
      </Form>
    </Body>
  );
}
