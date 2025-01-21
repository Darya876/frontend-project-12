import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
// import { useTranslation } from 'react-i18next';
import store from '../../redux/store.js'
// import { closeModal } from '../../redux/modals.js';
import ApiContext from '../contexts/ApiContext.jsx';

const RemoveChannel = (params) => {
  const dispatch = useDispatch();
  const { channelNumber } = params;
  const { showModal } = store.getState().modals;
  const { emitChannel } = useContext(ApiContext);
  // const { t } = useTranslation();

  const close = () => {
    dispatch(closeModal());
  };

  const setNotify = (text, result) => {
    const notify = () => toast[result](text);
    notify();
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await emitChannel('removeChannel', { id: values.id });
      setNotify('Канал удалён', 'success');
    } catch (err) {
      console.error(err.message);
      setNotify('Канал не удалён', 'error');
    }
    close();
    setSubmitting(false);
  }

  return (
    <div className="fade modal show" tabIndex="-1">
      <Modal show={showModal} onHide={close} centered>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              id: channelNumber,
            }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <Form noValidate="" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-end ">
                  <p className="lead w-75 text-start">Уверены?</p>
                  <ButtonGroup className="w-50 mt-5">
                    <Button
                      type="button"
                      className="me-2 rounded btn btn-secondary"
                      onClick={close}
                    >
                      Отменить
                    </Button>
                    <Button type="submit" className="rounded btn btn-danger">
                      Удалить
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

export default RemoveChannel;