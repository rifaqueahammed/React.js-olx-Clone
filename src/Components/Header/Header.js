import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext,FirebseContext } from '../../Store/Context';
function Header() {
  const {user} = useContext(AuthContext);
  const firebase = useContext(FirebseContext);
  const history = useHistory();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName :<span onClick={()=>{
            history.push('/Login')
          }}>Login</span>}</span>
          <hr />
        </div>
        <div className='signout'>
          {user && <span onClick={()=>{
            firebase.auth().signOut().then(()=>{
              history.push('/Login');
            })
          }}>Logout</span>}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {user && <span onClick={()=>{history.push('/create')}}>SELL</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
