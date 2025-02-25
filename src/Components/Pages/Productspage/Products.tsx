

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addItem } from '../../../Store/cartSlice';
import './Products.css'



type ApiResponse = {
 id: number,
 title :string ,
 image:any,
 price: number,
 catogery: string,
 description: any

};


const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState<ApiResponse[] | null>(null);

    useEffect(() => {
        fetch("http://localhost:8000/backend/index.php")
            .then(response => response.json())
            .then((data: ApiResponse[]) => {
                        setProducts(data);
                      })
    }, []);

    const addToCart = (product: ApiResponse) => {
        dispatch(addItem({ image: product.image, id: product.id , title: product.title, price: product.price, quantity: 1 }));
        navigate('/Cartpage');

    };

    return (
        <div>
            <div className = 'mainContent'>
                {
                    products ?
                    <div className='hstack productGrid'>
                    {products.map((product: ApiResponse) => (
                        
                        <div key={product.id}>
                            <div className = 'vstack itemStack'>
                                <img src = {product.image} className = 'imageStyle'/>
                                <p className = 'titleStyle'>{product.title}</p>
                                <p className = 'priceStyle'>{`Price: $${product.price}`}</p>
                                <p className = 'catogeryStyle'>{ `Catogery: ${product.catogery}`}</p>
                                <p className='descriptionStyle'>{`About: ${product.description}`}</p>
                                <button onClick={() =>{addToCart(product)}} className = 'buttonStyle'>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                    </div>
                :
                <h1 className = 'loadingStyle'>Loading...</h1>
                }

            </div>
        </div>
    );
};

export default ProductList;
