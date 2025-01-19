import i18next from 'i18next';
import { useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import filter from 'leo-profanity';
// import { useTranslation } from 'react-i18next';
import store from '../../redux/index.js'
import { closeModal } from '../../redux/modals.js';
import ApiContext from '../contexts/ApiContext.jsx';
import _ from 'lodash';

const AddChannel = () => {
  const dispatch = useDispatch();
  const { showModal } = store.getState().modals;
  const channels = useSelector((state) => state.channels.channels);
  const { emitChannel } = useContext(ApiContext);
  // const { t } = useTranslation();

  const close = () => {
    dispatch(closeModal());
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, i18next.t('errors.channelLength'))
      .max(20, i18next.t('errors.channelLength'))
      .notOneOf(
        channels.map((channel) => channel.name),
        i18next.t('errors.uniqName'),
      ),
  });

  const inputChannel = useRef();
  useEffect(() => {
    inputChannel.current?.select();
  }, []);

  const setNotify = (text, result) => {
    const notify = () => toast[result](text);
    notify();
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const newChannel = {
      id: Number(_.uniqueId()),
      name: filter.clean(values.name),
      removable: true,
    };
    try {
      await emitChannel('newChannel', newChannel);
      setNotify('Канал создан', 'success');
    } catch (err) {
      console.error(err.message);
      setNotify('Канал не создан', 'error');
    }
    close();
    setSubmitting(false);
  }

  return (
    <div className="fade modal show" tabIndex="-1">
      <Modal show={showModal} onHide={close} centered>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ name: '' }}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              touched,
              errors,
            }) => (
              <Form noValidate="" onSubmit={handleSubmit}>
                <div className="input-group has-validation">
                  <Form.Label className="visually-hidden" htmlFor="name">
                    Имя канала
                  </Form.Label>
                  <Form.Control
                    name="name"
                    id="name"
                    aria-label="Имя канала"
                    onChange={handleChange}
                    value={values.channel}
                    ref={inputChannel}
                    isInvalid={touched.name && errors.name}
                    required
                    title='Добавить канал'
                    className="rounded"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div className=" invalid-tooltip">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="d-flex justify-content-end">
                  <ButtonGroup className="w-50 mt-3">
                    <Button
                      variant="secondary"
                      type="button"
                      className="me-2 rounded"
                      onClick={close}
                    >
                      Отменить
                    </Button>
                    <Button variant="primary" type="submit" className="rounded">
                      Отправить
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddChannel;