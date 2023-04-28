import React from 'react';
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const { cartItems ,subTotal ,shipping,tax,total } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const incrementHandler = (id) => {
        dispatch({ type: 'addToCart', payload: { id } });
        dispatch({type:'calculatePrice'})

    }
    const decrementHandler = (id) => {
        dispatch({ type: 'remove', payload: id });
        dispatch({type:'calculatePrice'})

    }

    const deleteFromCart = (id) => {
        dispatch({ type: 'deleteFromCart', payload: id });
        dispatch({type:'calculatePrice'})

    }
    
  return (
      <div className="cart">
          <main>
              {cartItems.length > 0 ?
                  cartItems.map((item) => {
                      return <CartItem key={item.id} imgSrc={item.imgSrc} price={item.price} qty={item.quantity} id={item.id} incrementHandler={incrementHandler}
                          decrementHandler={decrementHandler}
                      deleteHandler={deleteFromCart}/>
                  }) : <h1>No Item Selected</h1> 
              }     
          </main>
          <aside>
              <h2>SubTotal: ${subTotal}</h2>
              <h2>Shipping: ${shipping}</h2>
              <h2>Tax: ${tax}</h2>
              <h2>Total: ${total}</h2>
        </aside>
    </div>
  )
}

const CartItem = ({imgSrc,name,price,qty,decrementHandler,incrementHandler,deleteHandler,id}) => {
    return (<div className="cartItem">
        <img src={imgSrc} alt ={name} />
        <article>
            <h3>{name}</h3>
            <p>${price}</p>
        </article>
        <div>
            <button onClick={() =>{decrementHandler(id)}}>-</button>
            <p>{qty}</p>
            <button onClick={() =>{incrementHandler(id)}}>+</button>
            <AiFillDelete onClick={ () =>{deleteHandler(id)}} />
        </div>
    </div>)
}

export default Cart