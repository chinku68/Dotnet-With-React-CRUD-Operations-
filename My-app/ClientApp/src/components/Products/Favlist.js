import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const FavouriteList = () => {
    const [favourites, setFavourites] = useState([]);
    const navigate = useNavigate();
    // Fetch favourites from API
    useEffect(() => {
        const userId = sessionStorage.getItem('UserId');

        if (userId) {
            fetch(`/api/account/favourites/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setFavourites(data);
                        console.log("ffffff",data);
                        
                    }
                })
                .catch(error => console.error('Error fetching favourites:', error));
        }
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
                if (data.favourites) {
                    setFavourites(data.favourites);
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
        const selectedProduct = favourites.find(favourites => favourites.productId === productId);
        if (!selectedProduct) {
            console.error('Product not found');
            return;

        }
        
        let formData = new FormData();
        formData.append("UserId", userId);
        formData.append("ProductId", selectedProduct.productId)

        fetch('/api/account/addfav', {
            method: 'POST',

            body: formData//JSON.stringify(favData),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                console.log(data.message);

                

                if (data.message.includes("added")) {
                    setFavourites([...favourites, productId]); 
                } else if (data.message.includes("removed")) {
                    setFavourites(favourites.filter(id => id !== productId)); 
                }

            })
            .catch(error => console.error('Error adding/removing product to favorites:', error));
    };

    const isFavorite = (productId ) => favourites.includes(productId);

    console.log("557",favourites);

    const handleAddToCart = (productId) => {

        const userId = sessionStorage.getItem('UserId');
        if (!userId) {
            console.error('User is not logged in');
            alert("please login to add product to cart")
            navigate("/login");
            return;
        }


        const selectedProduct = favourites.find(favourites => favourites.productId === productId);
        if (!selectedProduct) {
            console.error('Product not found');
            return;
        }


        const cartData = {
            userId,
            productId: selectedProduct.productId,
            unitPrice: selectedProduct.unitPrice,
            discount: selectedProduct.discount,
            quantity: 1,
            Name: selectedProduct.name,
            ManufacturedBy: selectedProduct.manufaturedBy,
            ImageUrl: selectedProduct.imageUrl,


            totalPrice: (selectedProduct.unitPrice - selectedProduct.discount)
        };
        

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
        <div className="favourites-container">
            <h1>My Favourite Products</h1>
            {favourites.length > 0 ? (
                <div className="favourites-grid">
                    {favourites.map(fav => (
                        <div key={fav.id} className="favourite-card">
                            <img src={fav.imageUrl} alt={fav.name} className="favourite-image" />
                            <div className="favourite-info">
                                <h5 className='p-datah'>{fav.manufaturedBy}</h5>
                                <hr />
                                <p className='p-data'>{fav.name}</p>
                                <p className='p-data'>Price: ${fav.unitPrice}</p>
                                <p className='p-data'>Discount: {fav.discount}%</p>
                                <p className='p-data'>Quantity: {fav.quantity}</p>
                                <div className="favourite-actions">
                                    {isFavorite(fav.productId) ? (
                                        <FavoriteIcon
                                            style={{ color: 'red' }}
                                            onClick={() => handleAddToFavorites(fav.productId)}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            onClick={() => handleAddToFavorites(fav.productId)}
                                        />
                                    )}
                                    <button
                                        className="cart-button"
                                        onClick={() => handleAddToCart(fav.productId)}
                                    >
                                        🛒 Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favourites found.</p>
            )}
        </div>
    );
};

export default FavouriteList;

