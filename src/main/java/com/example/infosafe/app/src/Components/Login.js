/* eslint-disable jsx-a11y/anchor-is-valid */
import '../Styling/Login.css';

function Login({onLogin}) {
    const handleLogin = () => {
        onLogin();
    };
  return (

      <div className="background">
          <div className="panel">

            <div className="title">
                <p className="logo">Login</p>
            </div>
            <div className="user">
                <p className="username">Username</p>
                <input data-testid="userIn" className="untxt" type="text" id="username" name="username"></input>
            </div>
            <div className = "user_password">
                <p className="pass">Password</p>
                <input data-testid="passIn" className="pwtxt" type="password" id="password" name="password"></input>
            </div>
            
            <a className="forgot">Forgot Password?</a>
            <button data-testid='btnTest' className="btnLogin" onClick={handleLogin}>Login</button>
        </div>
    </div>

  );
}

export default Login;