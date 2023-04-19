function Card(props) {
    function handleClick() {
        props.onClick(props.card);
    };

    return (
        <div className="card">
            <img className="card__pic" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="card__description">   
                <h2 className="card__name">{props.card.name}</h2>
                <div className="card__likes">
                    <button className="card__like-button" type="button" aria-label="нравится"></button>
                    <p className="card__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
            <button className="card__delete-button" type="button" aria-label="удалить"></button>     
        </div>
    )
};

export default Card;