import React from 'react';

const Card = ({title, body}) => {
    return (
        <div>
            <div><h2>{title}</h2></div>
            <div>{body}</div>
        </div>
    )
}

export default Card