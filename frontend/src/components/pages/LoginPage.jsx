import { useRef, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import {
  Container, Col, Card, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login.jpg';
import AuthContext from '../contexts/AuthContext';
import TextField from '../TextField.jsx';

const LoginPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const useAuth = () => useContext(AuthContext);
  const { onLogin } = useAuth();
  const [authError, setAuthError] = useState();

  const firstInput = useRef();
  useEffect(() => {
    firstInput.current.focus();
  }, []);
  const validationSchema = object({
    username: string().required(t('validationErrors.isRequired')),
    password: string().required(t('validationErrors.isRequired')),
  });

  const handleSubmit = async (values) => {
    try {
      await onLogin(values);
      toast.success('Успешно!');
      navigate('/');
    } catch (err) {
      switch (err.message) {
        case '401':
          setAuthError('Неверные имя пользователя или пароль');
          break;
        case '500':
          toast.error('Сервер не отвечает');
          break;
        case '0':
          toast.error('Потеряно интернет соединение');
          break;
        default:
          toast.error('Неизвестная ошибка');
      }
    }
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={loginImage} alt="Войти" />
              </Col>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <TextField
                      ref={firstInput}
                      name="username"
                      placeholder='Имя пользователя'
                      value={values.username}
                      error={authError || errors.username}
                      errorMessage={errors.username}
                      touched={touched.username}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <TextField
                      name="password"
                      placeholder='Пароль'
                      value={values.password}
                      error={authError || errors.password}
                      errorMessage={authError || errors.password}
                      touched={touched.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={isSubmitting}>Войти</button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage;