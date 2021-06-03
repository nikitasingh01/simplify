async function saveNewProject() {
    let clientArray = [];

    var params1 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Clients!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params1);

    if(request.result.values != undefined) 
        clientArray = request.result.values;

    // console.log(clientArray);

    var params2 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Projects!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params2);
    var projectArray = [];
    if(request1.result.values != undefined) 
        projectArray = request1.result.values;

    console.log(projectArray);

    var projectId = projectArray[projectArray.length-1][0];
    console.log(projectId);
    
    var clientName = document.getElementById("clientName").value;
    var contactPerson = document.getElementById("contactPerson").value;
    var clientCountry = document.getElementById("clientCountry").value;
    var rating = document.getElementById("rating").value;

    projectId = parseInt(projectId) + parseInt("1");
    console.log(projectId);
    var projectName = document.getElementById("projectName").value;
    var projectTypeSelect = document.getElementById("projectTypeSelect").value;
    var projectValue = document.getElementById("projectValue").value;
    var contractTypeSelect = document.getElementById("contractTypeSelect").value;
    var feesRate = document.getElementById("feesRate").value;
    var expectedRevenue = document.getElementById("expectedRevenue").value;
    var dueDate = document.getElementById("dueDate").value;
    var projectStatus = "Ongoing"; 

    let flag = false;

    for(let i=0; i<clientArray.length; i++) {
        if(clientArray[i][1] === clientName) {
            flag = true;
            let temp = parseInt(clientArray[i][4]) + parseInt(projectValue);
            clientArray[i][4] = temp;

            var params = {
                spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
                range: 'Clients!A2',
                valueInputOption: "USER_ENTERED",
            };
        
            var valueRangeBody = {
                "majorDimension": "ROWS",
                "values": clientArray,
            };
        
            var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
            request.then(function(response) {
            console.log(response.result);
            }, function(reason) {
            console.error('error: ' + reason.result.error.message);
            });

            break;
        }
    }

    if(flag === false) {

        var params = {
            spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
            range: 'Clients!A2:Z1000',
            valueInputOption: "USER_ENTERED",
        };

        var valueRangeBody = {
            "majorDimension": "ROWS",
            "values": [
                [clientCountry,
                clientName,
                contactPerson,
                rating,
                projectValue]
            ]
        };

        var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
        request.then(function(response) {
            console.log(response.result);
            obj = document.getElementById("newProjectSaveButton");
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
            obj = document.getElementById("newProjectSaveButton");
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

    

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
        dd='0'+dd;

    if(mm<10) 
        mm='0'+mm;
        
    var date = dd+'/'+mm+'/'+yyyy;


    var params = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Projects!A2:Z1000',
        valueInputOption: "USER_ENTERED",
    };

    var valueRangeBody = {
        "majorDimension": "ROWS",
        "values": [
            [projectId,
            date,
            clientName,
            projectName,
            dueDate,
            projectTypeSelect,
            contractTypeSelect,
            projectValue,
            feesRate,
            expectedRevenue,
            projectStatus]
        ]
    };

    var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
        console.log(response.result);
        obj = document.getElementById("newProjectSaveButton");
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
        obj = document.getElementById("newProjectSaveButton");
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