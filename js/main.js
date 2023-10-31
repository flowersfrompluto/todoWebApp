let loginBtn = document.getElementById("loginBtn");
let username = document.getElementById("username");
let password = document.getElementById("password");
let usernameError = document.getElementById("usernameError");
let passwordError = document.getElementById("passwordError");
let show_ad = document.getElementById("overlay");
let hideBtn = document.getElementById("hideBtn");
let logContainer = document.getElementById("logContainer");
let loginError = document.getElementById("loginError")
let user = [];
logContainer.style.display = "none"
show_ad.style.display = "none"



function showWelcome() {
    show_ad.style.display = "initial"
    hideBtn.addEventListener("click", function () {
        show_ad.style.display = "none"
        logContainer.style.display = "inherit"
    })
}

setTimeout(function () {
    showWelcome();
}, 1000);

loginBtn.addEventListener("click", function (e) {
    e.preventDefault()
    validate()
});

function loginSuccess() {
    if (username.value != "" &&
        password.value != "") {
        usernameError.innerHTML = ""
        passwordError.innerHTML = ""
        return true;
    }
};
function loginFailed() {
    if (username.value == "" ||
        password.value == "") {
        return true;
    }
};
function clearField() {
    username.value = ""
    password.value = ""
};

function validate(posted, failed) {
    posted = loginSuccess();
    failed = loginFailed();
    if (posted) {
        UserLogin()
        // clearField()
    } else if (failed) {
        usernameError.innerHTML = "*required"
        passwordError.innerHTML = "*required"
    }
}

function UserLogin() {
    let userID = loginSuccess("username")
    let passcode = loginSuccess("password")

    if (userID && passcode) {
        fetch ("https://6538e362a543859d1bb22212.mockapi.io/users")
        .then(response => {
            if (response.ok) {
                return response.json
            }else{
                loginError.innerText = "User does not exist!"
                loginError.style.color = "red"
                loginError.style.fontSize = "20px"
            }
        }).then(user => {
            let search = user.find( user => user.username === username && user.password === password)
            if (search) {
                loginError.innerText = "Login Successful"
                loginError.style.color = "green"
                loginError.style.fontSize = "20px"
                window.location.href = "./taskView.html"
            } else{
                loginError.innerText = "User details incorrect, check details and try again"
                loginError.style.color = "red"
                loginError.style.fontSize = "20px"
            }
        }).catch(error => {
            console.log("error", error)
        })
    }
}