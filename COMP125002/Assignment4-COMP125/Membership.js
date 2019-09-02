"use strict";
var accountInfo = document.getElementById("accountInfo");
var register = document.getElementById("register");
var allInputs = document.querySelectorAll("form input");
var province = document.getElementsByTagName("select")[0];
var formError = document.getElementById("formError");

var inputValidity = true;
var ageValidity = true;
var emailValidity = true;
var passwordValidity = true;
var confirmPasswordValidity = true;
var postalCodeValidity = true;
var captchaValidity = true;

function validateForm() {
    try {
        for (var i = 0; i < allInputs.length; i++) {
            var currentInput = allInputs[i];
            if (currentInput.value === ""||province.value==="") {
                throw "*Please fill all the information.";
            }
            formError.innerHTML = "";
            inputValidity = true;
        }
    }
    catch (msg) {
        formError.innerHTML = msg;
        formError.style.color = "rgba(97, 45, 0, 1)";
        inputValidity = false;
        accountInfo.style.display="none";       
    }
}

function validateAge() {
    var age = allInputs[2];
    try {
        if (age.value < 18) {
            throw "*You must be at least 18 years old."
        }
        document.getElementById("ageError").innerHTML = "";
        age.style.backgroundColor = "white";
        ageValidity = true;
    }
    catch (msg) {
        document.getElementById("ageError").innerHTML = msg;
        document.getElementById("ageError").style.color = "rgba(97, 45, 0, 1)";
        age.style.backgroundColor = "rgba(255, 186, 97, 1)";
        ageValidity = false;
        accountInfo.style.display = "none";
    }
}

function validateEmail() {
    var email = allInputs[6];
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    try {
        if (pattern.test(email.value) === false) {
            throw "*Not a valid email."
        }
        document.getElementById("emailError").innerHTML = "";
        email.style.backgroundColor = "white";
        emailValidity = true;
    }
    catch (msg) {
        document.getElementById("emailError").innerHTML = msg;
        document.getElementById("emailError").style.color = "rgba(97, 45, 0, 1)";
        email.style.backgroundColor = "rgba(255, 186, 97, 1)";
        emailValidity = false;
        accountInfo.style.display = "none";
    }
}

function validatePassword() {
    var password = allInputs[7];
    try {
        if (password.value.length < 6) {
            throw "*Password must be at least 6 characters long."
        }
        document.getElementById("passwordError").innerHTML = "";
        password.style.backgroundColor = "white";
        passwordValidity = true;
        allInputs[8].disabled = false;
        allInputs[8].placeholder="Confirm password now";
    }
    catch (msg) {
        document.getElementById("passwordError").innerHTML = msg;
        document.getElementById("passwordError").style.color = "rgba(97, 45, 0, 1)";
        password.style.backgroundColor = "rgba(255, 186, 97, 1)";
        passwordValidity = false;
        accountInfo.style.display = "none";
        allInputs[8].disabled = true;
        allInputs[8].placeholder="Password must be correct first";
    }
}

function validateConfirmPassword() {
    var confirmPassword = allInputs[8];
    try {
        if (confirmPassword.value !== allInputs[7].value&&allInputs[8].value!=="") {
            throw "*Password does not match.";
        }
        document.getElementById("confirmPasswordError").innerHTML = "";
        confirmPassword.style.backgroundColor = "white";
        confirmPasswordValidity = true;
    }
    catch (msg) {
        document.getElementById("confirmPasswordError").innerHTML = msg;
        document.getElementById("confirmPasswordError").style.color = "rgba(97, 45, 0, 1)";
        confirmPassword.style.backgroundColor = "rgba(255, 186, 97, 1)";
        confirmPasswordValidity = false;
        accountInfo.style.display = "none";
    }
}

