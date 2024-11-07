import styled from "styled-components";

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #383838;
  margin: 5px 0;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const Price = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #27ae60;
  margin: 5px 0;
  text-align: center;
`;

export const Category = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333; 
  text-align: center;
  background-color: #f5f5f5; 
  padding: 5px 10px; 
  border-radius: 4px; 
  margin-top: 10px; 
  display: flex; 
  justify-content: center;
`;

export const Details = styled.p`
   font-size: 12px;
  color: #757575;
  margin-left: 5px;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  line-height: 1.5;

  text-align: center;
`;