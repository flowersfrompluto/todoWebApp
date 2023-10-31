let fnameError = document.getElementById("fnameError")
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
let lnameError = document.getElementById("lnameError")
let username = document.getElementById("username")
let usernameError = document.getElementById("usernameError")
let email = document.getElementById("email")
let emailError = document.getElementById("emailError")
let phoneNumber = document.getElementById("phoneNumber")
let phoneError = document.getElementById("phoneError")
let password = document.getElementById("password")
let passwordError = document.getElementById("passwordError")
let gender = document.getElementById("gender")
let genderError = document.getElementById("genderError")
let signUpBtn = document.getElementById("signUpBtn")
// let user = []




signUpBtn.addEventListener("click", function (e) {
    e.preventDefault()
    validateSignup()
});

function signUpSuccess() {
    if (fname.value != "" &&
        lname.value != "" &&
        username.value != "" &&
        email.value != "" &&
        phoneNumber.value != "" &&
        password.value != "" &&
        gender.value != "") {
        fnameError.innerText = ""
        lnameError.innerText = ""
        usernameError.innerText = ""
        emailError.innerText = ""
        phoneError.innerText = ""
        passwordError.innerText = ""
        genderError.innerText = ""
        return true;
    }

};
function signUpFailed() {
    if (fname.value == "" &&
        lname.value == "" &&
        username.value == "" &&
        email.value == "" &&
        phoneNumber.value == "" &&
        password.value == "" &&
        gender.value == "") {
        return true;
    }
};
function clearField() {
    fname.value = ""
    lname.value = ""
    username.value = ""
    email.value = ""
    phoneNumber.value = ""
    password.value = ""
    gender.value = ""
};


function createAccount() {

    const user = {
        first_name: fname.value,
        last_name: lname.value,
        email: email.value,
        gender: gender.value,
        phone: phoneNumber.value,
        password: password.value,
        username: username.value,
    }
    
    fetch("https://6538e362a543859d1bb22212.mockapi.io/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else{
            alert("Account Creation Failed!")
        }
    }).then(data => {
        alert("Account Created", data)
    }).catch(error => {
        console.log("error", error)
    })
}

function validateSignup(created, failed) {
    created = signUpSuccess()
    failed = signUpFailed

    if (created) {
        createAccount()
        clearField()
    } else if (failed) {
        fnameError.innerText = "*required"
        lnameError.innerText = "*required"
        usernameError.innerText = "*required"
        emailError.innerText = "*required"
        phoneError.innerText = "*required"
        passwordError.innerText = "*required"
        genderError.innerText = "*required"
    }
}

