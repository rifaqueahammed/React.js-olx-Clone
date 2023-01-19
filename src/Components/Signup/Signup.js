/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebseContext } from '../../Store/Context';
import { useHistory,Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const history = useHistory();
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');

  const firebase= useContext(FirebseContext);

  const handleFormsubmit = (e)=>{
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        userCredential.user.updateProfile({displayName:username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:userCredential.user.uid,
            username:username,
            phone:phone
          }).then(()=>{
             history.push('/login');
          })
        })
  })
  .catch((error) => {
    console.log(error)
  });

    
  }
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleFormsubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name="username"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
    
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
