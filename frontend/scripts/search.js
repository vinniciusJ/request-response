const section = document.querySelector('section')
const ul = document.querySelector('ul')
const liSearch = document.querySelector('.search')

const filterUsers = async (name) =>
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${name}`)
    .then(res => res.json())


const debounceEvent = (fn, wait = 200, time) =>  (...args) =>
    clearTimeout(time, time = setTimeout(() => fn(...args), wait))
    
function openiFrame(){
    const iFrame = document.createElement('iframe')
    
    iFrame.src = 'http://www.google.com'
    document.appendChild(iFrame)
    
}

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
            const img = document.createElement('img')
            const button = document.createElement('button')

            img.src = '../frontend/images/external-link.svg'
            img.style.width = '16px'
            img.style.height = '16px'

            button.append(img)
            button.onclick = 'openiFrame()'

            li.className = 'res'
            li.append(user.name, button)
            
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



