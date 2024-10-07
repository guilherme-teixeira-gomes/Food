import styled from "styled-components";


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
  padding: 20px;
  max-width: 1800px;
  margin-left: auto;
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
  justify-content: center;
`;
export const ShortCardWrapper = styled.div`
 flex: 0  15%; /* Largura do card - 30% do contêiner */
`;
// export const ButtonAccessAll = styled.button`
//   /* Adicione os estilos do botão aqui */
// `;

// export const WrapperBanner = styled.div`
//   /* Estilos para o wrapper do banner */
//   margin-bottom: 20px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

// export const WrapperBeneficios = styled.div`
//   /* Estilos para o wrapper dos benefícios */
// `;

// export const WrapperLoading = styled.div`
//   /* Estilos para o wrapper de loading */
// `;

// export const CategoriesWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// export const SectionWrapper = styled.div`
//   padding: 20px;
//   max-width: 100%;
//   margin-left: auto;
//   margin-right: auto;
// `;

export const WrapperBack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 90%;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 10px;
`;

// export const SectionTitle = styled.div`
//   margin-bottom: 10px;
//   margin-left: 6%;
// `;

// export const GridWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content:center;
// `;




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
  width: auto;
  height: 200px;
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 10px;
`;

export const Button = styled.button`
  border: none;
  background-color: transparent;
  padding: 10px;
`;
// export const Wrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 260px;
//   padding: 20px;
//   border: 1px solid #e0e0e0;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   background-color: #fff;
//   margin: 10px;
//   text-align: center;
// `;

// export const WrapperImage = styled.div`
//   position: relative;
//   width: 100%;
//   height: 180px;
//   margin-bottom: 10px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const Images = styled.img`
//   max-width: 100%;
//   max-height: 100%;
//   border-radius: 8px;
// `;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: #383838;
  margin: 10px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Details = styled.p`
  font-size: 14px;
  color: #757575;
  font-weight: bold;
  margin: 5px 0;
`;

export const PriceOriginal = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: #757575;
  text-decoration: line-through;
  margin-top: 10px;
`;

export const Price = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #383838;
  margin: 5px 0;
`;

export const Discount = styled.p`
  font-size: 12px;
  color: #388e3c;
  font-weight: bold;
  margin: 5px 0;
`;

export const ButtonBuy = styled.button`
  font-size: 14px;
  background: #26ad26;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 180px;
`;

export const Categoryaa = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333; /* Cor de texto */
  background-color: #f5f5f5; /* Cor de fundo */
  padding: 5px 10px; /* Espaçamento interno */
  border-radius: 4px; /* Bordas arredondadas */
  margin-top: 10px; /* Espaçamento superior */
  display: inline-block; /* Faz o background se ajustar ao texto */
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666; /* Cor do texto */
  margin-top: 10px; /* Espaçamento superior */
  line-height: 1.5; /* Altura da linha para melhor legibilidade */
  text-align: justify; /* Justifica o texto */
`;