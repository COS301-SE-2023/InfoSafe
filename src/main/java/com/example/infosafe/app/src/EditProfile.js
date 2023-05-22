import './EditProfile.css';
import * as React from 'react';

function EditProfile() {
    return (
        <div className="background">
            <div className="overlay">
                <p className="page_name">Edit Profile</p>
                <div className="label_input">
                    <p className="label_name">Name</p>
                    <input className="name" name="name" />
                </div>
                <div className="label_input">
                    <p className="label_surname">Surname</p>
                    <input className="surname" name="surname" />
                </div>
                <div className="label_input">
                    <p className="label_email">Email</p>
                    <input className="email" name="email" />
                </div>
              
                    <button className="btnPassword">Change Password</button>
               
                
                <button className="btnFinish">FINISH</button>
                
            </div>
        </div>
    );
}

export default EditProfile;
