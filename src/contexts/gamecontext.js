// src/contexts/GameContext.js
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);

    const store = {
        backgroundImage,
        setBackgroundImage,
        selectedCards,
        setSelectedCards
    };

    return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};
