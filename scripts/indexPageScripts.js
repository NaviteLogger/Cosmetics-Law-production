document.getElementById('clients-portal').addEventListener('click', function() {

    fetch('/clientsPortalProtected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'not_logged_in') 
          {
            window.location.href = '/login';
          }
        })
        .catch(error => console.error(error));
});