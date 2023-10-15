import '../styling/Help.css';
import React from 'react';
import user_manual from "../images/user_manual.png";


export const Help = () => {

    return (
        <div className="display">
            <div className="helpBackground">
                <div className='helpInfo'>
                    <div>
                    <p className="helpTitle">System Tips</p>
                    <p className="helpData">
                        Here are a few system tips that may help you in general throughout the system. If you require a deep understanding, please see the user manual below.
                    </p>
                    </div>
                    <div>
                    <p className="helpSubTitle">Entity Management</p>
                    <p className="helpData">
                        When creating or editing entities (users, assets, data scopes etc.) ensure all relevant fields are filled in correctly.
                        When deleting entities from the system be very sure they will not be needed again as they cannot be restored.
                        Your system administrator will have access to the secondary "delete" database where deleted entities are stored in but this information is not made available to the system.
                    </p>
                    </div>
                    <div>
                    <p className="helpSubTitle">Requests</p>
                    <p className="helpData">
                        The requests tab is a very powerful tool within the system. You can use it to create and manage a variety of requests relating to the system, such as assets, access to datascopes or support for anything that may be giving you problems. Don't suffer alone when a colleague can suffer with you!
                     </p>
                    </div>
                    <div>
                    <p className="helpTitle">User Manual</p>
                    <p className="helpData">
                        If none of the above tips are able to help you or you need a deeper understanding of the system you can find the
                        user manual <a href="https://drive.google.com/file/d/1I3YdViR5jbR4gqQQjGEcjIQmcQFEhaRv/view?usp=drive_link">here</a>.
                        This will provide you with an in-depth breakdown of all the subsystems and how to utilise them to increase your
                        productivity and efficiency within the InfoSafe system.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
};