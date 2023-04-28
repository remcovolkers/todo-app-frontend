import React from 'react';
import Confetti from 'react-dom-confetti';
import './CustomConfetti.css';



const config = {
    angle: 90,
    spread: 360,
    startVelocity: 45,
    elementCount: 70,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const CustomConfetti = ({ active }) => {
    return (
        <div className="custom-confetti">
            <Confetti active={active} config={config} />
        </div>
    );
};

export default CustomConfetti;