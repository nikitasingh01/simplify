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

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function saveRevenue() {
    var revenueDate = document.getElementById("revenueDate").value;
    var dollarPayment = document.getElementById("dollarPayment").value;
    var inrPayment = document.getElementById("inrPayment").value;

    for(let i=0; i<revenueArray.length; i++) {
        if(revenueArray[i][0] === revenueDate) {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            return;
        }
    }

    var params = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA', 
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
        obj.innerHTML = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Saving...`;
        setTimeout(function() {
            obj.style.backgroundColor = "#007bff";
            obj.innerHTML = "Save";
            obj.style.color = "white";
        }, 4000);

        let array = [revenueDate, dollarPayment, inrPayment];
        makeApiCallRevenue();
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

let revenueArray = [];
function makeApiCallRevenue() {
    var params = {
    spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA', 
    range: 'Revenue!A2:Z1000',
    };

    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {

        revenueArray = response.result.values;
        revenueArray.sort(function (a, b) {
            a = a[0].split('/');
            b = b[0].split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        });
        revenueArray.reverse();

        var tableBody = document.getElementById("revenueTableBody");
        tableBody.innerHTML = "";
        for(var i=0; i<revenueArray.length; i++) {
            displayRevenue(revenueArray[i]);
        }
    }, function(reason) {
    console.error('error: ' + reason.result.error.message);
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
        let signInButton = document.getElementById("revenueSignInButton");

        signInButton.style.backgroundColor = "#f1f1f1";
        signInButton.style.borderColor = "black";
        signInButton.style.borderWidth = "2px";
        signInButton.style.color = "black";
        signInButton.innerHTML = "<b>Signed In</b>";
        
        makeApiCallRevenue();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
