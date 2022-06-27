const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const statusMessage = document.querySelector('#statusMessage')
const forecastMessage = document.querySelector('#forecastMessage')

// errorMessage.textContent = 'From Javascript'


weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        statusMessage.textContent = 'LOADING'
        response.json().then((data) => {
            if (data.error) {
                statusMessage.textContent = 'Error:'
                forecastMessage.textContent = data.error
            } else {
                statusMessage.textContent = 'Your Forecast:'
                forecastMessage.textContent = data.forecast
            }
        })
    }) 


    console.log(location)
})