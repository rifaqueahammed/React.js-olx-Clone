import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

import { AuthContext,FirebseContext} from './Store/Context';
import  Post from './Store/PostContext';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';

function App() {
  const {setUser} = useContext(AuthContext);
  const firebase= useContext(FirebseContext);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
     setUser(user);
    });
  })
  return (
    <div>
      <Post>
      <Router>
        <Route exact path={'/'}><Home /></Route>
        <Route path={'/signup'}><Signup/></Route>
        <Route path={'/login'}><Login/></Route>
        <Route path={'/create'}><Create/></Route>
        <Route path={'/view'}><ViewPost/></Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
