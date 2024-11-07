import React, { useEffect, useState } from 'react';
import SideBarOf from 'app/components/SideBar';
import { Card, Typography, Grid, CardMedia, CardContent, CardActionArea, useMediaQuery, Box, Container } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from 'app/services/api';
import { useNavigate } from 'react-router-dom';
import getBackUrl from 'app/utils/generics/getBackUrl';
import MainLayout from 'app/layout/MainLayout';



interface Foods {
  id: number;
  produto: string;
  codigo: string;
  preco: number;
  produtoImage?: string | null;
  disponiveis: number;
  destaque: string;
  categoria: string;
  descricao: string;
}
interface Aprovracao {
  id: string,
  produtoId: string,
  status: string,
  disponivelParaCliente: boolean,
  createdAt: string,
  updatedAt: string,
  comidas: {
    id: number;
    produto: string;
    codigo: string;
    preco: number;
    produtoImage?: string | null;
    disponiveis: number;
    destaque: string;
    categoria: string;
    descricao: string;
  }
}



function TelaInicial() {

  const [food, setFood] = useState<Aprovracao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };



  const getComidas = async () => {
    try {
      const { data } = await api.get(`/show/food/aproved`,);
      setFood(data.data);
    } catch (e) {
      console.log(e);
      setError("Erro ao obter dados do produto.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComidas();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={isTablet ? 'column' : 'row'}
      justifyContent="center"
      alignItems="flex-start"
      width="100%"
      minHeight="100vh"
    >
      <div style={{ width: isTablet ? '100%' : '300px' }}>
        <SideBarOf />
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: isTablet ? '100%' : 'calc(100% - 300px)', 
          padding: '20px',
          paddingLeft: isTablet ? '5%' : '2%', 
          paddingRight: isTablet ? '5%' : '2%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden', 
        }}
      >
        <MainLayout />
        <Box
          bgcolor="#fff"
          p={2}
          sx={{
            borderBottomLeftRadius: 10,  
            borderBottomRightRadius: 10, 

          }}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Bem-vindo à nossa plataforma de delivery!
          </Typography>
          <Typography variant="subtitle1">
            Descubra os melhores pratos e promoções na sua região.
          </Typography>
        </Box>
        <Box mb={3}>
          <Slider {...sliderSettings}>
            {food.map(b => (
              <Box key={b.id} maxWidth={2500} justifyContent="center" alignItems="center">
                <img
                  src={getBackUrl() + "/" + (b.comidas.produtoImage || '')}
                  alt={b.comidas.produto}
                  style={{
                    width: '100%',

                    height: isMobile ? '300px' : '500px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
                <Typography variant="h5" align="center">
                  {b.comidas.produto} - {b.comidas.descricao}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
        <Typography variant="h5" gutterBottom>
          Explore por Categoria
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {food.map(b => (
            <Grid item xs={12} sm={6} md={4} key={b.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height={isMobile ? '200' : '300'}
                    image={getBackUrl() + "/" + (b.comidas.produtoImage || '')}
                    alt={b.comidas.produto}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {b.comidas.produto}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {b.comidas.descricao}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}

export default TelaInicial;