import styled from 'styled-components';

export const StyledButton = styled.button`
  position: relative; /* Importante para o posicionamento absoluto */
  width: 90%;
  background-color: #202125 ;
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


