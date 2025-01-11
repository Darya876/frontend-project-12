import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="loader-container">
        <div className="loader">
          <Spinner variant="primary" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className="loader__message mt-2">
            Идет загрузка
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;