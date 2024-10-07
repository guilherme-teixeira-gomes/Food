import styled from "styled-components";

export const NotificationContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

export const IconBox = styled.span`
  position: relative;

  padding: 0.9rem;
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
  top: 1px;
  right: -2px;

  color: #ffffff;

  width: 24px;
  height: 24px;
  font-size: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

export const Menu = styled.ul`
    position: absolute;
    min-width: 320px;
  
    top: 65px;
    right: -100px;
    
    z-index: 1001;
    background-color: #FFF;
    border-radius: 4px;
    padding: 0px;

    max-height: 600px;
    overflow-y: auto;

    box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07);

    span {
      color: rgba(91, 107, 232, 0.8);
      font-weight: 500;

      &:hover{
        color: rgb(91, 107, 232);
      }
    }


    .cursor-pointer {
      cursor: pointer;
    }

    @media (min-width: 750px) {
      right: 0px;
  }
`;

interface MenuItemProps {
  backgroundColor?: string;
}

export const MenuItem = styled.li<MenuItemProps>`
  width: 320px;
  color: rgba(0, 0, 0, 0.8);
  padding: 0.7rem 25px;
  font-size: 18px;
  list-style: none;
  border-bottom:  1px solid rgba(0, 0, 0, 0.3);
  background-color: ${props => props.backgroundColor || "#FFF"};
  /* background-color: rgba(0, 0, 0, 0.05); */

  &:hover {
    transition: all ease  0.3s;
  }

  a {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
  }

  &:hover a {
    color: rgb(91, 107, 232);
    transition: all ease  0.3s;
  }
`;
