import { Container, Drawer, useMediaQuery } from "@mui/material";
import SideBarOf from "app/components/SideBar";
import TopBar from "app/components/TopBar";

import React, { useContext, useEffect, useRef, useState } from "react";


import {
  ButtonAccessAll,
  ButtonBuy,
  CategoriesWrapper,
  Categoryaa,
  Description,
  Details,
  Discount,
  GridWrapper,
  Images,
  Price,
  PriceOriginal,
  SectionTitle,
  SectionWrapper,
  Title,
  Wrapper,
  WrapperBanner,
  WrapperBeneficios,
  WrapperImage,
  WrapperLoading,
} from "./styles";

import styled, { ThemeContext } from "styled-components";





import { Avatar, Box, Button, Card, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { format } from 'date-fns';

import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import api from "app/services/api";




// Shop interface definition
interface Shop {
  id: string;
  produto: string;
  produtoimage: string;
  sku: string;
  preco: number;
  estoque: string;
  pagamento: string;
  categoria: string;
  shortdescription: string;
  companyId: string;
}

// Cart item type definition
interface CartItem {
  id: string;
  quantidade: number;
  preco: number;
  produto: string;
}

type Anchor = 'right';

function Comidas() {
  const isMobileScreen = useMediaQuery('only screen and (max-width: 768px)');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [banners, setBanners] = useState<string[]>([]);
  const [shop, setShop] = useState<Shop[]>([]);
  const [shopInit, setShopInit] = useState<Shop[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const theme = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const fetchShops = async () => {
    try {
      const { data } = await api.get('/shop/home');
      setShop(data.shops);
      setShopInit(data.shops);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (shopItem: Shop) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === shopItem.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === shopItem.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCartItems, { id: shopItem.id, quantidade: 1, preco: shopItem.preco, produto: shopItem.produto }];
      }
    });
  };

  const removeFromCart = (shopId: string) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== shopId));
  };

  const updateCartQuantity = (shopId: string, quantidade: number) => {
    if (quantidade < 1) {
      removeFromCart(shopId);
      return;
    }
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => (item.id === shopId ? { ...item, quantidade } : item))
    );
  };

  const handleBuyBenefit = async () => {
    try {
      const cartData = cartItems.map((item) => ({
        shopid: item.id,
        // workerid: user?.id,
        quantidade: item.quantidade,
        valor: parseFloat((item.quantidade * item.preco).toFixed(2)),
      }));

      await api.post('/buy/product/to-worker', cartData);
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
        setShop(shopInit);
      } else {
        const filteredShops = shopInit.filter((item) => item.categoria === selectedCategory);
        setShop(filteredShops);
      }
    }
  }, [selectedCategory, shopInit]);

  return (
    <div className="d-flex">
      <div style={{ width: '300px' }}>
        <SideBarOf />
      </div>

      <Button
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          zIndex: 10001,
          right: open ? 250 : 10,
          top: 500,
          background: open ? 'transparent' : "red",
          color: "#fff",
          backgroundColor:  "red" ,
        }}
      >
        {open ? null : <ShoppingCartOutlinedIcon />}
      </Button>

      <SectionWrapper>
        <SectionTitle>
          <Typography
            style={{
              fontFamily: 'inherit',
              fontSize: '22px',
              fontWeight: '400',
              lineHeight: '33px',
              textAlign: 'left',
            }}
          >
            Shopping
          </Typography>
        </SectionTitle>

        <GridWrapper>
          {shop.map((item) => (
            <Wrapper key={item.id}>
              <WrapperImage>
                <Images src={item.produtoimage || 'default-image.png'} alt={item.produto} />
              </WrapperImage>
              <Title>{item.produto}</Title>
              <Price>{formatCurrency(item.preco)}</Price>
              <Categoryaa>Categoria: {item.categoria}</Categoryaa>
              <Details>Estoque: {item.estoque}</Details>
              <Description>{item.shortdescription}</Description>
              <ButtonBuy onClick={() => addToCart(item)}>Comprar</ButtonBuy>
            </Wrapper>
          ))}
        </GridWrapper>

        <Drawer anchor="right" open={open} onClose={toggleDrawer} style={{ backgroundColor: 'transparent' }}>
          <Box style={{ width: '350px' }}>
            <Button onClick={toggleDrawer} style={{ outline: 'none', marginTop: isMobileScreen ? '10px' : '90px' }}>
              <CloseIcon />
            </Button>
            <div style={{ paddingTop: '2%', paddingRight: '2%', paddingLeft: '2%' }}>
              <h1
                style={{
                  fontFamily: 'Poppins',
                  fontSize: '28px',
                  marginTop: '2%',
                  fontWeight: 700,
                  lineHeight: '24px',
                  textAlign: 'center',
                }}
              >
                Carrinho de Compra
              </h1>
            </div>
            <Divider />
            <div style={{ padding: '2%' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'start', padding: '10px 20px' }}>
                    <IconButton
                      style={{ color: 'red', width: '15px', height: '15px', padding: '10px', borderRadius: '30px' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <CancelIcon style={{ fontSize: '15px' }} />
                    </IconButton>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                    <h1 style={{ flex: 1, fontSize: '16px', fontWeight: 700 }}>{item.produto} - {item.quantidade} x {formatCurrency(item.preco)}</h1>
                    <IconButton
                      style={{ backgroundColor: '#00b118', color: '#fff', width: '20px', height: '20px' }}
                      onClick={() => updateCartQuantity(item.id, item.quantidade + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      style={{ backgroundColor: '#8b1717', color: '#fff', width: '20px', height: '20px', marginLeft: '4%' }}
                      onClick={() => updateCartQuantity(item.id, item.quantidade - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 20px' }}>
              <ButtonBuy onClick={handleBuyBenefit}>Finalizar Compra</ButtonBuy>
            </div>
          </Box>
        </Drawer>
      </SectionWrapper>
    </div>
  );
}

export default Comidas;