/* Elements */
const emptyMessage = document.querySelector('#emptyMessage')
const todoContainer = document.querySelector('#todoContainer')
const todoInput = document.querySelector('#todoInput')
const todoAddBtn = document.querySelector('#todoAddBtn')

/* Variables */
let list = []

/* Functions */
let buttonEvent = () => {
    if (todoInput.value !== '') {
        list.push(todoInput.value)
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

    if (list.length === 0) emptyMessage.classList.remove('visually-hidden')
    else emptyMessage.classList.add('visually-hidden')

    list.forEach( (item, i) => {
        let element = createItem(item, i)
        todoContainer.appendChild(element)
    })

    const checks = document.querySelectorAll('.todoCheck')
    checks.forEach( (check, i) => {
        check.addEventListener('click', () => {
            list.splice(i, 1)

            renderList()
        })
    })
}


/* Events */
todoAddBtn.addEventListener('click', buttonEvent)

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') buttonEvent()
})