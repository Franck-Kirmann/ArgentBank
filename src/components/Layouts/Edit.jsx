import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateUser } from "../../redux/usersSlice";

const Edit = ({ stopEditing }) => {
  const user = useSelector((state) => state.users.currentUser);
  const [EditUsername, setEditUsername] = useState("");

  const dispatch = useDispatch();

  const Save = () => {
    dispatch(updateUser({ userName: EditUsername }));
    // stopEditing();
  };

  const Cancel = () => {
    stopEditing();
  };

  useEffect(() => {
    if (user && user.userName) {
      setEditUsername(user.userName);
    }
  }, [user]);

  return (
    <div className="edit">
      <h2>Edit user info</h2>
      <div>
        <label htmlFor="EditUsername">User name :</label>
        <input
          type="text"
          id="EditUsername"
          value={EditUsername}
          onChange={(e) => setEditUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="FisrtName">First name : </label>
        <input type="text" id="FisrtName" value={user.firstName} disabled />
      </div>
      <div>
        <label htmlFor="LastName">Last name : </label>
        <input type="text" id="LastName" value={user.lastName} disabled />
      </div>
      <div className="edit-user-button">
        <button onClick={Save} className="save">
          Sauvegarder
        </button>
        <button onClick={Cancel} className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

Edit.propTypes = {
  stopEditing: PropTypes.func.isRequired,
};

export default Edit;
