document.getElementById("clients-portal").addEventListener("click", () => {
  window.location.href = "/clientsPortalPage";
});

document
  .getElementById("buy-selected-subscription")
  .addEventListener("click", () => {
    const form = document.getElementById("buy-selected-agreements-form"); //Get the form

    const checkboxes = document.querySelectorAll(
      '#buy-selected-subscription-form input[type="checkbox"][name="agreement"]'
    );

    const selectedAgreements = [];

    checkboxes.forEach((checkbox) => {
      //Check if the checkbox is checked
      if (checkbox.checked) {
        //If checked, add its value (agreement_id) to the form
        selectedAgreements.push(checkbox.value);
      }
    });

    console.log(selectedAgreements);

    const numberOfAgreementsInSubscription = parseInt(document.body.getAttribute('numberOfAgreementsInSubscription'));

    // Check if the number of selected agreements matches the desired number
    if (selectedAgreements.length === 0) {
      console.log("'Platinum' subscription.");
    } else if (selectedAgreements.length !== numberOfAgreementsInSubscription) {
      alert(
        `Proszę wybrać dokładnie ${numberOfAgreementsInSubscription} zgody.`
      );
      return; // exit the event handler early
    }

    fetch("/makePaymentForSubscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedAgreements), //Send the selected agreements to the server
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.href = data.redirectUri;
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });
