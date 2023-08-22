document.querySelector('#submit-hash').addEventListener('click', async function (e) {
    e.preventDefault() //Prevent default event (if any)
    let message = document.getElementById('message').value
    let key = document.getElementById('key').value
    let err = document.querySelector('.error-message')

    //If the user does not enter the secret key, force the user to enter it again (message may be empty)
    if (key === "") {
        err.innerText = 'Please enter the secret key' 
        err.style.display = 'inline-block' //Show error message
    }
    else {
        err.style.display = 'none' //Hide error message
        //Call API to get MAC
        let result = await fetch ('/calculateHMAC', {
            method: 'POST', //Method post to secure data 
            headers: {
                'Content-Type': 'Application/json' //Allow data format is JSON
            },
            //Attach datas to send back end, including private key and message to calculate MAC
            body: JSON.stringify({
                key,
                message,
                hash: document.getElementById('hash').value //Pass the hash function name
            })
        },)

        let jsonResult = await result.json() //Convert result to JSON in order to handle 
        //Show result into layout
        document.getElementById('result').value = jsonResult.MAC
    }
})