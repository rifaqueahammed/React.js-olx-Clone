/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState,useContext} from 'react';
import { FirebseContext } from '../../Store/Context';
import { useHistory,Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const history = useHistory();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const firebase= useContext(FirebseContext);

 const handleLogin = (e)=>{
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    history.push('/');
  }).catch((error) => {
    console.log(error)
  });

 }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
