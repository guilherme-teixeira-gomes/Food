import { Card, CardActionArea, CardContent, CardMedia, Container, Drawer, Grid, useMediaQuery } from "@mui/material";
import SideBarOf from "app/components/SideBar";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Category,
  Description,
  Details,
  Price,
  Title,
} from "./styles";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import api from "app/services/api";
import getBackUrl from "app/utils/generics/getBackUrl";
import { AuthContext } from "app/context/Auth/AuthContext";
import MainLayout from "app/layout/MainLayout";

interface Aprovados {
  id: string;
  produtoId: string;
  status: string;
  disponivelParaCliente: boolean;
  createdAt: string;
  updatedAt: string;
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
  };
}

interface Compras {
  id: number;
  comidaId: string;
  clienteId: string;
  precoTotal: number;
  quantidadeTotal: number;
}

interface CartItem {
  id: string;
  quantidade: number;
  preco: number;
  produto: string;
  precoTotal: number;
  quantidadeTotal: number;
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
  };
}

type Anchor = 'right';

function Comidas() {
  const isMobileScreen = useMediaQuery('only screen and (max-width: 768px)');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width:1000px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const [aprovados, setAprovados] = useState<Aprovados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [compras, setCompras] = useState<Compras[]>([]);
  const [comprasInit, setComprasInit] = useState<Compras[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const getAprovados = async () => {
    try {
      const { data } = await api.get(`/show/food/aproved`);
      setAprovados(data.data);
    } catch (e) {
      console.log(e);
      setError("Erro ao obter dados do produto.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAprovados();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const fetchShops = async () => {
    try {
      const { data } = await api.get('/cardapio');
      setCompras(data.data);
      setComprasInit(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (shopItem: Aprovados) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.comidas.id === shopItem.comidas.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === shopItem.id
            ? { ...item, quantidade: item.quantidade + 1, precoTotal: (item.quantidade + 1) * item.preco }
            : item
        );
      } else {
        return [
          ...prevCartItems,
          {
            id: shopItem.id,
            quantidade: 1,
            preco: shopItem.comidas.preco,
            produto: shopItem.comidas.produto,
            precoTotal: shopItem.comidas.preco,
            quantidadeTotal: shopItem.comidas.disponiveis,
            comidas: shopItem.comidas,
          },
        ];
      }
    });
    setOpen(true);
  };

  const removeFromCart = (compraId: string) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== compraId));
  };

  const updateCartQuantity = (compraId: string, quantidade: number) => {
    if (quantidade < 1) {
      removeFromCart(compraId);
      return;
    }
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.id === compraId) {
          const precoTotal = parseFloat((item.preco * quantidade).toFixed(2));
          return { ...item, quantidade, precoTotal };
        }
        return item;
      })
    );
  };

  const handleBuyBenefit = async () => {
    try {
      const cartData = cartItems.map((item) => ({
        comidaId: item.comidas.id,
        clienteId: user.id,
        quantidadeTotal: item.quantidade,
        precoTotal: parseFloat(item.precoTotal.toFixed(2)),
      }));
      for (const compra of cartData) {
        await api.post('/carrinho/compras', compra);
      }

      alert('Compra realizada com sucesso!');
      setCartItems([]);
    } catch (e) {
      console.error('Erro ao finalizar a compra:', e);
      alert('Erro ao finalizar a compra.');
    }
  };


  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === 'Todos') {
        setAprovados(aprovados);
      } else {
        const filteredShops = aprovados.filter((item) => item.comidas.categoria === selectedCategory);
        setAprovados(filteredShops);
      }
    }
  }, [selectedCategory, comprasInit]);

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

        <Button
          onClick={toggleDrawer}
          style={{
            position: 'fixed',
            zIndex: 10001,
            right: open ? 250 : 10,
            top: 500,
            background: open ? 'transparent' : "#fe6600",
            color: "#fff",
            backgroundColor: "#f86300",
            cursor: "pointer"
          }}
        >
          {open ? null : <ShoppingCartOutlinedIcon />}
        </Button>


        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {aprovados.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height={isMobile ? 'auto' : '350'}
                    src={getBackUrl() + "/" + (item.comidas.produtoImage || '')}
                    alt={item.comidas.produto}
                  />
                  <CardContent>
                    <Title>{item.comidas.produto}</Title>
                    <Price>{formatCurrency(item.comidas.preco)}</Price>
                    <Category>Categoria: {item.comidas.categoria}</Category>
                    <Details>Estoque: {item.comidas.disponiveis}</Details>
                    <Description>{item.comidas.descricao}</Description>
                    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
                      <Button
                        style={{
                          outline: "none",
                          fontSize: "14px",
                          backgroundColor: "#26ad26",
                          color: "#fff",
                          fontWeight: "bold",
                          borderRadius: "20px",
                          border: "none",
                          cursor: "pointer",
                          padding: "10px 20px",
                          width: "100%",
                          maxWidth: "180px",
                        }}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#26ad26",
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}
                        onClick={() => addToCart(item)}
                      >
                        Comprar
                      </Button>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Drawer anchor="right" open={open} onClose={toggleDrawer} style={{ backgroundColor: 'transparent' }}>
          <Box style={{ width: '350px' }}>
            <Button onClick={toggleDrawer} style={{ outline: 'none', marginTop: isMobileScreen ? '10px' : '10px' }}>
              <CloseIcon style={{ color: "#bd0101" }} />
            </Button>
            <div style={{ paddingRight: '2%', paddingLeft: '2%' }}>
              <h1
                style={{
                  fontFamily: "cursive",
                  fontSize: '28px',
                  marginTop: '2%',
                  fontWeight: 700,
                  lineHeight: '24px',
                  textAlign: 'center',
                }}
              >
                Carrinho
              </h1>
            </div>
            <Divider />
            <div style={{ padding: '2%' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                    {/* Imagem pequena do produto à esquerda */}
                    <img
                      src={getBackUrl() + "/" + (item.comidas.produtoImage || '')}
                      alt={item.produto}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <Typography style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.comidas.produto}</Typography>
                      <Typography style={{ fontSize: '12px' }}>{formatCurrency(item.precoTotal)}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        style={{ padding: '5px', fontSize: '14px', outline: "none" }}
                        onClick={() => updateCartQuantity(item.id, item.quantidade - 1)}
                      >
                        <RemoveIcon style={{ color: "#002426", borderRadius: "50px" }}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#fe660061",
                              opacity: [0.9, 0.8, 0.7],
                            },
                          }} />
                      </Button>
                      <Typography style={{
                        fontFamily: "cursive",
                        fontSize: '20px',
                        marginTop: '2%',
                        fontWeight: 700,
                        lineHeight: '24px',
                        textAlign: 'center',
                      }}>{item.quantidade}</Typography>
                      <Button

                        style={{ padding: '3px', fontSize: '14px', outline: "none" }}
                        onClick={() => updateCartQuantity(item.id, item.quantidade + 1)}
                      >
                        <AddIcon style={{ color: "#002426", borderRadius: "50px" }}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#fe660061",
                              opacity: [0.9, 0.8, 0.7],
                            },
                          }} />
                      </Button>
                    </div>
                    <IconButton onClick={() => removeFromCart(item.id)}
                      style={{
                        outline: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        maxWidth: "20px",
                        maxHeight: "20px"
                      }}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#fe660061",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >

                      <CancelIcon style={{ color: "#fe6600", fontSize: '16px' }} />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Typography style={{ paddingLeft: "4%" }} variant="h6">Total: {formatCurrency(cartItems.reduce((acc, item) => acc + item.precoTotal, 0))}</Typography>
              <Button
                onClick={handleBuyBenefit}
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginTop: '20px',
                  padding: '10px',
                  backgroundColor: '#fe6600',
                  fontWeight: 'bold',
                }}
              >
                Finalizar Compra
              </Button>
            </div>
          </Box>
        </Drawer>

      </div>
    </Box >
  );
}

export default Comidas;