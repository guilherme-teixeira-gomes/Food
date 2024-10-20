import { Chip, Container, Drawer, Stack, useMediaQuery } from "@mui/material";
import SideBarOf from "app/components/SideBar";
import TopBar from "app/components/TopBar";

import React, { useContext, useEffect, useRef, useState } from "react";


import {
  ButtonAproved,
  ButtonContainer,
  ButtonReproved,
  CategoriesWrapper,
  Categoryaa,
  DeliveryInfo,
  Description,
  Details,
  Discount,
  GridWrapper,
  Images,
  Price,
  PriceOriginal,
  RestaurantDetails,
  SectionTitle,
  SectionWrapper,
  Title,
  Wrapper,
  WrapperBack,

  WrapperImage,
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
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import getBackUrl from "app/utils/generics/getBackUrl";


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
    <div className="d-flex">
      <div style={{ width: '300px' }}>
        <SideBarOf />
      </div>
      <SectionWrapper>
        <GridWrapper>
          <WrapperBack>
            <GridWrapper>
              {food && food.map(b => (
                <Wrapper key={b.id}>
                  <WrapperImage>
                    <Images src={getBackUrl() + "/" + (b?.produtoImage || '')} alt={b.produto} />
                  </WrapperImage>
                  <Title>{b.produto}</Title>
                  <Price>{formatCurrency(b.preco)}</Price>
                  <Categoryaa>Categoria: {b.categoria}</Categoryaa>
                  <Description>{b.descricao}</Description>
                  <ButtonContainer>
                  <ButtonAproved onClick={() => handleAproved(b.id)}>Aprovar</ButtonAproved>
                    <ButtonReproved onClick={() => handleReproved(b.id)}>Reprovar</ButtonReproved>
                  </ButtonContainer>
                </Wrapper>
              ))}
            </GridWrapper>
          </WrapperBack>
        </GridWrapper>
      </SectionWrapper>
    </div>
  );
}

export default Aprovacao;