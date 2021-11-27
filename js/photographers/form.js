
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".btn-close");

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'formContact'){
        launchModal()
    }
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

// Error Elements
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");


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

    // REGEX
    const nameRegex = /^[a-zA-Z]+[a-zA-Z-]?[a-zA-Z]+$/;
    const emailRegex = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;

    // messages error 
    const isFirstNameValid = validateInput(firstNameInput, firstNameError, nameRegex, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    const isLastNameValid = validateInput(lastNameInput, lastNameError, nameRegex, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    const isEmailValid = validateInput(emailInput, emailError, emailRegex, "Veuillez vérifier que l'email est valide");
    const isConditionValid = validateCheckbox(conditionsCheckboxInput.checked, errorConditionsCheckbox, "Vous devez vérifier que vous acceptez les termes et conditions.")

    // Form validation
    if (isFirstNameValid && isLastNameValid && isEmailValid && isConditionValid) {
        console.log("form valid");
    }
}
