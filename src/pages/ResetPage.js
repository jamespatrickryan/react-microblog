import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function EditUserPage() {
  const [formErrors, setFormErrors] = useState({});
  const passwordField = useRef();
  const confirmField = useRef();
  const navigate = useNavigate();
  const { search } = useLocation();
  const api = useApi();
  const flash = useFlash();
  const token = new URLSearchParams(search).get('token');

  useEffect(() => {
    !token ? navigate('/') : passwordField.current.focus();
  }, [token, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordField.current.value !== confirmField.current.value) {
      setFormErrors({confirm: 'New passwords do not match.',});
    } else {
      const response = await api.put('/tokens/reset', {
        token,
        new_password: passwordField.current.value,
      });
      if (response.ok) {
        setFormErrors({});
        flash('Your password has been reset.', 'success');
        navigate('/login');
      } else {
        if (response.body.errors.json.new_password) {
          setFormErrors(response.body.errors.json);
        } else {
          flash(
            'We could not reset your password. Please try again.',
            'danger'
          );
          navigate('/reset-request');
        }
      }
    }
  };

  return (
    <Body>
      <h1>Reset your password</h1>
      <Form onSubmit={onSubmit}>
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
          Reset password
        </Button>
      </Form>
    </Body>
  );
}
