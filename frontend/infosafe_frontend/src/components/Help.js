import '../styling/Help.css';
import React from 'react';
import user_manual from "../images/user_manual.png";
import userDoc from "../images/Infosafe_User_Manual_V4.pdf";


export const Help = () => {

    return (
        <div className="display">
            <div className="helpBackground">
                <div className='helpInfo'>
                    <table>
                        <tr>
                            <td>
                                <div>
                                    <p className="helpTitle">System Tips</p>
                                    <p className="helpData">
                                        Here are a few system tips that may help you in general throughout the system. If you require a deep understanding, please see the user manual below.
                                    </p>
                                </div>
                                <div>
                                    <p className="helpSubTitle">Entity Creation and Editing</p>
                                    <p className="helpData">
                                        When creating or editing entities (users, assets, datascopes etc.) ensure all relevant fields are filled in correctly.
                                    </p>
                                </div>
                                <div>
                                    <p className="helpSubTitle">Entity Deletion</p>
                                    <p className="helpData">
                                        When deleting entities from the system be very sure they will not be needed again as they cannot be restored.
                                        Your system administrator will have access to the secondary "delete" database where deleted entities are stored in but this information is not made available to the system.
                                    </p>
                                </div>
                                <div>
                                    <p className="helpSubTitle">Manage your Risks</p>
                                    <p className="helpData">
                                        Make sure you keep an eye on your logged risks in the system. You don't want them to catch you off guard if their status is elevated and they can potentially lead to an incident or failure.
                                    </p>
                                </div>
                                <div>
                                    <p className="helpSubTitle">Requests</p>
                                    <p className="helpData">
                                        The requests tab is a very powerful tool within the system. You can use it to create and manage a variety of requests relating to the system, such as assets, access to datascopes or support for anything that may be giving you problems. Don't suffer alone when a colleague can suffer with you!
                                    </p>
                                </div>
                                <div>
                                    <p className="helpSubTitle">Patience</p>
                                    <p className="helpData">
                                        Patience is sometimes the best solution. If a page is taking long to load, chances are it is retrieving a lot of data from the database and it may take some time to render.
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <p className="helpTitle">User Manual</p>
                                    <p className="helpData">
                                        If none of these tips are able to help you or you need a deeper understanding of the system you can find the
                                        user manual <a href={userDoc} target="_blank" rel="noreferrer">here</a>.
                                        This will provide you with an in-depth breakdown of all the subsystems and how to utilise them to increase your
                                        productivity and efficiency within the InfoSafe system.
                                    </p>
                                </div>
                                <a href={userDoc} target="_blank" rel="noreferrer">
                                    <img src={user_manual} alt="user manual image" height={844} width={687}/>
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
};