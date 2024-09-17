import React, { useEffect, useState } from 'react';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/api/account/getAllProducts')
            .then(response => response.json())
            .then(data => setProducts(data)
            )
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('UserId');
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        fetch(`/api/account/getfavorites?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.favorites) {
                    setFavorites(data.favorites);
                }
            })
            .catch(error => console.error('Error fetching favorite products:', error));
    }, []);


    const handleAddToFavorites = (productId) => {
        console.log(`Product ${productId} added to favorites.`);
        const userId = sessionStorage.getItem('UserId');
        if (!userId) {
            console.error('User is not logged in');
            // alert("please login to add product to favourite")
            navigate("/login");
            return;
        }
        const selectedProduct = products.find(product => product.id === productId);
        if (!selectedProduct) {
            console.error('Product not found');
            return;

        }
        let formData = new FormData();
        formData.append("UserId", userId);
        formData.append("ProductId", selectedProduct.id);
        const favData = {
            userId,
            productId: selectedProduct.id,
        }

        fetch('/api/account/addfav', {
            method: 'POST',

            body: formData//JSON.stringify(favData),
        })
            .then(response => response.json())
            .then(data => {
                // alert(data.message);
                console.log(data.message);

                // Toggle the favorite status based on the response

                if (data.message.includes("added")) {
                    setFavorites([...favorites, productId]); // Add to favorites
                } else if (data.message.includes("removed")) {
                    setFavorites(favorites.filter(id => id !== productId)); // Remove from favorites
                }

            })
            .catch(error => console.error('Error adding/removing product to favorites:', error));
    };

    const isFavorite = (productId) => favorites.includes(productId);
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
        console.log("", selectedProduct);

        fetch('/api/account/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
        })
            .then(response => response.json())
            .then(data => {
                // alert(data.message);
                navigate("/cart");
                console.log(`Product ${productId} added to cart.`, data);

            })
            .catch(error => console.error('Error adding product to cart:', error));
    };
    console.log("ppp", products)
    return (
        <div className="products-container">
            <h1>Products</h1>
            <div>
                <div className="products-grid">

                    {products.map(product => (

                        <div key={product.id} className="product-card">
                            <div className='fav-icon'>
                                {isFavorite(product.id) ? (
                                    <FavoriteIcon
                                        style={{ color: 'red' }}
                                        onClick={() => handleAddToFavorites(product.id)}
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        onClick={() => handleAddToFavorites(product.id)}
                                    />
                                )}
                            </div>
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h5 className='p-datah'>{product.manufacturedBy.toUpperCase()}</h5>
                                <hr />
                                <p className='p-data'> {product.name}</p>
                                <p className='p-data'>Price :  ${product.unitPrice}</p>
                                <p className='p-data'>Discount :  {product.discount}%</p>
                                <p className='p-data'>Quality :  {product.quality}</p>
                                <div className="product-actions">
                                    {/* {isFavorite(product.id) ? (
                                    <FavoriteIcon
                                        style={{ color: 'red' }} // Colored icon for favorite
                                        onClick={() => handleAddToFavorites(product.id)}
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        onClick={() => handleAddToFavorites(product.id)}
                                    />
                                )} */}

                                    <button
                                        className="cart-button"
                                        onClick={() => handleAddToCart(product.id)}
                                    >
                                        🛒  Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;



export const AddToFav = () => {

    return (
        <div>
            <h1>Hello</h1>
        </div>

    );
}