function validatePostalCode() {
    var postalCode = allInputs[5];
    var pattern = /^[a-zA-Z]+[0-9]+[a-zA-Z]+[0-9]+[a-zA-Z]+[0-9]$/;
    try {
        if (pattern.test(postalCode.value) === false) {
            throw "*Not a valid Postal Code.";
        }
        document.getElementById("postalCodeError").innerHTML = "";
        postalCode.style.backgroundColor = "white";
        postalCodeValidity = true;
        postalCode.value = postalCode.value.toUpperCase();
    }
    catch (msg) {
        document.getElementById("postalCodeError").innerHTML = msg;
        document.getElementById("postalCodeError").style.color = "rgba(97, 45, 0, 1)";
        postalCode.style.backgroundColor = "rgba(255, 186, 97, 1)";
        postalCodeValidity = false;
        accountInfo.style.display = "none";
    }
}

function generateCaptcha() {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("captcha").innerHTML = code;
        document.getElementById("captcha").value = code;
        document.getElementById("captchaEnter").value = "";
}

function validateCaptcha() {
    var code = document.getElementById("captcha");
    var codeEnter = document.getElementById("captchaEnter");
    try {
        if (code.value.split(' ').join('') !== codeEnter.value&&codeEnter.value!=="") {
            throw "*Captcha code incorrect. Try again."
        }
        document.getElementById("captchaError").innerHTML = "";
        codeEnter.style.backgroundColor = "white";
        captchaValidity = true;
    }
    catch (msg) {
        document.getElementById("captchaError").innerHTML = msg;
        document.getElementById("captchaError").style.color = "rgba(97, 45, 0, 1)";
        codeEnter.style.backgroundColor = "rgba(255, 186, 97, 1)";
        captchaValidity = false;
        accountInfo.style.display = "none";
        generateCaptcha();
        codeEnter.value = "";
    }
}

function createAccount() {
    if (inputValidity === true && ageValidity === true && emailValidity === true && passwordValidity === true && confirmPasswordValidity === true && postalCodeValidity === true && captchaValidity === true) {
        window.alert("Thanks for registering with our website, your customer record was created successfully.");
        accountInfo.innerHTML = "<p><span>Account Info:</span><br><br><label>Name: </label>" + allInputs[0].value + " " + allInputs[1].value + "<br><label>Age: </label>" + allInputs[2].value + "<br><label>Address: </label>" + allInputs[3].value + ", " + allInputs[4].value + ", " + allInputs[5].value + ", " + document.getElementsByTagName("option")[province.selectedIndex].value + " <br><label>Email: </label>" + allInputs[6].value + "<br><label>Password: </label>" + allInputs[7].value + "</p>";
        accountInfo.style.display = "block";       
    }
}

function resetForm() {
    for (var i = 0; i < allInputs.length-1; i++) {
        allInputs[i].value = "";
        allInputs[i].style.backgroundColor = "white";
    }
    allInputs[8].value = "";
    allInputs[8].disabled = true;
    allInputs[8].style.backgroundColor = "lightgray";
    allInputs[9].value = "";
    allInputs[9].style.backgroundColor = "white";
    province.value = "";
    document.getElementById("formError").innerHTML = "";
    document.getElementById("ageError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("confirmPasswordError").innerHTML = "";
    document.getElementById("postalCodeError").innerHTML = "";
    document.getElementById("captchaError").innerHTML = "";
    accountInfo.style.display = "none";
}

function addEventListener() {
    register.addEventListener("click", validateCaptcha, false);
    register.addEventListener("click", validateForm, false);
    allInputs[2].addEventListener("change", validateAge, false);
    allInputs[6].addEventListener("change", validateEmail, false);
    allInputs[7].addEventListener("change", validatePassword, false);
    allInputs[7].addEventListener("change", validateConfirmPassword, false);
    allInputs[8].addEventListener("change", validateConfirmPassword, false);
    allInputs[5].addEventListener("change", validatePostalCode,false);
    register.addEventListener("click", createAccount, false);
    document.getElementById("reset").addEventListener("click", resetForm, false);
    document.getElementById("captchaGen").addEventListener("click", generateCaptcha, false);
    document.getElementById("reset").addEventListener("click", generateCaptcha, false);
}

window.addEventListener("load", addEventListener, false);
window.onload = function () {
    document.getElementById("captchaGen").click();
}