import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Background images
import volcanoImg from '../assets/Volcanos.webp';
import nuclearImg from '../assets/nuclear.webp';
import coastalImg from '../assets/watercity.webp';

// Element and combination card images
import fireImg from '../assets/fire.png';
import airImg from '../assets/air.png';
import earthImg from '../assets/earth.png';
import waterImg from '../assets/water.png';
import peaceImg from '../assets/peace.png';

// Combination images
import cycloneImg from '../assets/cyclone.png';
import firestormImg from '../assets/firestorm.png';
import floodImg from '../assets/flood.png';
import tornadoImg from '../assets/tornado.png';
import steamImg from '../assets/steam.png';
import lavaImg from '../assets/lava.png';

// Card component
const Card = ({ src, alt }) => {
  return (
    <Grid item xs={2.4}>
      <div className="p-0.2 m-0.5 bg-white rounded-lg shadow text-center">
        <img src={src} alt={alt} style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '8%' }} />
      </div>
    </Grid>
  );
};

// Draggable Card component
const DraggableCard = ({ name, src }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { name, src },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card src={src} alt={name} />
    </div>
  );
};

// Slot component
const Slot = ({ index, onDrop, card }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: onDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Grid item xs={4} ref={drop}>
      <div className="p-0.5 m-0.5 bg-white rounded-lg shadow flex items-center justify-center" style={{ width: '160px', height: '240px', borderRadius: '8%', border: isOver ? '2px dashed blue' : '2px solid transparent' }}>
        {card && <img src={card} alt={`Combination ${index}`} style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '8%' }} />}
      </div>
    </Grid>
  );
};

// Main GameBoard component
const GameBoard = () => {
  const elementCards = [
    { name: 'Fire', src: fireImg },
    { name: 'Water', src: waterImg },
    { name: 'Earth', src: earthImg },
    { name: 'Air', src: airImg },
    { name: 'Peace', src: peaceImg }
  ];

  const [selectedCards, setSelectedCards] = useState(Array(3).fill(null));
  const [backgroundImage, setBackgroundImage] = useState('');
  const [locationName, setLocationName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const backgrounds = [
      { img: volcanoImg, name: "Volcano" },
      { img: nuclearImg, name: "Nuclear Site" },
      { img: coastalImg, name: "Watercity" }
    ];
    const chosenBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackgroundImage(chosenBackground.img);
    setLocationName(chosenBackground.name);
    let loc=(chosenBackground.name);
    setOpenDialog(true);
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDrop = (item, index) => {
    setSelectedCards(prevCards => {
      const newCards = [...prevCards];
      newCards[index] = item.src; // Store the src of the dropped card
      return newCards;
    });
  };

  const handleSubmit = () => {
    console.log('Submitted combinations', selectedCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>{`Your fight location is ${locationName}`}</DialogTitle>
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
        <div className="max-w-4xl mx-auto bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2 text-center">Your Hand</h2>
          <Grid container justifyContent="center" spacing={2}>
            {elementCards.map((card, index) => (
              <DraggableCard key={index} name={card.name} src={card.src} />
            ))}
          </Grid>
          <h2 className="text-lg font-bold mt-4 mb-2 text-center">Your Slots</h2>
          <Grid container justifyContent="center" spacing={2}>
            {selectedCards.map((card, index) => (
              <Slot key={index} index={index} onDrop={({ src }) => handleDrop({ src }, index)} card={card} />
            ))}
          </Grid>
          <div className="text-center mt-4">
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-lg shadow">
              Submit
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default GameBoard;
