import { NavLink } from "react-router-dom";
import argentBankLogo from "../../assets/images/argentBankLogo.webp";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/usersSlice";
const Header = () => {
  const user = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
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
        {!user.userName ? (
          <NavLink className="main-nav-item" to="/SignIn">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            <NavLink className="main-nav-item" to="/User">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </NavLink>
            <NavLink
              className="main-nav-item"
              to="/SignIn"
              onClick={() => dispatch(logout())}
            >
              <i className="fa fa-sign-out"></i>
              Sign out
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
