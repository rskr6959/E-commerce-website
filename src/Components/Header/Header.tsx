import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../Store/Store';

import './Header.css'



const Header = () => {

    const navigate = useNavigate();
    const { items } = useSelector((state: RootState) => state.cart);


    const pageChangeHandler = (page: string) =>
    {
        navigate(`/${page}`)

    }

  return (
    <div className='headerDiv'>  
        <div className = 'hstack gap-3 headerStack'>
            
            <div className = 'title'>The POP Shop</div>
            <div className = 'hstack gap-4'> 
                <div className = 'avatar'>PR</div>
                <button className = 'buttonStyles' onClick = {() => pageChangeHandler('')}>Logout</button>
            </div>
        </div>
        <div className = 'hstack gap-3 menuStack'>
            <div></div>
            <div className = 'hstack gap-5 '>
                <button className = 'buttonStyles' onClick = {() => pageChangeHandler('Homepage')}>Home</button>
                <button className = 'buttonStyles' onClick = {() => pageChangeHandler('Productpage')}>Products</button>
                <button className = 'buttonStyles' onClick = {() => pageChangeHandler('Cartpage')}>Cart ({items.length})</button>
                
            </div>

        </div>
      
    </div>
  )
}

export default Header
