import './CreateUser.css'

function CreateUser() {
    return (
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
          </div>
      </div>

    )
}
export default  CreateUser;
