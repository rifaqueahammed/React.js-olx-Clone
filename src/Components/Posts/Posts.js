import React,{useContext,useEffect,useState} from 'react';

import Heart from '../../assets/Heart';
import { FirebseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import { useHistory } from 'react-router-dom';
import './Post.css';

function Posts() {
  const firebase = useContext(FirebseContext);
  const {setPostDetails} = useContext(PostContext)
  const [products,setProducts] = useState([]);
  const history = useHistory();

  useEffect(()=>{
    firebase.firestore().collection('products').get().then((snapshot)=>{
      const allPost = snapshot.docs.map((product)=>{
        return{
          ...product.data(),
          id:product.id

        }
      })
      setProducts(allPost);
    })
  },[firebase]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product)=>{
            return(
         <div
            className="card"
            onClick={()=>{
              setPostDetails(product);
              history.push('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            )
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map((product)=>{
            return(
              <div className="card" onClick={()=>{
                setPostDetails(product);
                history.push('/view')
              }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            )
            })}
          
        </div>
      </div>
    </div>
  );
}

export default Posts;
