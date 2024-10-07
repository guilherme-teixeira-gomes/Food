import styled from 'styled-components';

export const ActiveCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 38px;
`;

export const InactiveCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  grid-gap: 24px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 15px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
`

export const ButtonAccessAll = styled.button`
  /* Adicione os estilos do botão aqui */
`;

export const WrapperBanner = styled.div`
  /* Estilos para o wrapper do banner */
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const WrapperBeneficios = styled.div`
  /* Estilos para o wrapper dos benefícios */
`;

export const WrapperLoading = styled.div`
  /* Estilos para o wrapper de loading */
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SectionWrapper = styled.div`
  max-width: 100%;
  margin-left: auto;
  margin-top: 7%;
  margin-right: auto;
`;

export const SectionTitle = styled.div`
  margin-bottom: 10px;
  margin-left: 6%;
`;

export const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content:center;
`;


export const WrapperImage = styled.div`
  position: relative;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const Images = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 10px;
`;
export const WrapperBack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  align-items: start;
  width: 90%;
  padding: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 10px;
`;

export const Button = styled.button`
  border: none;
  background-color: transparent;
  padding: 10px;
`;
