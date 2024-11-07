import styled from "styled-components";

export const Container = styled.div`
    padding: 1rem;
`;


export const Title = styled.h2`
    color: #5B626B;
    font-size: 25px;
    margin-bottom: 2rem;
`

export const SubTitle = styled.h2`
    color: #5B626B;
    font-size: 20px;
    padding: 1rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;
`

export const MainGrid = styled.div`
    margin: 50px auto 20px;
    max-width: 1550px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
`;

export const FormGoup = styled.div`
    background-color: #FFF; 
    border-radius: "4px"; 
    padding: "1rem";
`;

export const FormSectionTitle = styled.h3`
    color: #5B626B;
    border-bottom: rgba(91, 98, 107, 0.5) solid 1px;
    font-size: 16px;
    padding-bottom: 0.5rem;
    margin: 1rem 0;
    grid-column: 1/3;
`;

export const ResumeGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;

    .text-area-container {
        grid-column: 1/3;
    }

    & > div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .span-2 {
        grid-column: 1/3;
    }
`

export const InputFileContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 1rem;

    label {
        color: #707070;
        font-weight: 600;
        border: 1px solid #EBEEF1;
        width: 100%;
        border-radius: 30px;
        padding: 17px 2rem;
    }

    button {
        white-space: nowrap;
        border-radius: 30px;
        height: 60px;
    }
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 1rem 0;
`

export const AnexosContainer = styled.ul`
    padding: 1rem 2rem;

    li {
        list-style-type: none;
        display: flex;
        justify-content:space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        svg {
            color: #EC536C;
        }
    }
`;

export const AnexoListItem = styled.li`
    list-style-type: none;
    display: flex;
    justify-content:space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    svg {
        color: #EC536C;
    }
`;