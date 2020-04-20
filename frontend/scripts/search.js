const section = document.querySelector('.sec')
const ul = document.querySelector('.list')
const liSearch = document.querySelector('.search')


const filterUsers = async (name) =>
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${name}`)
    .then(res => res.json())


const debounceEvent = (fn, wait = 200, time) =>  (...args) =>
    clearTimeout(time, time = setTimeout(() => fn(...args), wait))
    

function handleKeyUp(event) {
    let usersList = []

    let name = String(event.target.value)

    if(!notNull(name)){
        ul.innerHTML = ''

        ul.append(liSearch)

        return
    }
    if(name == '*'){
        name = ' '
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

            li.className = 'res'
            li.append(user.name)

            button.addEventListener('click', () =>{
                const container = document.querySelector('.container')
                const userContainer = document.querySelector('.user-container')
                
                const ulInformation = document.querySelector('.res-information-user')

                container.style.display = 'none'
                userContainer.style.display = 'initial'

                const buttonClose = document.querySelector('.close')
                const imagemClose = document.querySelector('.close img')
                
                const datas = ['name', 'username', 'email', 'website', 'phone']
                let datasList = []

                datas.map(type => {
                    const liData = document.querySelector(`#information-${type} span`)
                    liData.textContent = user[type]
                    datasList.push(liData)
                })

                datasList.map(liData => {
                    ulInformation.append(liData)
                })

                imagemClose.addEventListener('mouseover', () => {
                    imagemClose.src = '../frontend/images/x-circle-close.svg'
                })
                
                buttonClose.addEventListener('click', () => {
                    
                    for(let i = 0; i < datasList.length; i++){
                        datasList[i].textContent = ''
                    }
                    
                    container.style.display = 'grid'
                    userContainer.style.display = 'none'
                })
                
            })

            li.append(button)
            
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
    ul.innerHTML = ' '
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




