import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

const Home = () => {
    const server = "https://fakestoreapi.com/";
    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetProductData = async() => {
            const { data } = await axios.get(server + "products?limit=10");
            setProductList(data);
       };
        fetProductData();
    }, []);


    const addToCartHandler = (options) => {
        dispatch({ type: 'addToCart', payload: options });
        dispatch({type:'calculatePrice'})
        toast.success('Added to Cart!');
    }
  return (
      <div className="home">
          {productList.map((product) => {
              return (<ProductCard key={product.id}
                  name={product.title}
                  id={product.id}
                  imgSrc={product.image}
                  price={product.price}
                  handler ={addToCartHandler}
              />)
          })}
         
    </div>
  )
}


const ProductCard = ({ name, id, price, handler, imgSrc }) => {
    
  
    return (
        <div className="productCard" key ={id}>
            <img src={imgSrc} alt={name} />
            <p>{name}</p>
            <h4>${price}</h4>
            <button onClick={() => { handler({name, price,id,quantity:1,imgSrc})}}>Add to Cart</button>
        </div>
    )
}

export default Home