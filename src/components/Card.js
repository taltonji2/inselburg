import React from 'react';
import styled from 'styled-components';
import MoniesForm from './MoniesForm';

const cardheight = '60rem' 
const cardwidth = '37.08rem'

const CardWrapper = styled.div`
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.168);
    padding: 1rem;
    width: ${cardwidth};
    height: ${cardheight};
    max-width: 100%;
    max-height: calc((60rem / 37.08rem) * 100vw);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:0;
    display:block;
`

const Title = styled.h2`
    font-size: 1.5rem;
    display:inline-block;
    width:40%;
    margin:0.625em;
`

const Body = styled.p`
    font-size: large;
    display:inline-block;
    width:60%;
    margin:0.625em;
`

const Card = ({title, body}) => {
    return (
        <CardWrapper>
            <Title>{title}</Title>
            <Body>{body}</Body>
            <MoniesForm/>
        </CardWrapper>
    )
}

export default Card