import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useGame } from '../contexts/gamecontext'; // Make sure the path is correct
import cycloneImage from '../assets/cyclone.png';
import firestormImage from '../assets/firestorm.png';
import floodImage from '../assets/flood.png';
import tornadoImage from '../assets/tornado.png';
import firewater from '../assets/steam.png';
import lavaImage from '../assets/lava.png';
import peaceImage from '../assets/peace.png';

const images = {
  cyclone: cycloneImage,
  firestorm: firestormImage,
  flood: floodImage,
  tornado: tornadoImage,
  steam: firewater,
  lava: lavaImage,
  peace: peaceImage, 
};

const allCards = ['cyclone', 'firestorm', 'flood', 'tornado', 'steam', 'lava'];

const getWinner = (card1, card2) => {
  if (card1 === card2) return 'draw';
  if ((card1 === 'cyclone' && card2 === 'flood') ||
      (card1 === 'flood' && card2 === 'firestorm') ||
      (card1 === 'firestorm' && card2 === 'tornado') ||
      (card1 === 'tornado' && card2 === 'steam') ||
      (card1 === 'steam' && card2 === 'lava') ||
      (card1 === 'lava' && card2 === 'cyclone')) {
    return 'player1';
  }
  return 'player2';
};

const Duel = () => {
  const { background } = useGame();
  const [selectedCards, setSelectedCards] = useState(window.localStorage.getItem('selectedCards').split(',')); 
  const [currentCard, setCurrentCard] = useState(0);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const player2Cards = allCards
    .sort(() => 0.5 - Math.random())
    .slice(0, 3); // Select any three random cards for Player 2

  useEffect(() => {
    if (currentCard < 3) {
      const timeoutId = setTimeout(() => {
        const winner = getWinner(selectedCards[currentCard], player2Cards[currentCard]);
        if (winner === 'player1') {
          setPlayer1Points(points => points + 1);
        } else if (winner === 'player2') {
          setPlayer2Points(points => points + 1);
        }
        setCurrentCard(card => card + 1);
      },3000); // Delay for the animation

      return () => clearTimeout(timeoutId);
    } else {
      setShowPopup(true);
    }
  }, [currentCard, selectedCards, player2Cards]);

  return (
    <div className="min-h-screen w-full p-4" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} className="flex justify-center items-center h-240" style={{ minHeight: '240px' }}>Player 1</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className="flex justify-center items-center h-240" style={{ minHeight: '240px' }}>Player 2</Paper>
        </Grid>
      </Grid>
      
      <div className="flex justify-center items-center space-x-50 my-4">
        {currentCard < selectedCards.length && (
          <>
            <img src={images[selectedCards[currentCard]]} alt={"Player 1's card - " + selectedCards[currentCard]} className="transition-all duration-700 ease-in-out" style={{ width: '160px', height: '240px', objectFit: 'cover' }} />
            <img src={images[player2Cards[currentCard]]} alt={"Player 2's card - " + player2Cards[currentCard]} className="transition-all duration-700 ease-in-out" style={{ width: '160px', height: '240px', objectFit: 'cover' }} />
          </>
        )}
      </div>
      
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <p>{player1Points > player2Points ? 'Player 1 Wins!' : player2Points > player1Points ? 'Player 2 Wins!' : 'Draw!'}</p>
            <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Restart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Duel;
