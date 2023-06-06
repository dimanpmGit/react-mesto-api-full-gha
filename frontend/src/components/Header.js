import { Link, useNavigate, useLocation } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function onSignOut() {
    localStorage.removeItem('token');
    navigate('/signin');
  }

  return (    
    <header className="header">
      <div className="logo"></div>
      <ul className="header__nav-menu">
        {pathname === '/main' && <li>
          <a className="header__nav-link header__nav-link_medium link" href={'mailto:' + props.email}>{props.email}</a>
        </li>}
        {pathname === '/main' && <li><div className="header__nav-link link" onClick={onSignOut}>Выйти</div></li>}
        {pathname === '/signin' && <li><Link to="/signup" className="header__nav-link link">Регистрация</Link></li>}
        {pathname === '/signup' && <li><Link to="/signin" className="header__nav-link link">Войти</Link></li>}
      </ul>
    </header>
  );
}

export default Header;