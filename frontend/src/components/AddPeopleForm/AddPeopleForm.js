import React, { useState } from "react";
import "./AddPeopleForm.css";
import { addPeople } from "../../actions/userAction";
import { useDispatch } from "react-redux";
const AddPeopleForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const handleAddEmail = (e) => {
    e.preventDefault();
    dispatch(addPeople(email));
    setSuccess(true);
  };
  return (
    <div className="modal-backdrop">
      {!success ? (
        <div className="add-people-Form">
          <p>Add people to the board</p>
          <input
            type="email"
            placeholder="Enter the email"
            className="email-inputField"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="button-container">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleAddEmail}>Add Email</button>
          </div>
        </div>
      ) : (
        <div className="successful-form">
          <p>{email} added to board</p>
          <button onClick={onClose}>Okay, got it!</button>
        </div>
      )}
    </div>
  );
};

export default AddPeopleForm;
