import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isCardViewPopupOpen, setCardViewPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState('');

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    function handleEditProfileClick() {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    function handleCardClick(evt) {
        setCardViewPopupOpen(!isCardViewPopupOpen);
        setSelectedCard(evt.link);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setCardViewPopupOpen(false);
        setSelectedCard('');
    };

    return (
        <div className='page'>
        <div className="content">
            <Header/>
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
            <Footer/>
            <PopupWithForm title='Обновить аватар' name='change-av' textButton='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input
                    id="input-link-av"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required 
                    className="popup__input popup__input_data_link"
                />
                <span id="input-link-av-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm title='Редактировать проофиль' name='edit' textButton='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input
                    id="input-name"
                    type="text"
                    name="name"
                    placeholder="Введите имя"
                    required
                    minLength="2"
                    maxLength="40"
                    className="popup__input popup__input_data_name"
                />
                <span id="input-name-error" className="popup__error"></span>
                <input
                    id="input-job"
                    type="text"
                    name="description"
                    placeholder="Введите название вашей работы"
                    required
                    minLength="2"
                    maxLength="200"
                    className="popup__input popup__input_data_description"
                />
                <span id="input-job-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm title='Новое место' name='add' textButton='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input
                    id="input-place"
                    type="text"
                    name="name"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    className="popup__input popup__input_data_place"
                />
                <span id="input-place-error" className="popup__error"></span>
                <input
                    id="input-link"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required 
                    className="popup__input popup__input_data_link"
                />
                <span id="input-link-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm title='Вы уверены?' name='submit' textButton='Да'></PopupWithForm>
            <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        </div>
        </div>  
    );
}

export default App;
