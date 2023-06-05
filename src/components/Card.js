import React from 'react';
import styled from 'styled-components';
import MoniesForm from './MoniesForm';

const cardheight = '60rem' 
const cardwidth = '12.36rem'

const CardWrapper = styled.div`
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.368);
    padding: 1rem;
    margin: 1rem;
    width: ${props => props.width || cardwidth} ;
    height: ${cardheight};
    max-width: 100%;
    max-height: calc((60rem / 37.08rem) * 100vw);
    display: block;
`

const Title = styled.h2`
    font-size: 1.5rem;
    display:inline-block;
    width:40%;
    margin-top:0.625em;
`

const Body = styled.p`
    font-size: large;
    display:inline-block;
    width:60%;
    margin-top:0.10em;
`

const Card = ({title, body, width}) => {
    return (
        <CardWrapper width={width}>
            <div><Title>{title}</Title></div>
            <Body><div>{body}</div></Body>
        </CardWrapper>
    )
}

export default Card