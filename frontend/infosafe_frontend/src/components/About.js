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
                        Users will be assigned certain roles when their profile has been created on the application. These roles are defined by a set of permissions within the application, this is to manage data access as well as to assign administrative rights to certain users.
                    </p>
                    <p className="aboutTitle">Privacy Policy</p>
                    <p className="aboutData">This Privacy Policy outlines how the InfoSafe System collects, uses, maintains, and protects user information on our website. We are committed to safeguarding your privacy and ensuring the security of your personal data. By using our Website, you consent to the practices described in this policy.
                        Personal information that we collect include you name, surname and email address for system access.
                        We use the collected information to provide services, improve our website and to send periodic emails.
                        We are committed to protecting your personal information. We implement reasonable security measures to safeguard your data against unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.
                        You have the right to access, update, correct, or delete your personal information at any time. You can exercise these rights by contacting us at at the details below. Please allow a reasonable amount of time for us to respond to your request.</p>
                </div>
                <div className="contactUsInfo">
                    <p className="contactUsTitle">Contact Us</p>
                    <p className="contactUsData"><MdOutlineMailOutline className="emailIcon"></MdOutlineMailOutline> fragile.cos301@gmail.com</p>
                </div>
            </div>

        </div>
    )
};

