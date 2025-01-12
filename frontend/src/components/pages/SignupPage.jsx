import i18next from 'i18next';
import { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string, ref } from 'yup';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import {
  Container, Col, Card, Row,
} from 'react-bootstrap';
import signupImage from '../../assets/signup.jpg';
import AuthContext from '../contexts/AuthContext';
import TextField from '../TextField.jsx';

const SignupPage = () => {
  const navigate = useNavigate();
  const useAuth = () => useContext(AuthContext);
  const { onSignup } = useAuth();
  const [authError, setAuthError] = useState();

  const inputRef = useRef(null);
  const validationSchema = object().shape({
    username: string()
      .min(3, i18next.t('errors.loginLength'))
      .max(20, i18next.t('errors.loginLength'))
      .required(i18next.t('errors.required')),
    password: string()
      .min(6, i18next.t('errors.passwordLength'))
      .max(20, i18next.t('errors.passwordLength'))
      .required(i18next.t('errors.required')),
    repeatPassword: string()
      .required(i18next.t('errors.required'))
      .oneOf([ref('password'), null], i18next.t('errors.mustMatch')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async ({ ...values }) => {
    try {
      await onSignup(values);
      toast.success('Успешно!');
      navigate('/');
    } catch (err) {
      switch (err.message) {
        case '409':
          setAuthError('Пользователь с этими данными уже существует');
          break;
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
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={signupImage} alt="Регистрация" />
              </Col>
              <Formik className="w-50"
                initialValues={{ username: '', password: '', passwordConfirmation: '' }}
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
                  isSubmitting,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={handleSubmit} noValidate>
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <TextField
                      ref={inputRef}
                      name="username"
                      placeholder='Имя пользователя'
                      error={authError || errors.username}
                      errorMessage={errors.username}
                      value={values.username}
                      touched={touched.username}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <TextField
                      name="password"
                      placeholder='Пароль'
                      error={authError || errors.password}
                      errorMessage={authError || errors.password}
                      value={values.password}
                      touched={touched.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <TextField
                      name="passwordConfirmation"
                      placeholder='Подтвердите пароль'
                      error={authError || errors.passwordConfirmation}
                      errorMessage={authError || errors.passwordConfirmation}
                      value={values.passwordConfirmation}
                      touched={touched.passwordConfirmation}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={isSubmitting}>Зарегистрироваться</button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage;