import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Link, Element, scroller } from 'react-scroll';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import ApiContext from '../../contexts/ApiContext.jsx'
import { loadChannels } from '../../../redux/channels.js';
import { loadMessages } from '../../../redux/messages.js';
import routes from '../../../routes.js';
import useAuth from '../../../hooks/index.jsx';

const Messages = () => {
  const auth = useAuth();
  const { activeUser, user } = auth;
  const { token } = user;
  const dispatch = useDispatch();
  const { emitMessage } = useContext(ApiContext);
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  console.log(channels);
  const messages = useSelector((state) => state.messages.messages);
  const activeChannelId = useSelector(
    (state) => state.channels.activeChannel,
  );
  const activeChannel = channels.find((channel) => channel.id === activeChannelId);

  const scrollTo = () => {
    scroller.scrollTo('lastMessage', {
      duration: 800,
      delay: 0,
      containerId: 'messages-box',
      smooth: 'easeInOutQuart',
    });
  };

  useEffect(() => {
    scrollTo();
  });

  const { header } = useAuth();

  useEffect(() => {
    const requestData = async () => {
      await axios
        .get(routes.apiDataPath, {
          headers: header,
        })
        .then((response) => {
          dispatch(loadMessages(response.data));
          dispatch(loadChannels(response.data));
        })
        .catch(() => {
          const notify = () => toast.error('Ошибка соединения');
          notify();
        });
    };
    requestData();
  }, [dispatch, activeUser, t, header, auth, token]);

  const channelMessages = messages.filter(
    (item) => item.channelId === activeChannelId,
  );

  const inpMessage = useRef();
  useEffect(() => {
    inpMessage.current.select();
  });

  const messagesLength = channelMessages.length;
  const countMessages = t('messages.msg', { count: messagesLength });
  const setNotify = (text, result) => {
    const notify = () => toast[result](text);
    notify();
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const newMessage = {
      body: filter.clean(values.message),
      channelId: activeChannelId,
      username: activeUser,
    };
    try {
      await emitMessage('newMessage', newMessage);
    } catch (err) {
      console.error(err.message);
      setNotify('Сообщение не отправлено??', 'error'); // ?
    }
    resetForm('');
    setSubmitting(false);
    scrollTo();
  }

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {activeChannel.name}</b>
          </p>
          <span className="text-muted">{countMessages}</span>
        </div>
        <div id="messages-box" className="chat-messages px-5 overflow-auto ">
          {messages.map(
            (item) => {
              const filteredItem = filter.clean(item);
              return (
              item.channelId === activeChannel && (
                <div key={item.id} id={item.id} className="text-break mb-2">
                  <span>
                    <b>{filteredItem.username}</b>
                    : 
                    {filteredItem.body}
                  </span>
                </div>
              )
            )},
          )}
          <Link
            activeClass="active"
            className="lastMessage"
            to="lastMessage"
            spy
            smooth
            offset={50}
            duration={500}
          />
          <Element name="lastMessage" />
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                noValidate=""
                onSubmit={handleSubmit}
                className="py-1 border rounded-2"
              >
                <div className="input-group has-validation">
                  <Form.Control
                    name="message"
                    aria-label="Новое сообщение"
                    placeholder='Введите сообщение...'
                    className="border-0 p-0 ps-2 form-control"
                    onChange={handleChange}
                    value={values.message}
                    ref={inpMessage}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-group-vertical"
                  >
                    <ArrowRightSquare size={20} />
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Col>
  );
};

export default Messages;

// const Messages = () => {
//   return (
//     <div>
//       Hey hey hey!
//     </div>
//   );
// };

// export default Messages;