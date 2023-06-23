import '../Styling/CreateUser.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import {useEffect, useState} from "react";

const role_options = [ "EMPLOYEE", "ISO", "DISO", "DATA CUSTODIAN", "SYSTEM ADMINISTRATOR", "ASSET MANAGER"];
export default function CreateUser() {
    const[name,setName]=useState('')
    const[surname,setSurname]=useState('')
    const[email,setEmail]=useState('')
    const[role,setRole]=useState('EMPLOYEE')
    const[password,setPassword]=useState('')

    const handleClick=(e)=> {
        e.preventDefault()
        const user = {name, surname, email, password, role}
        console.log(user)
    }

    return (
        <body>
        <div className="backgrnd">
            <div className="overlay">
                <form>
                    <p className="page_name">User Creation</p>
                    <p className="label_name">Name</p>
                    <input className="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <p className="label_surname">Surname</p>
                    <input className="surname" name="surname" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                    <p className="label_email">Email</p>
                    <input className="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <p className="label_password">Password</p>
                    <input className="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='btnGeneratePassword'>Generate Password</button>
                    <p className="label_role">System role</p>
                    <Dropdown options={role_options} value = {role_options[0]} className="role" name="role"/>
                    <button className='btnFinish' onClick={handleClick}>Submit</button>
                </form>
                {/*{name}*/}
                {/*{surname}*/}
                {/*{email}*/}
                {/*{password}*/}
                {/*{role}*/}
            </div>
        </div>
        </body>
    )
}