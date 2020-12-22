import React from 'react';
import Card from './Card';

const CardList = ({ itemList }) => {
    return (
        <div className = "row justify-content-start">
            {
                itemList.map((item, i) => {
                    return (<Card
                        key={i}
                        id={item._id}
                        name={item.ItemName}
                        Description={item.Description}
                        cost={item.cost}
                        imgURL={item.imageURL}
                    />
                    );
                })
            }
        </div>
    )
}

export default CardList;