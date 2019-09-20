var fs = require('fs');
let dataArray;

var encrypt_key = 'JohnSMIT!@#*(I(2-lll-@T#LOCK3Is3theBai7st'

// Paranoia step, just make sure no one knows what encryption method we're using. ;)
function load_libraries() {
    var imported = document.createElement('script');
    imported.src = 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js';
    document.head.appendChild(imported);
}


// Gets account data from encrypted file, loads it into active data array. Is it safe? Dunno.
function load_account_data() {
    $.get("accountdata.db", function(data) {
        var bytes = CryptoJS.AES.decrypt(data.toString(), encrypt_key);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        eval('dataArray = ' + decryptedData); // POSSIBLE TO EXPLOIT THIS BY INJECTING BAD CODE INTO USERNAME/PASSWORD.
    });

}

// Saves all dataArray acc data into encrypted file.
function save_account_data() {
    var file = fs.createWriteStream('accountdata.db');

    var ciphered = CryptoJS.AES.encrypt(JSON.stringify(dataArray), encrypt_key);
    file.write(ciphered);

    file.end();
}

// Master function from user input.
function push_account(username, password) {

}

// Makes sure username is unique.
function check_valid(username) {

}

function generate_unique_id() {
    // Set it to the number of people + 1
    var id = dataArray.length + 1;

    // Test to see if it works.
    var matched = false;
    for (var i = 0; i < dataArray.length; i++) {
        if (id == dataArray[i]["id"]) {
            matched = true; // Ah shit it doesn't.
            break;
        }
    }

    // Perhaps an unnecessary security precaution.
    if (matched) // Well, it matched, so now let's just keep adding one until it doesn't.
    {
        while (matched) {
            id++;
            matched = false;
            for (var i = 0; i < dataArray.length; i++) {
                if (id == dataArray[i]["id"]) {
                    matched = true;
                    break;
                }
            }
        }

    }

    return id;
}

// Creates account, puts it in database, updates database file.
function create_account(username, password, id) {

}