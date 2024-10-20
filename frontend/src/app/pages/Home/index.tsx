import React, { useEffect, useState } from 'react';
import SideBarOf from 'app/components/SideBar';
import { Card, Typography, Grid, CardMedia, CardContent, CardActionArea, useMediaQuery } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from 'app/services/api';
import { useNavigate } from 'react-router-dom';
import getBackUrl from 'app/utils/generics/getBackUrl';



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
  const navigate = useNavigate();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const isMobile = useMediaQuery('(max-width:600px)');



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
    <div className="d-flex" style={{ flexDirection: 'row' }}>
      <SideBarOf />
      <div style={{ maxWidth: '100vw', backgroundColor: '#f8f8f8', padding: '20px', paddingRight: "17%" }}>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Bem-vindo à nossa plataforma de delivery!
          </Typography>
          <Typography variant="subtitle1">
            Descubra os melhores pratos e promoções na sua região.
          </Typography>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <Slider {...sliderSettings}>
          {food && food.map(b => (
          <div key={b.id}>
            <img
                src={getBackUrl() + "/" + (b.comidas.produtoImage || '')}
                alt={b.comidas.produto}
                style={{
                  width: '100%',
                  height: '500px', 
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            <Typography variant="h5" align="center">
              {b.comidas.produto} - {b.comidas.descricao}
            </Typography>
          </div>
        ))}
          </Slider>
        </div>
        <Typography variant="h5" gutterBottom>
          Explore por Categoria
        </Typography>
        <Grid container spacing={3}>
          {food && food.map(b => (
            <Grid item xs={12} sm={6} md={4} key={b.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={getBackUrl() + "/" + (b?.comidas.produtoImage || '')}
                    alt={b.comidas.produto}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
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
    </div>
  );
}

export default TelaInicial;
