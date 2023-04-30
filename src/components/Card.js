import { CurrentUserContext } from '../contexsts/CurrentUserContext.js';
import React from 'react';

function Card(props) {
    function handleClick() {
        props.onClick(props.card);
    };

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName =(
        `card__like-button ${isLiked && 'card__like-button_active'}`
    );

    function handleLikeClick() {
        props.onLike(props.card);
    }

    function handleDeleteClick() {
        props.onDelete(props.card);
    }

    return (
        <div className="card">
            <img className="card__pic" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="card__description">   
                <h2 className="card__name">{props.card.name}</h2>
                <div className="card__likes">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="нравится"></button>
                    <p className="card__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button className="card__delete-button" type="button" aria-label="удалить" onClick={handleDeleteClick} />}    
        </div>  
    )
};

export default Card;