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
interface PacksCompanyConfig {
  id: string,
  produtoshopid: string,
  companyId: string,
  active: boolean,
  visibleToworkers: boolean,
  visibleTocompanyadmins: boolean,
  createdAt: string,
  updatedAt: string,
}


function Aprovacao() {
  const [food, setFood] = useState<Foods[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFullDescription, setShowFullDescription] = useState<{ [key: string]: boolean }>({});
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [buyPacks, setBuyPacks] = useState<PacksCompanyConfig[]>([]);
  const theme = useContext(ThemeContext);

  const getPacks = async () => {
    try {
      const params = {
        // companyId
      }
      const { data } = await api.get(`/show/food`,);
      setFood(data.data);
    } catch (e) {
      console.log(e);
      setError("Erro ao obter os benefícios da empresa.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyPack = async (produtoshopid: number) => {
    try {
      await api.post(`/sell/pacote/to-company`, {
        produtoshopid,
        // companyId: selectedCompany.id
      });

      alert("Pacote adicionado à empresa!");
      // history.push("/disponivel/lojinha");
      setBuyPacks([]);
      getPacks();

      // Remove o benefício do carrinho
    } catch (e) {
      console.log(e);
      setError("Erro ao obter os produtos da empresa.");
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

  const toggleDescription = (id: string) => {
    setShowFullDescription(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

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

            <div style={{ display: "flex", justifyContent: "end", width: "92%", marginBottom: "1%", marginTop: "10px" }}>
              <Stack direction="row" spacing={1}>
                <Chip
                  label="Criar Produto"
                  style={{
                    // backgroundColor: theme.colors.primary,
                    // color: theme.colors.primaryContrast,
                    fontSize: "10px",
                    padding: "7px 7px",
                    fontWeight: "bold",
                  }}
                // onClick={() => history.push('/novo/produto/food')}
                />
              </Stack>
            </div>
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
                    <ButtonAproved onClick={() => handleBuyPack(b.id)}>Aprovar</ButtonAproved>
                    <ButtonReproved onClick={() => handleBuyPack(b.id)}>Reprovar</ButtonReproved>
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