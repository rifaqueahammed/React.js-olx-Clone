import React,{useEffect,useContext,useState} from 'react';
import { FirebseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';

import './View.css';
function View() {
  const {postDetails} = useContext(PostContext);
  const firebase = useContext(FirebseContext);
  const [userDetails,setUserDetails] = useState('');
  useEffect(()=>{
    const {userId} = postDetails;
    firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
      console.log(res)
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
},[firebase,postDetails])
  return (
    <div className="viewParentDiv">
      {postDetails && <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>}
      <div className="rightSection">
       {postDetails && <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>}
      {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
