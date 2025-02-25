import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../Store/Store';
import { removeItem, updateQuantity } from '../../../Store/cartSlice';

import './Cart.css';


const Cart = () => { 
  const dispatch = useDispatch();
  const { items, totalCost } = useSelector((state: RootState) => state.cart);

  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate();

  const productsHandler = () => {
    navigate('/Productpage');
  };

  const handleShowModal = () => {
    setShowModal(true);
  }

  const checkoutHandler = () => {
    setShowModal(false);
    alert('Thank you! Payment Recieved')
    navigate('/Homepage');
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div >
      {items.length === 0 ? (
        <div className="vstack gap-3 mainContent">
          <p className="headerStyle">Shopping Cart</p>
          <p className="subtextStyle">You have no items to display in your cart</p>
          <button onClick={productsHandler} className="buttonStyle">Continue Shopping</button>
        </div>
      ) : (
        <div style={{ paddingBottom: '5rem', marginTop: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {items.map((item) => (
            <div key={item.id} className="cartItem">
              <div className="hstack gap-5">
                <img src={item.image} className="imageStyle" alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <div className='vstack gap-3'>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))}
                    />
                    <button className = 'removeStyle' onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
          <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
          <button className="buttonStyle" onClick={() => handleShowModal()}>Proceed</button>

          {showModal && (
            <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title modalHeader">Please fill the details!</h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body modalText" style ={{padding:'2rem'}}>
                    <div className = 'vstack gap-2'>
                      <div className = 'hstack gap-5'> 
                      <p>Card Number: </p>
                      <input type = 'number' className='cardCounter' placeholder='XXXX XXXX XXXX XXXX'/>
                      </div>
                      <div className = 'hstack gap-5' style = {{marginLeft: '4.3rem'}}> 
                      <p>CVV: </p>
                      <input type = 'number' className='cardCounter' placeholder='XXX'/>
                      </div>
                      <div className = 'hstack gap-3' style = {{marginLeft: '3.4rem'}}> 
                      <p>Valid Thru: </p>
                      <input placeholder='MM/YYYY'/>
                      </div>
                      <div className = 'hstack gap-3' > 
                      <p>Name on the Card: </p>
                      <input placeholder='Name'/>
                      </div>
                      <button className='checkoutButton' onClick={() => checkoutHandler()}>Check out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}    
        </div>
      )}
    </div>
  );
};

export default Cart;
