import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledButton = styled.button`
  position: relative; /* Importante para o posicionamento absoluto */
  width: 90%;
  background-color: #fe6600 ;
  gap: 1rem;
  color: #fff;
  padding: 8px 0px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none !important;
  display: flex;
  justify-content: start;
  align-items: center;

  &.active {
    /* Estilos específicos quando o botão está ativo na rota específica */
    /* Adicione outros estilos que você deseja quando o botão está ativo */
    content:"";
   padding:10px 10px;
   border-radius:120px 0px 0px 120px ;
   background-color:#000;
 
width:auto;
height: auto;

  }
`;


export const efeitoxd = styled.div`

:after{ 
    content:"";
    background-color: #30bc65;
    margin-left:20%;
    border-radius:10px;
    height:30px;
    width:30px;
    padding:10px 10px;
    border-radius:120px 0px 0px 120px ;
    background-color:#000;
    float:right;
}
`;



export const Bar = styled(Box)`
  background-color: #fe6600 ;
  padding: 8px 0;
  z-index: 0;
  width: 100%;
  
  div {
    display: flex;
    justify-content: space-between;
  }

  .bg-red {
    background-color: #ec536c;
    width: 45%;
  }

  .bg-blue {
    background-color: #5b6be8;
  }

  .menu-icon { // icone sidebar
    color: #fff;
    align-items: center;
    position: relative;
    &:focus,
    &:active {
      outline: none;
    }

    @media (min-width: 385px) { /* Estilos para dispositivos com largura máxima de 768px (por exemplo, tablets e celulares) */
      margin-left: 3%;
    }
  }
`;
export const BodyContainer = styled.div`
  width:100%;
  z-index: 0;
  max-width: 1300px;
  margin:auto;
`

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  align-items: center;

  svg {
    position: absolute;
    right: 8px;
    top: calc(50%-11px);
  }
`;


export const SearchField = styled.input`
background-color: #ffffff;
border: none;
padding: 0.7rem 1.3rem;
font-size: 0.9rem;
border-radius: 20px;
height: 42px;
width: 100%;

  &::placeholder {

  font-size: 1rem;
}

  &:active,
  &:focus {
  outline: none;
}
`;

export const IconContainer = styled.div` // icon engrenagem
  display: flex;
  max-width: 100%;
  align-items: center;
  gap: 1rem;
  margin-right: 4%;

  @media (max-width: 768px) {/* Estilos para dispositivos com largura máxima de 768px (por exemplo, tablets e celulares) */
    align-items: center; /* Centraliza os ícones */
    margin-right: 13%;
    /* Adicione quaisquer outros estilos específicos para dispositivos móveis aqui */
  }
`;

export const IconBox = styled.span`
position: relative;
background-color: #314254;
padding: 1rem;
border-radius: 50%;
display: flex;
justify-content: space-around;
cursor: pointer;

  svg {
  color: #ffffff;
}
`;

export const IconEdge = styled.span`
position: absolute;
top: -15px;
right: -5px;

color: #80B2FC;

width: 34px;
height: 34px;
font-size: 15px;

display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
`;

export const SearchList = styled.ul`
position: absolute;
top: 80px;
list-style: none;
font-size: 0.875rem;
padding: 0.5rem;
z-index: 1000;

  li {
  margin-bottom: 1rem;
  background-color: #fff;
  width: 350px;
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);

    p {
    margin: 0;
  }
}
`;

export const IconsContainer = styled.div`
display: flex;
flex-direction: column;
position: absolute;
right: 5px;

  svg {
  position: relative;
  display: block;
  color: #3D3D3D;
}
`

export const NoProcessFound = styled.div`
background-color: #fff;
width: 350px;
padding: 1rem;
border-radius: 4px;
box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
`

export const AvatarContainer = styled.div`
  background-color: #fff;
  position: relative;
  /* padding: ; */
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  span {
    margin: 0 1rem;
    color: rgba(0,0,0,0.7);
    display: block;
    font-weight: 450;
  }
`;