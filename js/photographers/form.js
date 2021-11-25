
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".btn-close");

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'formContact'){
        launchModal()
    }
})

/* <h1 class="form-title">
    Contactez-moi
    <br> Mimi Keel
</h1> */

fetch('../../data/apiFisheye.json')
    .then(resPhotographers => resPhotographers.json())
    .then(data => {
        let photographersData = data.photographers;
        let sectionPhotographerProfil = document.getElementById('photographersProfil');
        const id = window.location.search.split('id=')[1];
        const photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
        const templatePhotographersProfil = `<h1 class="form-title">
        Contactez-moi
        <br> ${ photographers[0].name }
        </h1> `
        sectionPhotographerProfil.innerHTML = templatePhotographersProfil;
    })


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

//Close modal form
modalClose.addEventListener('click', () => {
    if (getComputedStyle(modalbg).display != "none") {
        modalbg.style.display = "none";
    }
})

// Contrôle de validation des champs
let isFormValid = true;

// DOM elements form
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const quantityInput = document.getElementById('quantity');
const conditionsCheckboxInput = document.getElementById('checkbox1');
const citysCheckboxInput = document.getElementsByClassName(".checkbox-input");
const birthdateInput = document.getElementById('birthdate');

// Error Elements
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");
const quantityError = document.getElementById("quantity-error");
const errorConditionsCheckbox = document.getElementById("error-checkbox1");
const errorCityCheckbox = document.getElementById('city-checkbox-error');
const birthdateError = document.getElementById('date-error')

function validateInput(input, errorTag, regex, message) {
    //first name, laste name, email, error message
    if (input.value.trim() == "") {
        errorTag.innerHTML = "Le champ ci-dessus est requis";
        errorTag.style.color = "red";
        errorTag.style.fontSize = "14px";
        errorTag.style.display = "flex";
        errorTag.style.justifyContent = "flex-start";
        input.style.border="2px solid red";
        return false
    } else if (regex.test(input.value) == false) {
        errorTag.innerHTML = message;
        errorTag.style.color = "red";
        errorTag.style.fontSize = "14px";
        errorTag.style.display = "flex";
        errorTag.style.justifyContent = "flex-start";
        input.style.border="2px solid red";
        return false
    } else {
        errorTag.style.display = "none"
        input.style.border="2px solid white";
        return true
    }
}

function validateCheckbox(conditionToCheck, errorTag, message) {
    if (conditionToCheck == false) {
        errorTag.innerHTML = message;
        errorTag.style.color = "red";
        errorTag.style.fontSize = "14px";
        errorTag.style.display = "flex";
        errorTag.style.justifyContent = "flex-start";
        return false;
    } else {
        errorTag.style.display = "none";
        return true;
    }
}

function validate(e) {
    e.preventDefault();

    // Selection of city
    let isLocationChecked = false;
    for (let index = 0; index < tabsLocation.length; index++) {
        const radio = tabsLocation[index];
        if (radio.checked == true) { isLocationChecked = true }
    }

    // REGEX
    const nameRegex = /^[a-zA-Z]+[a-zA-Z-]?[a-zA-Z]+$/;
    const emailRegex = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
    const quantityRegex = /^[0-9][0-9]?$/;
    const dateRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;

    // messages error 
    const isFirstNameValid = validateInput(firstNameInput, firstNameError, nameRegex, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    const isLastNameValid = validateInput(lastNameInput, lastNameError, nameRegex, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    const isEmailValid = validateInput(emailInput, emailError, emailRegex, "Veuillez vérifier que l'email est valide");
    const isBirthdayValid = validateInput(birthdateInput, birthdateError, dateRegex, "Vous devez entrer votre date de naissance.");
    const isQuantityValid = validateInput(quantityInput, quantityError, quantityRegex, "Seulement des caractères numérique sont autorisés");
    const isLocationValid = validateCheckbox(isLocationChecked, errorCityCheckbox, "Vous devez choisir une option");
    const isConditionValid = validateCheckbox(conditionsCheckboxInput.checked, errorConditionsCheckbox, "Vous devez vérifier que vous acceptez les termes et conditions.")

    // Form validation
    if (isFirstNameValid && isLastNameValid && isEmailValid && isBirthdayValid && isQuantityValid && isLocationValid && isConditionValid) {
        console.log("form valid");
    }
}
