const signIn = document.querySelector('.sign_in')
const logIn = document.querySelector('.log_in')

const sign_in_form = document.querySelector('#sign_in_form')
const log_in_form = document.querySelector('#log_in_form')

const logInBtn = document.querySelector('.log_in_btn')
const signInBtn = document.querySelector('.sign_in_btn')

const url = 'http://localhost:3004/users'

logInBtn.onclick = () => {
    signIn.classList.add('hide')
    logIn.classList.remove('hide')
    logIn.classList.add('show')
}

signInBtn.onclick = () => {
    signIn.classList.remove('hide')
    logIn.classList.add('hide')
}

sign_in_form.onsubmit = (e) => {
    e.preventDefault()
    let formdata = new FormData(sign_in_form)
    let obj = {}
    let bool = false
    formdata.forEach((value, key) => {
        if (value.trim().length === 0) bool = true
        obj[key] = value
    })

    if (bool) return

    postData(url, obj)
}

log_in_form.onsubmit = (e) => {
    e.preventDefault()
    let formdata = new FormData(log_in_form)
    let obj = {}
    let bool = false
    formdata.forEach((value, key) => {
        if (value.trim().length === 0) bool = true
        obj[key] = value
    })

    if (bool) return

    getData(url).then(data => {
        data.forEach(user => {
            if(user.nickname === obj.nickname2 && user.password === obj.password2) {
                window.location.href = './data.html'
            }
        })
    })

}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}