import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Channels from './ChatComponents/Channels.jsx';
import Loader from '../Loader.jsx';
import ChannelsHeader from './ChatComponents/ChannelsHeader.jsx';
import AuthContext from '../contexts/AuthContext.jsx';
import { useEffect, useContext } from 'react';
import { fetchData } from '../../redux/channelsSlice.js';

const ChatPage = () => {
  const useAuth = () => useContext(AuthContext);
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(getAuthHeader));
  }, [dispatch, getAuthHeader]);

  const { channelsState } = useSelector((state) => state.channels);

  if (channelsState === 'idle') {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        {/* <ChatModal /> */}
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <ChannelsHeader />
              {/* <MessagesBox /> */}
              <div className="mt-auto px-5 py-3">
                {/* <MessageField /> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Loader />
  );
};

export default ChatPage;