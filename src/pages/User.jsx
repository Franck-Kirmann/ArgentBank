import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Edit from "./../components/Layouts/Edit";

const User = () => {
  const user = useSelector((state) => state.users.currentUser);
  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour démarrer l'édition
  const startEditing = () => {
    setIsEditing(true);
  };

  // Fonction pour arrêter l'édition
  const stopEditing = () => {
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <Edit stopEditing={stopEditing} />
        ) : (
          <div>
            {" "}
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}
            </h1>
            <button className="edit-button" onClick={startEditing}>
              Edit Name
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
