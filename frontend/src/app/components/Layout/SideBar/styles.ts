import { Accordion } from "@mui/material";
import styled from "styled-components";

export const Header = styled.div`
    height: 95.38px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const AccordionContainer = styled(Accordion)`
    border: 1px solid rgba(0,0,0,0);

    div {
        border: none;
    }

    svg {
        margin-right: 20px;
    }
`;

export const ListItemButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* padding: 1rem; */
`;