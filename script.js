var loginID = sessionStorage.getItem("awEJI!OP#"); // cookie?
sessionStorage.setItem("awEJI!OP#", loginID)

var dataArray = [{
        username: "jim",
        password: "lewis",
        id: 125
    },
    {
        username: "kevin",
        password: "academy",
        id: 316
    },
    {
        username: "chris",
        password: "forever",
        id: 186
    }
]

function submit() {
    console.log("submit()")
    var user = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    let uid;

    var success = false;
    // Go thru array to check
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i]["username"] === user && dataArray[i]["password"] === pw) {
            success = true;
            uid = dataArray[i]["id"];
            break;
        }
    }

    // Error note.
    if (success == false) {
        document.getElementById("error").innerHTML = 'ERROR: Either your username or password is incorrect.';
    } else {
        // Set session storage to user ID. Is this secure? Dunno!
        loginID = uid;
        sessionStorage.setItem("awEJI!OP#", loginID)
        window.location.href = 'profile.html';
    }
}

function getUserData(userID) {
    var theData = -1;
    var success = false;
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i]["id"] == userID) {
            success = true;
            console.log("We found", dataArray[i]["username"])
            theData = dataArray[i];
            break;
        }
    }
    return theData;
}

function set_welcome_name() {
    var user = getUserData(loginID)
    var username = user["username"]
    document.getElementById("welcomeMessage").innerHTML = `Welcome, ${username}!`
}

function login_pass() {
    console.log(loginID)
    if (loginID == "null") {
        console.log("ERROR: User not found. Logging out.")
        window.location.href = 'index.html';
        wipe_clean();
    }
}

function wipe_clean() {
    loginID = null;
    sessionStorage.setItem("awEJI!OP#", loginID)
}