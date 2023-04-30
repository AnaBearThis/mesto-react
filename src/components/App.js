import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from './CurrentUserContext.js';
import api from "../utils/Api.js";
import React from 'react';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isCardViewPopupOpen, setCardViewPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Error ${err}`)
            });
    }, []);

    React.useEffect(() => {
        function handleUserInfo() {
            api.getUserInfo()
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => {
                    console.log(`Error ${err}`);
                });
        }
        handleUserInfo();
    }, []);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    };

    function handleCardClick(evt) {
        setCardViewPopupOpen(true);
        setSelectedCard(evt);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setCardViewPopupOpen(false);
        setSelectedCard([]);
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
    
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleCardDelete(thisCard) {
        api.deleteCard(thisCard._id)
            .then(() => {
                setCards((cards) => cards.filter(card => card._id !== thisCard._id));
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleUpdateUser({me, job}) {
        api.editProfile(me, job)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data.avatar)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.createCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
            <div className="content">
                <Header/>
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewPlace={handleAddPlaceSubmit} />
                {/* <PopupWithForm
                    title='Вы уверены?'
                    name='submit'
                    textButton='Да'
                ></PopupWithForm> */}
                <ImagePopup
                    onClose={closeAllPopups}
                    card={selectedCard}
                />
            </div>
            </div>
        </CurrentUserContext.Provider>    
    );
}

export default App;
