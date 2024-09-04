import React, { useEffect, useState } from 'react';
import './Product.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
const navigate =useNavigate();
    useEffect(() => {
        fetch('/api/account/getAllProducts')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddToFavorites = (productId) => {
        console.log(`Product ${productId} added to favorites.`);

    };

    const handleAddToCart = (productId) => {

        const userId = sessionStorage.getItem('UserId');
        if (!userId) {
            console.error('User is not logged in');
            alert("please login to add product to cart")
            navigate("/login");
            return;
        }


        const selectedProduct = products.find(product => product.id === productId);
        if (!selectedProduct) {
            console.error('Product not found');
            return;
        }


        const cartData = {
            userId,
            productId: selectedProduct.id,
            unitPrice: selectedProduct.unitPrice,
            discount: selectedProduct.discount,
            quantity: 1,
            Name: selectedProduct.name,
            ManufacturedBy: selectedProduct.manufacturedBy,
            ImageUrl: selectedProduct.imageUrl,
            

            totalPrice: (selectedProduct.unitPrice - selectedProduct.discount)
        };
        console.log("rrrrrrrrrr", selectedProduct);

        fetch('/api/account/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                console.log(`Product ${productId} added to cart.`, data);

            })
            .catch(error => console.error('Error adding product to cart:', error));
    };

    return (
        <div className="products-container">
            <h1>Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h5 className='p-datah'>{product.manufacturedBy}</h5>
                            <hr/>
                            <p className='p-data'> {product.name}</p>
                            <p className='p-data'>Price :  ${product.unitPrice}</p>
                            <p className='p-data'>Discount :  {product.discount}%</p>
                            <p className='p-data'>Quality :  {product.quality}</p>
                            <div className="product-actions">
                                <button
                                    className="favorite-button"
                                    onClick={() => handleAddToFavorites(product.id)}
                                >
                                    Add to Favorite
                                </button>
                                <button
                                    className="cart-button"
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
