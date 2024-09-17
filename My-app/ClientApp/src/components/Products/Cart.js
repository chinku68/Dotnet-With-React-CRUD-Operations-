import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchCartItems = async () => {
        try {
            const userId = sessionStorage.getItem('UserId');
            if (!userId) {
                throw new Error('User ID not found in session storage.');
            }

            const response = await fetch(`/api/account/cart/${userId}`);
            if (!response.ok) {
                throw new Error('No Cart Items found');
            }

            const data = await response.json();
            setCartItems(data);


        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchCartItems();

    console.log("cart", cartItems);
    useEffect(() => {
        fetchCartItems();
    }, []);
    const removeFromCart = async (itemId) => {
        console.log("", itemId);
        try {
            const response = await fetch(`/api/account/removeCart/${itemId}`, {
                method: 'DELETE',
            });
            alert("removed from cart")
            fetchCartItems();
            if (!response.ok) {
                throw new Error('Failed to remove item from cart.');
            }


            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            setError(error.message);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }
    const handleShopNow = () => {
        navigate("/")

    }

    console.log("len", cartItems.length);
    return (
        <div className="cart-items-container">
            {/* <h1>Your Cart Items</h1> */}
            {cartItems.length === 0 ? (
                <Grid container className="empty-cart-container">
                    <Card className="empty-cart-card">
                        <ShoppingCartOutlinedIcon className="empty-cart-icon" />
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Your Cart is Empty
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                Looks like you haven’t added anything to your cart yet!
                            </Typography>
                        </CardContent>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" size="large" onClick={handleShopNow}>
                                Shop Now
                            </Button>
                        </Box>
                    </Card>
                </Grid>

            ) : (
                <>
                    <div className="cart-container">
                        {cartItems.map(item => {
                            const discountedPrice = item.unitPrice * (1 - item.discount / 100);
                            return (
                                <div key={item.id} className="cart-card">
                                    <img src={item.imageUrl} alt={item.name} className="cart-card-image" />
                                    <div className="cart-card-details">
                                        <h5 className="product-manufacturer">{item.manufacturedBy}</h5>
                                        <h2 className="product-name">{item.name}</h2>
                                        <p className="product-price"><strong>Price:</strong> ${item.unitPrice}</p>
                                        <p className="product-quantity"><strong>Quantity:</strong> {item.quantity}</p>
                                        <p className="product-discount"><strong>Discount:</strong> {item.discount}%</p>
                                        <p className="product-total"><strong>Total:</strong> ${(discountedPrice * item.quantity).toFixed(2)}</p>
                                        <button
                                            className="remove-cart-butto"
                                            onClick={() => removeFromCart(item.cartID)}>
                                            Remove 
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <hr />
                    {/* Calculate the total price with discount applied */}
                    <h3>
                        Total Price: ${cartItems.reduce((acc, item) => {
                            const discountedPrice = item.unitPrice * (1 - item.discount / 100);
                            return acc + discountedPrice * item.quantity;
                        }, 0).toFixed(2)}
                    </h3>
                </>
            )}
        </div>

    );
};

export default CartItems;

