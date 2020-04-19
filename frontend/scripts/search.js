const section = document.querySelector('section')
const ul = document.querySelector('ul')
const liSearch = document.querySelector('.search')

const filterUsers = async (name) =>
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${name}`)
    .then(res => res.json())


const debounceEvent = (fn, wait = 200, time) =>  (...args) =>
    clearTimeout(time, time = setTimeout(() => fn(...args), wait))
    

function handleKeyUp(event) {
    let usersList = []

    const name = String(event.target.value)

    if(!notNull(name)){
        ul.innerHTML = ''

        ul.append(liSearch)

        return
    }


    filterUsers(name)
    .then(users => {
        users.map(user => {
            const li = document.createElement('li')
            const image = document.createElement('img')

            image.src = './external-links.svg'

            li.append(user.name, image)
            
            if(usersList.length === 0){
                usersList.push(li)
            }
            else {
                usersList.map(user => {
                    if(user.name != li.textContent){
                        usersList.push(li)
                    }
                })
            }
        })

        usersList.map(user => {
            section.style.height += user.height
            ul.appendChild(user)
        })
    })
    ul.innerHTML = ''
}
function notNull(str){
    if(str != '' && !(str.match(/^\s+$/))){
        return true
    }
    else {
        return false
    }
}

document.querySelector("input")
.addEventListener("keyup", debounceEvent(handleKeyUp, 500))