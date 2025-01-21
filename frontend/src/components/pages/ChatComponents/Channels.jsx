import { Button, ButtonGroup, Dropdown, Col } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../../../redux/channels.js'
import cn from 'classnames';
import { showModal } from '../../../redux/modals.js';
import getModal from '../../modals/index.js';
import filter from 'leo-profanity';

const Channels = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.activeChannel);
  const channels = useSelector((state) => state.channels.channels);
  const modalType = useSelector((state) => state.modals.modalType);
  const changeChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const RenderModal = ({ value }) => {
    if (value) {
      const getModalValue = getModal(value);
      const params = {
        currentChannelId,
      };
      return getModalValue(params);
    }
    return null;
  };

  const btnClassLight = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', 'btn-light');
  const btnClassSecondary = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', 'btn-secondary');
  const dropDownClassLight = cn('square', 'border', 'border-0', 'btn-light');
  const dropDownClassSecondary = cn('square', 'border', 'border-0', 'btn-secondary');

  return (
    <>
      <Col md="2" className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <Button
            type="button"
            variant="light"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}
          >
            <PlusSquare size={20} />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map(({ id, name, removable }) => { 
            const filteredName = filter.clean(name);
            return channels.removable ? (
              <li
                className="nav-item w-100"
                key={id}
                id={id}
              >
                <ButtonGroup className="w-100 rounded-0 text-start">
                  <button
                    type="button"
                    onClick={() => changeChannel(id)}
                    className={
                      id === currentChannelId
                        ? btnClassSecondary
                        : btnClassLight
                    }
                  >
                    <span className="me-1">#</span>
                    {filteredName}
                  </button>
                  {removable ? (
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        className={
                          id === currentChannelId
                            ? dropDownClassSecondary
                            : dropDownClassLight
                        }
                        id="dropdown-basic"
                      >
                        <span className="visually-hidden">Управление каналом</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          type="button"
                          href="#/action-1"
                          data-index={id}
                          onClick={() => dispatch(showModal({ modalType: 'removing', channelId: id }))}
                        >
                          Удалить
                        </Dropdown.Item>
                        <Dropdown.Item
                          type="button"
                          href="#/action-2"
                          data-index={id}
                          onClick={() => dispatch(showModal({ modalType: 'renaming', channelId: id }))}
                        >
                          Переименовать
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : null}
                </ButtonGroup>
              </li>
            ) : (
              <li
                className="nav-item w-100"
                key={id}
                id={id}
              >
                <ButtonGroup className="w-100 rounded-0 text-start">
                <button type="button" onClick={() => changeChannel(id)} className={
                id === currentChannelId
                ? btnClassSecondary
                : btnClassLight}>
                  #
                  {' '}
                  {filteredName}
                </button>
                </ButtonGroup>
              </li>
            );
          })}
        </ul>
      </Col>
      { modalType ? <RenderModal value={modalType} /> : null }
    </>
  );
};

export default Channels;