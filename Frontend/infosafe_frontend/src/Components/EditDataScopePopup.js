import React from "react";
import '../Styling/EditDataScopePopup.css';
import Popup from "reactjs-popup";
import Dropdown from "react-dropdown";

const status = [
  'CREATED',
  'APPROVED',
  'REJECTED',
  'REVOKED'
];
export const EditDataScopePopup = ({ popupOpen, popupClose }) => {
  return (
    <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
      <div className="editDataScopeOverlay">
        <div className="editdatascopeBorder">
          <form>
            <p className="editDatascopeLabel">Edit Data Scope</p>
            <p className="editDatasscopeNameLabel">Name</p>
            <input className="editDatascopeNameInput" />
            <p className="editDescriptionLabel">Description</p>
            <textarea className="editDescriptionInput" />
            <br />
            <p className="editStatusLabel">Status</p>
            <Dropdown
              options={status}
              value={status[0]}
              className="status"
              name="status"
            />
            <button className="editdatascope_finish" onClick={popupClose}>
              Submit
            </button>
            <p className="addRoleNameLabel">Role Name</p>
            <input className="addRoleNameInput" />
            <p className="roleDescriptionLabel">Role Description</p>
            <textarea className="roleDescriptionInput" /><br/>
            <button className="addRole_finish" onClick={popupClose}>
              Add Role
            </button>
          </form>
        </div>
      </div>
    </Popup>
  );
};