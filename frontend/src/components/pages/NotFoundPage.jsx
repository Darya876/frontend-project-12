import { useNavigate } from 'react-router-dom';
import notFoundImage from '../../assets/404.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column h-100">
      {/* <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"></nav> */}
      <div className="text-center">
        <img src={notFoundImage} className="img-fluid h-25" alt="Страница не найдена" />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти <a href="/" onClick={navigate('/')}>на главную страницу</a>
      </p>
      </div>
    </div>
  )
};

export default NotFoundPage;