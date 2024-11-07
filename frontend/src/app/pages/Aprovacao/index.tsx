import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Drawer, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import SideBarOf from "app/components/SideBar";


import React, { useContext, useEffect, useRef, useState } from "react";


import {
  ButtonAproved,
  ButtonContainer,
  ButtonReproved,
  Categoryaa,
  Description,
  GridWrapper,
  Images,
  Price,
  SectionWrapper,
  Title,
  Wrapper,
  WrapperBack,

  WrapperImage,
} from "./styles";
import api from "app/services/api";
import { useNavigate } from "react-router-dom";
import getBackUrl from "app/utils/generics/getBackUrl";
import MainLayout from "app/layout/MainLayout";


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
}


function Aprovacao() {
  const [food, setFood] = useState<Foods[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width:1000px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [buyPacks, setBuyPacks] = useState<Aprovracao[]>([]);

  const getPacks = async () => {
    try {
      const { data } = await api.get(`/show/food`,);
      setFood(data.data);
    } catch (e) {
      console.log(e);
      setError("Erro ao obter dados do produto.");
    } finally {
      setLoading(false);
    }
  };
  const handleAproved = async (produtoId: number) => {
    try {
      await api.post(`/aproved/produto`, {
        produtoId,
        status: "Aprovado",
      });

      alert("Produto aprovado e adicionado ao Cardápio!");
      setBuyPacks([]);
      getPacks();
    } catch (e) {
      console.log(e);
      setError("Erro ao aprovar o produto.");
    } finally {
      setLoading(false);
    }
  };

  const handleReproved = async (produtoId: number) => {
    try {
      await api.post(`/reproved/produto`, {
        produtoId,
        status: "Reprovado",
      });

      alert("Produto reprovado!");
      setBuyPacks([]);
      getPacks();
    } catch (e) {
      console.log(e);
      setError("Erro ao reprovado o produto.");
    } finally {
      setLoading(false);
    }
  };
  // const DeletProduto = async (id: string) => {
  //   try {
  //     const { data } = await api.delete(`/delete/produto/food/${id}`,);
  //     setFood(data.data.data);
  //   } catch (e) {
  //     getPacks();
  //     alert("Produto Deletado com sucesso!");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    getPacks();
  }, []);

  const getStarRating = (qtdusuarios: number) => {
    if (qtdusuarios <= 25) return 1;
    if (qtdusuarios <= 50) return 2;
    if (qtdusuarios <= 75) return 3;
    if (qtdusuarios <= 100) return 4;
    return 5;
  };

  // const toggleDescription = (id: string) => {
  //   setShowFullDescription(prevState => ({
  //     ...prevState,
  //     [id]: !prevState[id]
  //   }));
  // };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };


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

        <Grid container spacing={3} justifyContent="center">
          {food && food.map(b => (
           <Grid item xs={12} sm={6} md={4} key={b.id}>
            <Card>
            <CardActionArea>
            <CardMedia
                    component="img"
                    height={isMobile ? 'auto' : '350'}
                    width={isMobile ? 'auto' : 'auto'}
                    image={getBackUrl() + "/" + (b?.produtoImage || '')}
                    alt={b.produto}
                  />
             <CardContent>
             <Title> {b.produto}</Title>
              <Price>{formatCurrency(b.preco)}</Price>
              <Categoryaa>Categoria: {b.categoria}</Categoryaa>
              <Description>{b.descricao}</Description>
              <ButtonContainer>
                <ButtonAproved onClick={() => handleAproved(b.id)}>Aprovar</ButtonAproved>
                <ButtonReproved onClick={() => handleReproved(b.id)}>Reprovar</ButtonReproved>
              </ButtonContainer>
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

export default Aprovacao;