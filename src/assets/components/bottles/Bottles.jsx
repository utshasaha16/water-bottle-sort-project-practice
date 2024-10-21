import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../bottle/bottle";
import './bottles.css'
import { addToLs, getStoredCart } from "../../utilities/utilities";
import Cart from "../cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])

    // load cart to local storage
    useEffect(() =>{
        console.log('called the useEffect', bottles.length);
        if(bottles.length > 0){
            const storedCart = getStoredCart()
        console.log(storedCart, bottles);
            const saveCart = [];
            for(const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    saveCart.push(bottle)
                }
            }
            console.log('saved cart', saveCart);
            setCart(saveCart)

        }
    }, [bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle]
        setCart(newCart);
        addToLs(bottle.id)
    }

    return (
        <div>
            <h3>Bottles Available: {bottles.length}</h3>
            <Cart cart={cart}></Cart>
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