async function makeApiCallHelperSheet() {
    var params1 = {
        spreadsheetId: '1_pUO34inYV81KGTy-DFZsr7rLtpTewd7tZuL_g9EwHA', 
        range: 'Skills!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    let skills = [];

    if(request1.result.values != undefined) 
        skills = request1.result.values;

    let primarySkillSelect = document.getElementById("primarySkillSelect");
    for(let i=0; i<skills.length; i++) {
        if(skills[i] !== "") {
            let options = document.createElement("option");
            options.innerHTML = skills[i];

            primarySkillSelect.appendChild(options);
        }
    }
}

function addTeamMember() {
    var name = document.getElementById("name").value;
    var emailId = document.getElementById("emailId").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var primarySkill = document.getElementById("primarySkillSelect").value;
    var skillDetail = document.getElementById("skillDetail").value;
    var address = document.getElementById("address").value;
    var remarks = document.getElementById("remarks").value;
    var bankName = document.getElementById("bankName").value;
    var ifsc = document.getElementById("IFSC").value;
    var accountNumber = document.getElementById("accountNumber").value;
    var panNumber = document.getElementById("PAN").value;
    var payoutTracker = document.getElementById("payoutTracker").value;
    var status = "free";
    var performance = "10/10";
    var earnings = "10000";
    var projects = "1";

    var params = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Team!A2:Z1000',
        valueInputOption: "USER_ENTERED",
    };

    var valueRangeBody = {
        "majorDimension": "ROWS",
        "values": [
            [name,
            primarySkill,
            status,
            performance,
            earnings,
            projects,
            emailId,
            phoneNumber,
            address,
            skillDetail,
            panNumber,
            accountNumber,
            bankName,
            ifsc,
            payoutTracker,
            remarks]
        ]
    };

    var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
        console.log(response.result);
        obj = document.getElementById("addMemberSaveButton");
        obj.style.backgroundColor = "#f1f1f1";
        obj.style.borderColor = "black";
        obj.style.color = "black";
        obj.innerHTML = "Saved <b>&#10003;</b>";
        setTimeout(function() {
            obj.style.backgroundColor = "#007bff";
            obj.innerHTML = "Save";
            obj.style.color = "white";
        }, 4000);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
        obj = document.getElementById("addMemberSaveButton");
        obj.style.backgroundColor = "#f1f1f1";
        obj.style.borderColor = "black";
        obj.style.color = "black";
        obj.innerHTML = "Error!";
        setTimeout(function() {
            obj.style.backgroundColor = "#007bff";
            obj.innerHTML = "Save";
            obj.style.color = "white";
        }, 4000);
    });
}

//Authentication functions used for this app

$(document).ready(function() {
    $('.signoutButton').click(function() {
        location.reload();
    });
});

function initClient() {
    var API_KEY = 'AIzaSyA5iKpQ3DJ66zFJGsQCaNV8lF7dv0alyAw';  
    var CLIENT_ID = '1080657069033-jcl8n4ojl14fvofuq9qh1esfog3g0piq.apps.googleusercontent.com';  
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCallHelperSheet();
        let signInButton = document.getElementsByClassName("signinButton");

        for(let i=0; i<signInButton.length; i++) {
            signInButton[i].style.backgroundColor = "#f1f1f1";
            signInButton[i].style.borderColor = "black";
            signInButton[i].style.borderWidth = "2px";
            signInButton[i].style.color = "black";
            signInButton[i].innerHTML = "<b>Signed In</b>";
        }
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}