/* Elements */
const emptyMessage = document.querySelector('#emptyMessage')
const todoContainer = document.querySelector('#todoContainer')
const todoInput = document.querySelector('#todoInput')
const todoAddBtn = document.querySelector('#todoAddBtn')

/* Variables */
let todoList = []

const todoStorage = localStorage.getItem('todoList')
if (todoStorage) todoList = JSON.parse(todoStorage)

/* Functions */
let buttonEvent = () => {
    if (todoInput.value !== '') {
        todoList.push(todoInput.value.trim())
        renderList()

        todoInput.value = ''
        todoInput.focus()
    }
}

let createItem = (text, i) => {
    let item = document.createElement('li')
    item.id = 'item' + i
    item.className = 'todoItem panel d-flex'
    item.innerHTML = `<div id="check${i}" class="todoCheck c-pointer"><img src="./img/check.svg" alt=""></div><span class="todoText">${text}</span>`

    return item
}

let renderList = () => {
    todoContainer.innerHTML = ''

    if (todoList.length === 0) emptyMessage.classList.remove('visually-hidden')
    else emptyMessage.classList.add('visually-hidden')

    todoList.forEach( (item, i) => {
        let element = createItem(item, i)

        todoContainer.appendChild(element)
        localStorage.setItem('todoList', JSON.stringify(todoList))
    })

    const checks = document.querySelectorAll('.todoCheck')
    checks.forEach( (check, i) => {
        check.addEventListener('click', () => {
            todoList.splice(i, 1)

            renderList()
        })
    })
}
renderList()


/* Events */
todoAddBtn.addEventListener('click', buttonEvent)

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') buttonEvent()
}) 