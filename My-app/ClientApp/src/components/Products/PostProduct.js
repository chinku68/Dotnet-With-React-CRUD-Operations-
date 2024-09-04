import React, { useState } from 'react';
import './Product.css'; 

const PostProduct = ({ User }) => {
    const [form, setForm] = useState({
        name: "",
        manufaturedBy: "",
        unitPrice: "",
        discount: "",
        quality: "",
        imageUrl: ""
    });

    // Check if the user type is Admin
    const isAdmin = User && User.type === "Admin";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const userId = sessionStorage.getItem("UserId");
        let formData = new FormData();
        formData.append("UserId", userId);
        formData.append("Name", form.name);
        formData.append("ManufaturedBy", form.manufaturedBy);
        formData.append("UnitPrice", form.unitPrice);
        formData.append("Discount", form.discount);
        formData.append("Quality", form.quality);
        formData.append("ImageUrl", form.imageUrl);

        fetch("api/account/postproduct", {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => alert(data))
            .catch(error => console.error("Error:", error));
    };

    return (
        <div className="post-product-container">
            {isAdmin ? (
                <form className="post-product-form" onSubmit={submitHandler}>
                    <input 
                        type='text' 
                        name='name' 
                        value={form.name} 
                        placeholder='Product Name' 
                        onChange={handleChange} 
                        className="post-product-input"
                    />
                    <input 
                        type='text' 
                        name='manufaturedBy' 
                        value={form.manufaturedBy} 
                        placeholder='Manufactured By' 
                        onChange={handleChange} 
                        className="post-product-input"
                    />
                    <input 
                        type='number' 
                        name='unitPrice' 
                        value={form.unitPrice} 
                        placeholder='Unit Price' 
                        onChange={handleChange} 
                        className="post-product-input"
                    />
                    <input 
                        type='number' 
                        name='discount' 
                        value={form.discount} 
                        placeholder='Discount' 
                        onChange={handleChange} 
                        className="post-product-input"
                    />
                    <input 
                        type='number' 
                        name='quality' 
                        value={form.quality} 
                        placeholder='Quality' 
                        onChange={handleChange} 
                        className="post-product-input"
                    />
                    <input 
                        type='text' 
                        name='imageUrl' 
                        value={form.imageUrl} 
                        placeholder='Image URL' 
                        onChange={handleChange} 
                        className="post-product-input"
                    />
                    <button type='submit' className="post-product-button">Post Product</button>
                </form>
            ) : (
                <p className="non-admin-message">You are not an Admin to post products.</p>
            )}
        </div>
    );
};

export default PostProduct;
