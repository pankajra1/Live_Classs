import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../image.png"; // Ensure the path is correct
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Container,
} from "@mui/material";

const HomePage = () => {
  const [classCode, setClassCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    navigate(`/GameBoard/${classCode}`);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100vh', padding: 4 }}>
      <Box sx={{ width: '100%', textAlign: 'center', mb: 8 }}>
        <img src={logo} alt="logo" style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }} />
        <Paper variant="outlined" sx={{ mt: 4, padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Enter the Game Code
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="gameCode"
              label="Game Code"
              variant="outlined"
              fullWidth
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Enter Room
            </Button>
          </form>
        </Paper>
      </Box>
      
      <Paper sx={{ width: '150%', p: 5, mt: 2 }}>
        <Typography variant="subtitle1" sx={{ color: "#333", fontStyle: "italic" }}>
          hierarchy of elements and their interactions in the game:npm install react-dnd react-dnd-html5-backend

          <p>Cyclone defeats Flood: A cyclone disperses floodwaters, reducing their impact.</p>
          <p>Flood defeats Firestorm: A flood can extinguish the flames of a firestorm.</p>
          <p>Firestorm defeats Tornado: The heat from a firestorm can disrupt a tornado's air circulation.</p>
          <p>Tornado defeats Steam: A tornado disperses steam into the atmosphere, cooling it down.</p>
          <p>Steam defeats Lava: Steam cools and solidifies lava, stopping its flow.</p>
          <p>Lava defeats Cyclone: Lava heats the air, which can disrupt a cyclone's structure.</p>
          <p>Lava defeats Cyclone: Lava heats the air, which can disrupt a cyclone's structure.</p>
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#333", fontStyle: "italic", mt: 2 }}>
          Combinations:
          <br />
          Air + Water = Cyclone
          <br />
          Air + Fire = Firestorm
          <br />
          Water + Fire = Flood
          <br />
          Air + Earth = Tornado
          <br />
          Fire + Water = Steam
          <br />
          Fire + Earth = Lava
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;
