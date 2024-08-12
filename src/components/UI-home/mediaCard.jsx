import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';



function MediaCard({ title, image, description, action }) {

  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        width: '100%',
        maxWidth: 345, 
        transition: 'transform 0.2s, box-shadow 0.2s', // Suavizar las transiciones
        '&:hover': {
          transform: 'scale(1.05)', // Escala la tarjeta para resaltarla
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Aumenta la sombra para darle profundidad
        } 
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(action)} size="small">Visitar módulo</Button>
      </CardActions>
    </Card>
  );
}





function CardContainer() {

  
const navigate = useNavigate();

  const cardData = [
    {
      title: "Canje de puntos",
      image: "/travel.jpeg",
      description: "Conoce todos los beneficios por los cuales puedes canjear tus puntos obtenidos por tu buen desempeño como colaborador",
      action: '/exchange'
    },
    {
      title: "Empleados",
      image: "/Vacaciones.jpeg",
      description: "Gestiona los empleados de tu empresa, potencia el desarrollo humano y aumenta la retención de personal ",
      action: '/employees'
    },
    {
      title: "Registros",
      image: "/Register.jpg",
      description: "Visualiza tus registros de ingreso a la empresa para comprobar el cumplimiento de tu horario y registro de tus biometricos    ",
      action: '/logs'
    },
    
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2, }} >
      <Grid container spacing={2} justifyContent={"center"}  >
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <MediaCard 
              title={card.title} 
              image={card.image} 
              description={card.description} 
              action={card.action}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardContainer;
