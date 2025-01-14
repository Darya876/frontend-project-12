import i18next from 'i18next';
import { useRef } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Container, Col, Card, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';
import signupImage from '../../assets/signup.jpg';
import routes from '../../routes.js';

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inpRepeat = useRef();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, i18next.t('errors.loginLength'))
      .max(20, i18next.t('errors.loginLength'))
      .required(i18next.t('errors.required')),
    password: Yup.string()
      .min(6, i18next.t('errors.passwordLength'))
      .max(20, i18next.t('errors.passwordLength'))
      .required(i18next.t('errors.required')),
    repeatPassword: Yup.string()
      .required(i18next.t('errors.required'))
      .oneOf([Yup.ref('password'), null], i18next.t('errors.coincidePass')),
  });

  const onSubmit = async (values) => {
    try {
      console.log(values);
      const response = await axios.post(routes.apiSignupPath, {
        username: values.username,
        password: values.password,
      });
      const { data } = response;
      auth.setUser(data);
      navigate(routes.loginPath);
    } catch (error) {
      if (error.response) {
        navigate(routes.conflictPath);
        console.error(error.response.status);
      }
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
                <img
                  src={signupImage}
                  width={200}
                  className="rounded-circle"
                  alt='Регистрация'
                />
              </Col>
              <Formik
                initialValues={{ username: '', password: '', repeatPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  handleChange,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  errors,
                  touched,
                }) => (
                  <Form
                    noValidate
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Group className="mb-3 position-relative">
                      <div className="form-floating mb-3">
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder='Имя пользователя'
                          id="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          isInvalid={touched.username && errors.username}
                          autoFocus
                        />
                        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                        <ErrorMessage name="username">
                          {(msg) => (
                            <div className=" invalid-tooltip">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <div className="form-floating mb-3">
                        <Form.Control
                          name="password"
                          type="password"
                          autoComplete="password"
                          required
                          onBlur={handleBlur}
                          placeholder='Пароль'
                          id="password"
                          onChange={handleChange}
                          value={values.password}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <ErrorMessage name="password">
                          {(msg) => (
                            <div className=" invalid-tooltip">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <div className="form-floating mb-3">
                        <Form.Control
                          name="repeatPassword"
                          type="password"
                          autoComplete="repeatPassword"
                          required
                          placeholder='Подтвердите пароль'
                          id="repeat-password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.repeatPassword}
                          isInvalid={
                            touched.repeatPassword && errors.repeatPassword
                          }
                          ref={inpRepeat}
                        />
                        <Form.Label htmlFor="repeat-password">
                        Подтвердите пароль
                        </Form.Label>
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.repeatPassword}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                    <Button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      variant="outline-primary"
                      disabled={isSubmitting}
                    >
                      Зарегистрироваться
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;