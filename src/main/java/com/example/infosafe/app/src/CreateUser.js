import './CreateUser.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';

const role_options = [ "USER", "ISO", "DISO", "DATA CUSTODIAN", "EMPLOYEE", "SYSTEM ADMINISTRATOR", "ASSET MANAGEER"];
function CreateUser() {
    return (
    <body>
        <div className="backgrnd">
          <div className="overlay">
            <p className="page_name">User Creation</p>
            <p className="label_name">Name</p>
            <input className="name" name="name"/>
            <p className="label_surname">Surname</p>
            <input className="surname" name="surname"/>
            <p className="label_email">Email</p>
            <input className="email" name="email"/>
            <p className="label_password">Password</p>
            <input className="password" name="password"/>
            <button className='btnGeneratePassword'>Generate Password</button>
            <p className="label_role">System role</p>
            <Dropdown options={role_options} value = {role_options[0]} className="role" name="role"/>
            <button className='btnFinish'>Finish</button>
          </div>
      </div>
    </body>
      

    )
}
export default  CreateUser;