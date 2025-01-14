import { useNavigate } from 'react-router-dom';
import notFoundImage from '../../assets/404.svg';
import routes from '../../routes.js';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <img src={notFoundImage} className="img-fluid h-25" alt="Страница не найдена" />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти <a href="/" onClick={() => navigate(routes.root, { replace: false })}>на главную страницу</a>
      </p>
      </div>
    </div>
  )
};

export default NotFoundPage;