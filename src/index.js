

 import {createStore} from 'redux';

let recordState;

const initialState = [
    {
        bookId:0,
        bookName:'<TEST BOOK>'
    }
]
const reducer = function (state=initialState, action) {
    recordState = state;
    switch (action.type) {
        case "addBook":
            return[
                
                    ...state,
                    {
                        bookId:action.info.bookId,
                        bookName:action.info.bookName,
                    }
                
            ]
        case "delBook":
            
            return state.filter(book=>book.bookId !== parseInt(action.info.bookId))
            default:
                return[
                
                    ...state
                
            ]
    }

}
const store = createStore(reducer);

const root = document.getElementById('app');
const addBook = document.getElementById('addBook');
const delBook = document.getElementById('delBook');
const bookList = document.getElementById('bookList');

const addBookBtn = document.createElement('button');
const bookNameInput = document.createElement('input');
const delBookBtn = document.createElement('button');
const bookIdInput = document.createElement('input');

addBookBtn.innerText ="Add Book"
delBookBtn.innerText="Delete Book"

addBookBtn.addEventListener('click',addBookFn);
delBookBtn.addEventListener('click',delBookFn);

addBook.appendChild(bookNameInput);
addBook.appendChild(addBookBtn);

delBook.appendChild(bookIdInput);
delBook.appendChild(delBookBtn);


function* generateId(){
    let id = 1;
    while(true){
        yield id++
    }
}
const generateBookId = generateId();
const getBookId =()=> generateBookId.next().value;


function addBookFn(){
    //console.log('Add book')
    const bookName = bookNameInput.value;
    if(bookName){
    const bookId = getBookId();
    bookNameInput.value = "";
    const action = {
        type:"addBook",
        info:{
            bookId: bookId,
            bookName: bookName
        }
      }
      store.dispatch(action);
    }else{
        console.log('Need to enter the book name')
    }
 
}

function delBookFn(){
    const bookId = bookIdInput.value;
    if(bookId){
    bookIdInput.value = "";
    const action = {
        type:"delBook",
        info:{
            bookId: bookId,
        }
      }
      store.dispatch(action);
    }else{
        console.log('Need to enter the book Id')
    }

}

// const showState = store.subscribe(()=>{
//     // const currentState = store.getState();
//     console.log('old state:', recordState);
//     console.log('new state:', store.getState());
// })

const showNewList = store.subscribe(()=>{
    const currentState = store.getState();
    if(currentState.length !== recordState.length){
        bookList.innerText='';
        currentState.forEach(item=>{
            bookList.appendChild(createBookList(item))
        })
    }
})

function createBookList(item){
 const book = document.createElement('li');
 book.innerText = `Book Id:${item.bookId}, Book Name:<${item.bookName}>`
 return book;
}
