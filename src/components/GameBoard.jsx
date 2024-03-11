import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Route } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Routes from 'react-router-dom';
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
import { Navigate } from 'react-router-dom';

// Combination logic
const combinations = {
  'AirWater': cycloneImg,
  'WaterAir': cycloneImg,
  'AirFire': firestormImg,
  'FireAir': firestormImg,
  'WaterFire': steamImg,
  'FireWater': steamImg,
  'EarthAir': tornadoImg,
  'AirEarth': tornadoImg,
  'EarthWater': floodImg,
  'WaterEarth': floodImg,
  'FireEarth': lavaImg,
  'EarthFire': lavaImg,
  'Peace': peaceImg // Assuming 'Peace' goes alone
};



const GameBoard = () => {
   const [isDuel, setIsDuel] = useState(false);


const Card = ({ src, alt }) => {
    return (
        <div className="p-0.2 m-0.5 bg-white rounded-lg shadow text-center">
          <img src={src} alt={alt} style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '8%' , marginRight: 0 }} />
        </div>
    );
  };
  
  const DraggableCard = ({ name, src , index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'card',
      item: { name, src , sourceIndex: index },
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
  
  
  // const Slot = ({ index, onDrop, cards }) => {
  //   const [{ isOver, canDrop }, drop] = useDrop(() => ({
  //     accept: 'card',
  //     drop: (item) => onDrop(index, item),
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //       canDrop: !!monitor.canDrop(),
  //     }),
  //   }));
  const Slot = ({ index, onDrop, cards , maxCapacity }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'card',
        drop: (item) => onDrop(index, item , maxCapacity),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });
  
    // This part of the logic ensures the combination or the first card's image shows up
    // We use 'comboKey' to identify the combination
    // If there's no combination, we use the image of the first non-null card
    let imgSrc = null;
    if (cards.filter(Boolean).length > 0) { // Checks if there's at least one card
      const comboKey = cards.map(card => card ? card.name : '').join('');
      imgSrc = combinations[comboKey] || cards.find(card => card)?.src;
    }
  
    return (
      // <Grid item xs={4} ref={drop} style={{ display: 'flex', justifyContent: 'center', minHeight: '240px' }}>
      //   <div className={`slot ${isOver && canDrop ? 'bg-blue-100' : 'bg-white'}`} style={{ width: '320px', height: '240px', borderRadius: '8%', border: '2px dashed grey', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      //     {imgSrc && <img src={imgSrc} alt={`Combination ${index}`} style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '8%' }} />}
      //     {!imgSrc && canDrop && <div style={{ width: '160px', height: '240px', lineHeight: '240px', textAlign: 'center' }}>Drop here</div>}
      //     {!imgSrc && !canDrop && <div style={{ width: '160px', height: '240px', lineHeight: '240px', textAlign: 'center' }}>Empty Slot</div>}
      //   </div>
      // </Grid>
      <Grid item xs={4} ref={drop} style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={`slot ${isOver ? 'bg-blue-100' : 'bg-white'}`} style={{ width: '160px', height: '240px', borderRadius: '8%', border: '2px dashed grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {cards[0] && (
              <img src={cards[0].src} alt={cards[0].name} style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '8%' }} />
          )}
          {cards[1] && (
              <img src={cards[1].src} alt={cards[1].name} style={{ width: '160px', height: '240px', objectFit: 'cover', borderRadius: '8%' }} />
          )}
          {!cards[0] && !isOver && <div style={{ width: '160px', height: '240px', lineHeight: '240px', textAlign: 'center' }}>Empty Slot</div>}
          {isOver && <div style={{ width: '160px', height: '240px', lineHeight: '240px', textAlign: 'center', color: 'blue' }}>Drop here</div>}
      </div>
      </Grid>
    );
  };


  
  const elementCards = [
    { name: 'Fire', src: fireImg },
    { name: 'Water', src: waterImg },
    { name: 'Earth', src: earthImg },
    { name: 'Air', src: airImg },
    { name: 'Peace', src: peaceImg }
  ];
  const [initialCards, setInitialCards] = useState(elementCards);
  const [selectedCards, setSelectedCards] = useState([[], [], []]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [locationName, setLocationName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  ///location setter
  useEffect(() => {
    const backgrounds = [
      { img: volcanoImg, name: "Volcano" },
      { img: nuclearImg, name: "Nuclear Site" },
      { img: coastalImg, name: "Watercity" }
    ];
    const chosenBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackgroundImage(chosenBackground.img);
    setLocationName(chosenBackground.name);
    setOpenDialog(true);
  }, []);

    // Other constants and state variables...

    const handleDrop = (index, item , maxCapacity = 2 ) => {
      setSelectedCards(prevSelectedCards => {
          const newSelectedCards = [...prevSelectedCards];
          const currentSlotCards = [...newSelectedCards[index]];
          // Prevent adding the same card or more than two cards to the slot
          if (currentSlotCards.length < maxCapacity && !currentSlotCards.find(card => card.name === item.name)) {
              currentSlotCards.push(item);
              newSelectedCards[index] = currentSlotCards;              // combione logic
              if(currentSlotCards.length  === maxCapacity){
                console.log('Combination is ready');
                console.log(item)
                const newName =  currentSlotCards[0].name + currentSlotCards[1].name 
                const newSrc = combinations[newName]
                if(newSrc !== undefined)      
                {
                  const newCard =  {name :newName, src : newSrc , index : currentSlotCards[0].sourceIndex + currentSlotCards[1].sourceIndex}
                  newSelectedCards[index] = [newCard , null]
                }
              }
          }
          

          return newSelectedCards;
      });
      setInitialCards(prevInitialCards => {
        return prevInitialCards.filter(c => c.name !== item.name)
      }
      )
  };
  
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    console.log('Submitted combinations', selectedCards);
    window.location.href = "./Duel";
    window.localStorage.setItem('selectedCards', JSON(selectedCards));
    // setIsDuel(true);
    // <route path="./Duel" element={"/Duel"} />
  };

  
  const handleReset = () => {
    setInitialCards(elementCards);
    setSelectedCards([[], [], []]);
  };

  // if(isDuel){
  //   return <Duel {...selectedCards} />;
  // }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen w-full p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>{`Your fight location is ${locationName}`}</DialogTitle>
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
        <div className="max-w-4xl mx-auto bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2 text-center">Your Hand</h2>
          <Grid container justifyContent="center" spacing={2}>
            {initialCards.map((card, index) => (
              <DraggableCard key={index} name={card.name} src={card.src} index = {index} />
            ))}
          </Grid>
          <h2 className="text-lg font-bold mt-4 mb-2 text-center">Your Slots</h2>
          <Grid container justifyContent="center" spacing={2}>
            {selectedCards.map((pair, index) => (
              <Slot key={index} index={index} cards={pair} maxCapacity={2} onDrop={handleDrop} />
            ))}
          </Grid>
          <div className="text-center mt-4">
            <button onClick={()=>{handleSubmit()}} className="bg-blue-500 text-white p-2 rounded-lg shadow">
              Submit
            </button>
            <button onClick={handleReset} className="bg-blue-500 text-white p-2 rounded-lg shadow">
              Reset Selection
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
export default GameBoard;

