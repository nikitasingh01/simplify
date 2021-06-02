function displayRevenue(arr) {
    var tableBody = document.getElementById("revenueTableBody");
    
    var tableRow = document.createElement("tr");
    var date = document.createElement("td");
    var dollar = document.createElement("td");
    var rupees = document.createElement("td");

    date.innerHTML = arr[0];
    dollar.innerHTML = arr[1];
    rupees.innerHTML = arr[2];

    tableRow.appendChild(date);
    tableRow.appendChild(dollar);
    tableRow.appendChild(rupees);

    tableBody.appendChild(tableRow);
}

function saveRevenue() {
    var revenueDate = document.getElementById("revenueDate").value;
    var dollarPayment = document.getElementById("dollarPayment").value;
    var inrPayment = document.getElementById("inrPayment").value;

    var params = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Revenue!A2:Z1000',
        valueInputOption: "USER_ENTERED",
    };

    var valueRangeBody = {
        "majorDimension": "ROWS",
        "values": [
            [revenueDate,
            dollarPayment,
            inrPayment]
        ]
    };

    var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
        console.log(response.result);
        obj = document.getElementById("revenueSaveButton");
        obj.style.backgroundColor = "#f1f1f1";
        obj.style.borderColor = "black";
        obj.style.color = "black";
        obj.innerHTML = "Saved <b>&#10003;</b>";
        setTimeout(function() {
            obj.style.backgroundColor = "#007bff";
            obj.innerHTML = "Save";
            obj.style.color = "white";
        }, 4000);

        let array = [revenueDate, dollarPayment, inrPayment];
        console.log(array); 
        displayRevenue(array);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
        obj = document.getElementById("revenueSaveButton");
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

function makeApiCallRevenue() {
    var params = {
    spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
    range: 'Revenue!A2:Z1000',
    };

    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {
        var revenueArray = response.result.values;
        for(var i=0; i<revenueArray.length; i++) {
            displayRevenue(revenueArray[i]);
        }
        console.log(revenueArray);
    }, function(reason) {
    console.error('error: ' + reason.result.error.message);
    });
}

//Authentication functions used for this app

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
        let signInButton = document.getElementsByClassName("signinButton");

        for(let i=0; i<signInButton.length; i++) {
            signInButton[i].style.backgroundColor = "#f1f1f1";
            signInButton[i].style.borderColor = "black";
            signInButton[i].style.borderWidth = "2px";
            signInButton[i].style.color = "black";
            signInButton[i].innerHTML = "<b>Signed In</b>";
        }
        
        makeApiCallRevenue();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}