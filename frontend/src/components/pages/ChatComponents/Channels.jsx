import { Button, ButtonGroup, Dropdown, Col } from 'react-bootstrap';
import { useState } from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../../../redux/channels.js'
import { chooseModal } from '../../../redux/modals.js';
import getModal from '../../modals/index.js'
import filter from 'leo-profanity';
import cn from 'classnames';

const Channels = () => {
  const [channelNumber, setChannelNumber] = useState(null);
  const dispatch = useDispatch();
  // const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const typeModal = useSelector((state) => state.modals.typeModal);

  const btnClassLight = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', 'btn-light');
  const btnClassSecondary = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', 'btn-secondary');
  const dropDownClassLight = cn('square', 'border', 'border-0', 'btn-light');
  const dropDownClassSecondary = cn('square', 'border', 'border-0', 'btn-secondary');

  const manageChannel = (typeModal) => (e) => {
    e.preventDefault();
    dispatch(chooseModal(typeModal));
    if (e.target.getAttribute('data-index')) {
      setChannelNumber(e.target.getAttribute('data-index'));
    }
  };

  const RenderModal = ({ value }) => {
    if (value) {
      const getModalValue = getModal(value);
      const params = {
        channelNumber,
      };
      return getModalValue(params);
    }
    return null;
  };

  const handleClick = (id) => {
    dispatch(setActiveChannel(id));
  };

  return (
    <>
      <Col md="2" className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <Button
            type="button"
            variant="light"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={manageChannel('adding')}
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
            return (
              <li
                className="nav-item w-100"
                key={id}
                id={id}
              >
                <ButtonGroup className="w-100 rounded-0 text-start">
                  <button
                    type="button"
                    onClick={() => handleClick(id)}
                    className={
                      id === activeChannel
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
                          id === activeChannel
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
                          onClick={manageChannel('removing')}
                        >
                          Удалить
                        </Dropdown.Item>
                        <Dropdown.Item
                          type="button"
                          href="#/action-2"
                          data-index={id}
                          onClick={manageChannel('renaming')}
                        >
                          Переименовать
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : null}
                </ButtonGroup>
              </li>
            )
          })}
        </ul>
      </Col>
      {typeModal ? <RenderModal value={typeModal} /> : null}
    </>
  );
};

export default Channels;