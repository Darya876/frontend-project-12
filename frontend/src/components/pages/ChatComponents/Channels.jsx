import { Button, ButtonGroup, Col, Nav, Dropdown } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { getAllChannels, getCurrentChannelId } from '../../../redux/selectors.js';
import { openModal } from '../../../redux/modalsSlice';
import { actions } from '../../../redux/channelsSlice.js';
import filter from 'leo-profanity';

const Channels = () => {
  const dispatch = useDispatch();
  // const { t } = useTranslation();
  const channels = useSelector((state) => getAllChannels(state));
  const currentChannelId = useSelector((state) => getCurrentChannelId(state));
  const showModal = (type, id) => () => {
    dispatch(openModal({ type, id }));
  };

  return (
    <Col
      md="2"
      className="col-4 border-end pt-5 px-0 bg-light"
    >
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={showModal('add')}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        fill
        variant="pills"
        as="ul"
        className="flex-column px-2"
      >
        {channels && currentChannelId && (
          channels.map(({ id, name, removable }) => {
            const variant = id === currentChannelId ? 'secondary' : 'light';
            const filteredName = filter.clean(name);
            return (removable) ? (
              <Nav.Item key={id} className="w-100">
                <Dropdown
                  as={ButtonGroup}
                  className="d-flex rounded-0"
                >
                  <Button
                    variant={variant}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={() => { dispatch(actions.setCurrentChannelId(id)); }}
                  >
                    <span className="me-1">#</span>
                    {filteredName}
                  </Button>
                  <Dropdown.Toggle
                    variant={variant}
                  >
                    <span className="visually-hidden">Управление каналом</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={showModal('rename', id)}
                    >
                      Переименовать
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={showModal('delete', id)}
                    >
                      Удалить
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            ) : (
              <Nav.Item key={id}>
                <Button
                  variant={variant}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => { dispatch(actions.setCurrentChannelId(id)); }}
                >
                  <span className="me-1">#</span>
                  {filteredName}
                </Button>
              </Nav.Item>
            );
          })
        )}
      </Nav>
    </Col>
  );
};

export default Channels;