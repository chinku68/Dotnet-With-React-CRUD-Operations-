import React, { useEffect, useState } from 'react';

const CartItems = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="cart-items-container">
            <h1>Your Cart Items</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="cart-items-list">
                    {cartItems.map(item => (

                        <li key={item.id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h2>{item.name}</h2>
                                <p><strong>Price:</strong> ${item.unitPrice}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Total:</strong> ${item.unitPrice * item.quantity}</p>
                                <p>{item.id}</p>
                            </div>
                            <button
                                className="remove-cart-button"
                                onClick={() => removeFromCart(item.cartID)}>
                                Remove from Cart
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartItems;

