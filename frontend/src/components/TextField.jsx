import { forwardRef } from 'react';
import { FormGroup, FloatingLabel, Form } from 'react-bootstrap';

const TextField = (props, ref) => {
  const {
    name, value, placeholder, error, errorMessage, handleChange, handleBlur, touched,
  } = props;

  return (
    <FormGroup className="mb-3">
      <FloatingLabel
        label={placeholder}
        className="mb-3"
      >
        <Form.Control
          ref={ref}
          className={`form-control ${error && touched && 'is-invalid'}`}
          name={name}
          id={name}
          value={value}
          type={name === 'password' || name === 'passwordConfirmation' ? 'password' : null}
          required
          placeholder="ник"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {error && touched && errorMessage && (<div className="invalid-tooltip">{errorMessage}</div>) }
      </FloatingLabel>
    </FormGroup>
  );
};

export default forwardRef(TextField);