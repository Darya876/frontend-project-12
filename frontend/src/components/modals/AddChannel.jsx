import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import {
  Form, Button, Modal, ButtonGroup
} from 'react-bootstrap';
import * as Yup from 'yup';
// import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../../redux/modals';
import { addChannel, setCurrentChannelId } from '../../redux/channels';
import useApi from '../../hooks/useApi.jsx';
import { showModal } from '../../redux/modals';
import _ from 'lodash';

const AddChannel = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  // const { t } = useTranslation();
  const chatApi = useApi();
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.select();
  }, []);

  const close = () => {
    dispatch(hideModal());
  };

  const validationSchema = Yup.object({
    name: Yup
      .string()
      .min(3, 'addModal.validation.length')
      .notOneOf(channels.map((channel) => channel.name), 'addModal.validation.unique')
      .required('addModal.validation.required'),
  });

  const onSubmit = async (values) => {
    const channelData = {
      id: _.uniqueId(),
      name: values.name,
      removable: true,
    };
    try {
      const response = await chatApi.addChannel(channelData);
      console.log(response);
      dispatch(addChannel(channelData));
      dispatch(setCurrentChannelId(response.id));
      dispatch(hideModal());
      toast.success('Канал создан', 'success');
    } catch (err) {
      toast.error('Канал не создан', 'error');
      console.error(err);
    }
  };

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
                    ref={inputEl}
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