import { NavLink } from "react-router-dom";
import argentBankLogo from "../../assets/images/argentBankLogo.png";
const Header = () => {
  return (
    <header className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink className="main-nav-item" to="/SignIn">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
