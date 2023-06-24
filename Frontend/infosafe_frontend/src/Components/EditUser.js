import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/EditUser.css';
import Dropdown from 'react-dropdown';
/* eslint-disable react/prop-types */
 const EditUser = ({closedEditUser}) =>  {

     const role_options = [
         'EMPLOYEE',
         'ISO',
         'DISO',
         'DATA CUSTODIAN',
         'SYSTEM ADMINISTRATOR',
         'ASSET MANAGER'
     ];
     return (
         <Popup open={true} onClose={closeEditUser} position="center center">
             <div className="editUserOverlay">
                 <div className="border">
                     <p className="editUserTitle">Edit User</p>
                     <div className="nameEdit">
                         <p className="nameTitle">Name</p>
                         <input
                             className="editNameInput"
                             type="text"
                             id="editusername"
                             name="editusername"
                             defaultValue="Jane"
                         />
                     </div>
                     <div className="surnameEdit">
                         <p className="surnameTitle">Surname</p>
                         <input
                             className="editSurnameInput"
                             type="text"
                             id="editusersurname"
                             name="editusersurname"
                             defaultValue="Doe"
                         />
                     </div>
                     <div className="emailEdit">
                         <p className="emailTitle">Email</p>
                         <input
                             className="editEmailInput"
                             type="text"
                             id="edituseremail"
                             name="edituseremail"
                             defaultValue="jane.doe@example.com"
                         />
                     </div>
                     <div className="roleEdit">
                         <p className="roleTitle">System Role</p>
                         <Dropdown
                             options={role_options}
                             value={role_options[0]}
                             className="roleDropdown"
                             name="role"
                         />
                     </div>
                     <button className="ChangePasswordButton">Change Password</button>
                     <button
                         className="FinishButton"
                         onClick={() => console.log('Finish editing')}
                     >
                         Finish
                     </button>
                 </div>
             </div>
         </Popup>
     );
 };

 export default EditUser;