import i18next from 'i18next';
import { object, string } from 'yup';
import { useRef } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Container, Col, Card, Row } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';
import loginImage from '../../assets/login.jpg';
import routes from '../../routes.js'

const LoginPage = () => {
  const { activeUser, setUser } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();

  const validationSchema = object({
    username: string().required(i18next.t('errors.serverErrors')),
    password: string().required(i18next.t('errors.serverErrors')),
  });

  const onSubmit = async (values, { setErrors }) => {
    try {
      const response = await axios.post(routes.apiLoginPath, {
        username: values.username,
        password: values.password,
      });
      const { data } = response;
      activeUser ? navigate(routes.root) : null;
      setUser(data);
      console.log(response);
    } catch (error) {
      if (error.response) {
        inputRef.current.select();
        setErrors({
          username: i18next.t('errors.serverError'),
          password: i18next.t('errors.serverError'),
        });
        console.error(error.response.status);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
                <img
                  src={loginImage}
                  className="rounded-circle"
                  alt="Войти/Enter"
                />
              </Col>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  touched,
                  errors,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-md-0"
                  >
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Group className="mb-3">
                      <div className="form-floating mb-3">
                        <Form.Control
                          name="username"
                          autoComplete="username"
                          required
                          placeholder={'Ваш ник'}
                          id="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          isInvalid={touched.username && errors.username}
                          autoFocus
                          ref={inputRef}
                        />
                        <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <div className="form-floating mb-3">
                        <Form.Control
                          name="password"
                          type="password"
                          autoComplete="password"
                          placeholder={'Пароль'}
                          required
                          id="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <ErrorMessage name="password">
                          {(msg) => (
                            <div className="invalid-tooltip">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                    </Form.Group>
                    <Button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      variant="outline-primary"
                    >
                      Войти
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;