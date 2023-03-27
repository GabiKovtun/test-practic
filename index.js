const data = [
  {
    id: "1",
    title: `Apple. The evolution of the computer`,
    author: `Vladimir Nevzorov`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `A richly illustrated chronological guide to the history of computers in which
    and structured information about the creation and development of Apple technology against the backdrop of history
    personal computers in general.
    The book contains descriptions of dozens of the most significant models of devices from both Apple and other manufacturers,
    accompanied by a large number of original studio photographs.
    The book is intended for a wide range of readers interested in the history of electronics.
    It can also serve as a source of inspiration for designers, marketers and entrepreneurs.`,
  },
  {
    id: "2",
    title: `How to explain computer science to a child`,
    author: `Carol Vorderman`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Illustrated encyclopedia in infographic format about technical, social and cultural aspects
        in informatics. Explains step by step how children can get the most out of computers and internet services,
        staying safe.
        The book covers everything from data storage to life on the Internet,
        from programming to computer attacks. About how computers function, about modern software
        software, the device of the Internet and digital etiquette. All concepts - from hacker to bitcoin -
        are explained clearly with the help of illustrations and diagrams.`,
  },
  {
    id: "3",
    title: `The path of the Scrum Master. #ScrumMasterWay`,
    author: `Zuzana Shokhova`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `This book will help you become an outstanding Scrum Master and achieve great results with your team.
            It is illustrated and easy to understand - you can read it in a weekend, and use the resulting
            knowledge throughout your career.
            Based on 15 years of experience, Zuzana Shokhova explains the roles and responsibilities of a Scrum Master,
            how to solve everyday tasks, what competencies are needed to become an outstanding scrum master,
            what tools he needs to use.`,
  },
];
localStorage.setItem("books", JSON.stringify(data));
const rootEl = document.querySelector("#root");
const leftEl = document.createElement("div");
leftEl.classList.add("left");
const rightEl = document.createElement("div");
rightEl.classList.add("right");
rootEl.append(leftEl, rightEl);
const titleEl = document.createElement("h1");
const listEl = document.createElement("ul");
const btnEl = document.createElement("button");
titleEl.classList.add("title");
titleEl.textContent = "Library";
btnEl.textContent = "Add";
btnEl.classList.add("btn");
listEl.classList.add("list");
leftEl.append(titleEl, listEl, btnEl);

function renderList() {
  const books = JSON.parse(localStorage.getItem("books"));
  const markup = books
    .map(
      ({ id, title }) =>
        `<li id='${id}'><p class='name'>${title}</p><button type='button'>Edit</button><button class='delete' type='button'>Delete</button></li>`
    )
    .join("");
    listEl.innerHTML = ''
  listEl.insertAdjacentHTML("beforeend", markup);
  const nameEl = document.querySelectorAll(".name");
  nameEl.forEach((el) => {
    el.addEventListener("click", renderPreview);
  });
  const deleteEl = document.querySelectorAll(".delete");
  deleteEl.forEach((el) => {
    el.addEventListener("click", onClickDelete);
  }
  );
}

function renderPreview(e) {
    const bookId = e.target.closest('li').id
    const booksStorange = JSON.parse(localStorage.getItem('books'))
    const bookReview = booksStorange.find(el=> el.id === bookId)
    const markup = createPreviewMarkup(bookReview)
    rightEl.innerHTML = ''
    rightEl.insertAdjacentHTML("beforeend", markup);
}
renderList();
function createPreviewMarkup({id,title,author,img,plot}){
    const markup= `<div data-id=${id}><h2>${title}</h2><p>${author}</p><img alt ='title' src='${img}'><p>${plot}</p></div>`
    return markup
}

function onClickDelete(e){
    const booksStorange = JSON.parse(localStorage.getItem('books'))
    const deleteId = e.target.closest('li').id
    const books=booksStorange.filter(el => el.id !== deleteId)
    localStorage.setItem('books', JSON.stringify(books))
    renderList()

}

btnEl.addEventListener('click', onClickAddBtn)

function onClickAddBtn(){
    const markup=createFormMarkup()
    rightEl.insertAdjacentHTML("beforeend", markup);
    const newBook = {
        id: `${Date.now()}`,
        title: "",
        author: "",
        plot: "",
        img: ""
} 
fillObject(newBook)
const formEl = document.querySelector('form')
formEl.addEventListener('submit', submitHandler)
function submitHandler(e){
    e.preventDefault()
    const booksStorange = JSON.parse(localStorage.getItem('books'))
    booksStorange.push(newBook)
    localStorage.setItem('books', JSON.stringify(booksStorange))
    renderList()
    const markup = createPreviewMarkup(newBook)
    rightEl.innerHTML = ''
    rightEl.insertAdjacentHTML('beforeend', markup)

}
}

function createFormMarkup(){
    const markup = `<form>
    <label>Title<input name='title' type='text'></label>
    <label>Author<input name='author' type='text'></label>
    <label>Plot<input name='plot' type='text'></label>
    <label>Img<input name='img' type='url'></label>
    <button type='submit'>Save</button>
    </form>`
    return markup
}

function fillObject(obj){
    const inputs=document.querySelectorAll('input')
    inputs.forEach((el) => {
        el.addEventListener("change", changeHandler);
      });
      function changeHandler(e){
        obj[e.target.name] = e.target.value
      }
}