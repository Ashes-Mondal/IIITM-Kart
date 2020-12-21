import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
    //const cart = useContext(cart),
    return (
        <div className = "row justify-content-start">
            {
                robots.map((user, i) => {
                    return (<Card
                        key={i}
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        price={user.price}
                    />
                    );
                })
            }
        </div>
    )
}

export default CardList;