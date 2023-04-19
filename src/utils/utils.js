export default function renderSaving(isSaving, popup) {
    if (isSaving) {
        popup.popupSubmitButton.textContent = 'Сохранение...';
    } else {
        popup.popupSubmitButton.textContent = popup.popupSubmitButton.value;
    }
};