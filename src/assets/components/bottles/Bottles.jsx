import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../bottle/bottle";
import './bottles.css'

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle]
        setCart(newCart);
    }

    return (
        <div>
            <h3>Bottles Available: {bottles.length}</h3>
            <h4>Cart: {cart.length}</h4>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle
                    handleAddToCart={handleAddToCart}
                    key={bottle.id}
                    bottle={bottle}
                    ></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;