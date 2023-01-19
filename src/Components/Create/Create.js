import React, { Fragment ,useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebseContext } from '../../Store/Context';

const Create = () => {
 const [name,setName] = useState('');
 const [category,setCategory] = useState('');
 const [price,setPrice] = useState('');
 const [image,setImage] = useState('');

 const history = useHistory();
 const firebase = useContext(FirebseContext);
 const {user} = useContext(AuthContext);
 const date = new Date();

 const handleSubmit = (e) =>{
  e.preventDefault();
  firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
    ref.getDownloadURL().then((url)=>{
      firebase.firestore().collection('products').add({
        name,
        category,
        price,
        url,
        userId:user.uid,
        createdAt:date.toDateString()
      })
      history.push('/');
    })
  })
}
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"  value={price} onChange={(e)=>setPrice(e.target.value)} id="fname"  name="Price"  />
            <br />
  
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
     
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
