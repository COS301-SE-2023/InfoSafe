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
                    <p className="aboutSubTitle">Terms of Service and Use</p>
                    <p className="aboutData">
                        To view the InfoSafe Terms of Service and User, please view them <a href="">here</a>.
                    </p>
                    <p className="aboutSubTitle">Privacy Policy</p>
                    <p className="aboutData">
                        To learn more about the InfoSafe Privacy Policy, find it <a href="">here</a>.
                    </p>
                    {/*<p className="aboutTitle">Terms of Service and Use</p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    Welcome to the InfoSafe system. These Terms of Use  govern your access to and use of our website. By accessing or using our website, you agree to comply with these Terms. Please read these Terms carefully before using our Website. If you do not agree to these Terms, you may not use our Website.*/}
                    {/*</p>*/}
                    {/*<p className="aboutSubTitle">Use of the Website</p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    Eligibility: By using our website, you affirm that you are at least 18 years and you  consent to use the website. If you are using the website on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.*/}
                    {/*</p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    Content: You agree not to use our website for any unlawful or prohibited purpose. You are responsible for all content you post or transmit on the website. We reserve the right to remove any content that violates these terms or is otherwise objectionable.*/}
                    {/*</p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    User Accounts: You will be required to obtain a user account to access certain features of our website. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.*/}

                    {/*</p>*/}
                    {/*<p className="aboutSubTitle">Intellectual Property</p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    All content and materials on our website, including text, graphics, logos, images, software, and any other intellectual property, are owned or licensed by us and protected by copyright and other intellectual property laws. You may not use, reproduce, distribute, or create derivative works from our content without our explicit written permission.*/}
                    {/*</p>*/}
                    {/*<p className="aboutSubTitle">Privacy</p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    Your use of our Website is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy below to understand how we collect, use, and protect your personal information.*/}
                    {/*</p>*/}
                    {/*<p className="aboutSubTitle">Termination</p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    We reserve the right to terminate or suspend your access to our website, without notice, for any reason, including if we believe you have violated these Terms. Upon termination, your right to use the Website will cease immediately.*/}
                    {/*</p>*/}
                    {/*<p className="aboutSubTitle"></p>*/}
                    {/*<p className="aboutData">*/}
                    {/*    We may update these Terms at any time for operational, legal, or regulatory reasons. We will notify you of any significant changes by prominently posting a notice on our Website. Your continued use of the Website after such changes constitute your acceptance of the revised Terms.*/}
                    {/*</p>*/}
                    {/*<p className="aboutTitle">Privacy Policy</p>*/}
                    {/*<p className="aboutData">This Privacy Policy outlines how the InfoSafe System collects, uses, maintains, and protects user information on our website. We are committed to safeguarding your privacy and ensuring the security of your personal data. By using our Website, you consent to the practices described in this policy.*/}
                    {/*    Personal information that we collect include you name, surname and email address for system access.*/}
                    {/*    We use the collected information to provide services, improve our website and to send periodic emails.*/}
                    {/*    We are committed to protecting your personal information. We implement reasonable security measures to safeguard your data against unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.*/}
                    {/*    You have the right to access, update, correct, or delete your personal information at any time. You can exercise these rights by contacting us at at the details below. Please allow a reasonable amount of time for us to respond to your request.*/}
                    {/*</p>*/}
                    <div className="contactUsInfo">
                        <p className="contactUsTitle">Contact Us</p>
                        <p className="contactUsData"><MdOutlineMailOutline className="emailIcon"></MdOutlineMailOutline> fragile.cos301@gmail.com</p>
                    </div>
                </div>
            </div>

        </div>
    )
};

