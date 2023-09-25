import '../styling/About.css';
import React from 'react';
import {MdOutlineMailOutline} from 'react-icons/md';

export const About = () => {
    return (
        <div className="display">
            <div className="aboutBackground">
                <div className="aboutInfo">
                    <p className="aboutTitle">About</p>
                    <p className="aboutData">InfoSafe is an application that is used by the Information Security team, System Administrators, Managers and other employees to automate the data security process. It is a single tool that can be used to monitor and manage any and all operations involving a company’s data and projects within its Information Security Management System (ISMS).
                        The vision for this project is to create an easy-to-use application with a user-friendly interface where an organization can have access to all their users, data scopes, support related queries/issues, risk reports and tasks.
                        Users will be assigned certain roles when their profile has been created on the application. These roles are defined by a set of permissions within the application, this is to manage data access as well as to assign administrative rights to certain users.</p>
                </div>
                <div className="contactUsInfo">
                    <p className="contactUsTitle">Contact Us</p>
                    <p className="contactUsData"><MdOutlineMailOutline className="emailIcon"></MdOutlineMailOutline> fragile.cos301@gmail.com</p>
                </div>
            </div>

        </div>
    )
};

