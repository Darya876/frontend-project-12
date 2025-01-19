import i18next from 'i18next';
import { useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
// import { useTranslation } from 'react-i18next';
import store from '../../redux/index.js'
import { closeModal } from '../../redux/modals.js';
import ApiContext from '../contexts/ApiContext.jsx';

const RenameChannel = (params) => {
  const dispatch = useDispatch();
  const { showModal } = store.getState().modals;
  const { channelNumber } = params;
  const channels = useSelector((state) => state.channels.channels);
  const { emitChannel } = useContext(ApiContext);
  // const { t } = useTranslation();

  const close = () => {
    dispatch(closeModal());
  };

  const validationSchema = Yup.object().shape({
    channel: Yup.string()
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
    const targetChannel = {
      name: values.channel,
      id: values.id,
    };
    try {
      await emitChannel('renameChannel', targetChannel);
      setNotify('Канал переименован', 'success');
    } catch (err) {
      setNotify(err.message, 'error');
    }
    close();
    setSubmitting(false);
  }

  return (
    <div className="fade modal show" tabIndex="-1">
      <Modal show={showModal} onHide={close} centered>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              channel: name,
              id: channelNumber,
            }}
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
                    name="channel"
                    id="name"
                    aria-label='Переименовать канал'
                    title='Переименовать канал'
                    onChange={handleChange}
                    value={values.channel}
                    ref={inputChannel}
                    isInvalid={touched.channel && errors.channel}
                    required
                    className="rounded"
                  />
                  <ErrorMessage name="channel">
                    {(msg) => <div className=" invalid-tooltip">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="d-flex justify-content-end ">
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

export default RenameChannel;