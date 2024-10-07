import styled from 'styled-components';


export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SectionWrapper = styled.div`
  padding: 20px;
  max-width: 100%;
  margin-left: auto;
  margin-top: 3%;
  margin-right: auto;
`;

export const WrapperBack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 100%;
  min-width: 1500px;
  min-height: 80vh;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 10px;
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



export const Button = styled.button`
  border: none;
  background-color: transparent;
  padding: 10px;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px; /* Adjust spacing between the content and buttons */
`;

export const ButtonAproved = styled.button`
  font-size: 12px; /* Smaller font size */
  background: #26ad26;
  color: #fff;
  font-weight: bold;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  padding: 8px 12px; /* Smaller padding */
  margin: 0 5px; /* Margin to add space between buttons */
  width: 48%; /* Adjusted width to fit two buttons side by side */
`;

export const ButtonReproved = styled.button`
  font-size: 12px; /* Smaller font size */
  background: red;
  color: #fff;
  font-weight: bold;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  padding: 8px 12px; /* Smaller padding */
  margin: 0 5px; /* Margin to add space between buttons */
  width: 48%; /* Adjusted width to fit two buttons side by side */
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
export const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: #383838;
  margin: 5px 0;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Price = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #388e3c; /* Green color to highlight the price */
  margin: 5px 0;
`;

export const Discount = styled.p`
  font-size: 14px;
  color: #388e3c;
  font-weight: bold;
  margin: 5px 0;
`;

export const RestaurantDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;

`;
export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the start */
  width: 220px; /* Reduced width to match the image */
  padding: 10px; /* Reduced padding */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Slightly reduced shadow */
  background-color: #fff;
  margin: 8px; /* Reduced margin */
`;

export const Images = styled.img`
  width: 100%;
  height: 120px; /* Adjusted height for a smaller size */
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px; /* Reduced margin */
`;

export const DeliveryInfo = styled.span`
  font-size: 12px;
  color: #757575;
  margin-left: 5px;
`;