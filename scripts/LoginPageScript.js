//Get the reference to the login form
const loginForm = document.getElementById('login-form');

//Add an event listener to the login form
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  //Get the email and password values from the form
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  //Create an object to send as JSON data in the request body
  const requestBody = {
    email: email,
    password: password,
  };

  //Send a POST request to the server
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody) //Indicate that we are sending JSON data in the request body
  })
    .then ((response) => response.json()) //Parse the incoming JSON response
    .then ((data) => {
      const messageElement = document.getElementById('message');
      messageElement.innerHTML = data.message;

      if (data.status === 'logged_in')
      {
        setTimeout(() => {
          window.location.href = '/protected/ClientsPortalPage.html';
        }, 1500); //Redirect to the clients portal page after 1,5 seconds
      }
  })
    .catch ((error) => {
      console.error('Error:', error);
  });
});

document.getElementById('clients-portal').addEventListener('click', function() {

  fetch('/checkIfAuthenticated', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'logged_in')
        {
          window.location.href = '/protected/ClientsPortalPage.html';
        }
        else 
        {
          window.location.href = '/pages/NotLoggedInPage.html';
        }
      })
      .catch((error) => {
        console.error(error)
      });
});