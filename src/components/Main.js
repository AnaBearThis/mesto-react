import api from "../utils/Api.js";
import Card from "./Card.js";
import React from 'react';

function Main(props) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Error ${err}`)
            });
    }, []);

    return (
        <main className="main">

              <section className="profile">
                  <div className="profile__avatar" onClick={props.onEditAvatar}>
                      <img className="profile__pic" src={userAvatar} alt="аватарка"/>
                  </div>
                  <div className="profile__info">
                      <div className="profile__first-line"><h1 className="profile__name">{userName}</h1><button className="profile__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button></div>
                      <p className="profile__description">{userDescription}</p>
                  </div>
                  <button className="profile__add-button" type="button" aria-label="добавить" onClick={props.onAddPlace}></button>
              </section>

              <section className="photos">
                  {
                    cards.map(card => (
                        <Card 
                            cardLink={card.link} 
                            cardName={card.name}
                            cardLikes={card.likes.length}
                            key={card._id}
                            card={card}
                            onClick={props.onCardClick}
                        />
                    ))
                  }
              </section>
        </main>
    );
};

export default Main;