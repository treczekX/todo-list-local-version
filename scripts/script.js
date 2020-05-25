//zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let list;
let myInput;
let addTodoBtn;
let popupInput;
let form;
let text;
let modal;
let closeBtn;
let getId = 0;
let currentTodo;
let cancelTodoBtn;
let acceptTodoBtn;
let headerH2

const initialList = ['Zrób zakupy', 'Nakarm psa'];

// funkcja wczytująca zawartość strony
function main() {
    prepareDOMElements();
    prepareDOMEvents();
    prepareInitialList();
}

function prepareDOMElements() {
    //pobranie naszych elementów z drzewa DOM i zapisanie ich w zmiennych
    list = document.getElementById('list');
    myInput = document.querySelector('#myInput');
    addTodoBtn = document.querySelector('#addTodo');
    form = document.querySelector('#addForm');
    closeBtn = document.querySelector('#closePopup');
    popupInput = document.querySelector('#popupInput');
    cancelTodoBtn = document.querySelector('#cancelTodo');
    acceptTodoBtn = document.querySelector('#acceptTodo');
    modal = document.querySelector('#myModal');
    headerH2=document.querySelector('.h2Visible');
}

function prepareDOMEvents() {
    // Przygotowanie listenerów
    list.addEventListener('click', listClickManager);
    addTodoBtn.addEventListener('click', addNewTodo);
    form.addEventListener('submit', addNewTodoViaForm);
    closeBtn.addEventListener('click', closeModal);
    acceptTodoBtn.addEventListener('click', buttonAccept);
    cancelTodoBtn.addEventListener('click', buttonCancel);

}

function prepareInitialList() {
    // Tworzenie początkowych todosów
    initialList.forEach(todo => {
        addNewElementToList(todo);
    });
}

function addNewTodoViaForm(e) {
    // dodanie nowych elementów przez obsługę formularza
    e.preventDefault();
    addNewTodo();
}

function addNewTodo() {
    // funkcja dodająca todosy
    if (myInput.value.trim() !== '') {
        addNewElementToList(myInput.value);
        myInput.value = '';
    }
}

function addNewElementToList(title) {
    //obsługa dodawanie elementów do listy
    const newElement = createElement(title);
    list.appendChild(newElement);
}

function createElement(title) {
    // Tworzenie reprezentacji DOM elementu i zwracanie newElement
    getId++
    const newElement = document.createElement('li');
    newElement.dataset.id = getId;
    const spanWrapper = document.createElement('div');
    const titleElement = document.createElement('span');
    const icon = document.createElement('i');
    const divBtnSet = document.createElement('div');
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const markedBtn = document.createElement('button');
    titleElement.innerText = title;
    delBtn.innerText = 'delete';
    editBtn.innerText = 'edit';
    markedBtn.textContent = 'marked as done';
    // dodawanie klas do elementów
    icon.classList.add('icon');
    icon.classList.add('far');
    icon.classList.add('fa-circle');
    delBtn.classList.add('btn-delete');
    editBtn.classList.add('btn-edit');
    markedBtn.classList.add('btn-marked');
    divBtnSet.classList.add('btn-set');
    // dołączanie elementów do DOM
    divBtnSet.appendChild(delBtn);
    divBtnSet.appendChild(editBtn);
    divBtnSet.appendChild(markedBtn);
    spanWrapper.appendChild(icon);
    spanWrapper.appendChild(titleElement);
    newElement.appendChild(spanWrapper);
    newElement.appendChild(divBtnSet);
    return newElement;
}

// Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
function listClickManager(event) {
    currentTodo = event.target.parentElement.parentElement.dataset.id;
    if (event.target.className === 'btn-delete') {
        removeListElement();
    } else if (event.target.className === 'btn-edit') {
        editListElement();
    } else if (event.target.className === 'btn-marked') {
        markedAsDone();
    }
}

function removeListElement() {
    // usuwanie elementów z listy
    const li = document.querySelector('li[data-id="' + currentTodo + '"]');
    list.removeChild(li);
}

function editListElement() {
    // edycja elementów
    openModal();
    elementsClose();
    text = document.querySelector('li[data-id="' + currentTodo + '"] span').textContent;
    popupInput.value = text;
}

function elementsClose() {
    headerH2.classList.add('h2Visible2');
    list.classList.add('uldown');
    form.classList.add('formVisible')
}

function buttonAccept() {
    // zatwierdzenie zmiany
    const span = document.querySelector('li[data-id="' + currentTodo + '"] span');
    span.innerText = popupInput.value;
    closeModal();
}

function buttonCancel() {
    // odrzucenie zmian i wyjscie z modala
    modal.classList.remove('modalVisible');
}

function markedAsDone() {
    // oznaczenie todosów jako wykonane
    const liElement = document.querySelector('li[data-id="' + currentTodo + '"]');
    const titleElement = document.querySelector('li[data-id="' + currentTodo + '"] div span');
    const icon = document.querySelector('li[data-id="' + currentTodo + '"] div i');
    liElement.classList.toggle('done');
    titleElement.classList.toggle('textDone');
    icon.classList.toggle('fa-circle');
    icon.classList.toggle('fa-check-circle');
}

function openModal() {
    // Otwieranie Modala
    modal.classList.add('modalVisible');
}

function closeModal() {
    // Zamykanie Modala
    modal.classList.remove('modalVisible');
    headerH2.classList.remove('h2Visible2');
    list.classList.remove('uldown');
    form.classList.remove('formVisible')
}

// załadowanie strony
document.addEventListener('DOMContentLoaded', main);