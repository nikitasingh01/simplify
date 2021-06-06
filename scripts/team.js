var count = 0;
function displayTeam(arr) {
    count++;
    var tableBody = document.getElementById("teamTableBody");
    
    var tableRow = document.createElement("tr");
    var name = document.createElement("th");
    var primarySkill = document.createElement("td");
    var status = document.createElement("td");
    var performance = document.createElement("td");
    var earnings = document.createElement("td");
    var projects = document.createElement("td");
    var detailsButton = document.createElement("td");
    var buttons = document.createElement("button");
    buttons.setAttribute("id","id"+count);
    
    name.setAttribute("scope","row");

    name.innerHTML = arr[0];
    primarySkill.innerHTML = arr[1];
    status.innerHTML = arr[2];
    performance.innerHTML = arr[3];
    earnings.innerHTML = arr[4];
    projects.innerHTML = arr[5];
    
    buttons.setAttribute("class","btn btn-primary");
    buttons.setAttribute("onclick","moreDetails(id)");
    buttons.innerHTML = "More Details";
    detailsButton.appendChild(buttons);


    tableRow.appendChild(name);
    tableRow.appendChild(primarySkill);
    tableRow.appendChild(status);
    tableRow.appendChild(performance);
    tableRow.appendChild(earnings);
    tableRow.appendChild(projects);
    tableRow.appendChild(detailsButton);

    tableBody.appendChild(tableRow);
}

let teamArray = [];
async function makeApiCallTeam() {
    var params = {
    spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
    range: 'Team!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params);
    teamArray = request.result.values;
    console.log(teamArray);
    var tableBody = document.getElementById("teamTableBody");
    tableBody.innerHTML = "";
    for(var i=0; i<teamArray.length; i++) {
        displayTeam(teamArray[i]);
    }
}

function makeRow(a, b, c, d) {
    var containerTeam = document.getElementById("containerTeam");
    
    var firstRow = document.createElement("div");
    firstRow.setAttribute("class","row");

    var bankNameTagDiv = document.createElement("div");
    bankNameTagDiv.setAttribute("class","col-2");
    var bankNameTag = document.createElement("h6");
    bankNameTag.innerHTML = a + ": ";
    bankNameTagDiv.appendChild(bankNameTag);

    var bankNameContentDiv = document.createElement("div");
    bankNameContentDiv.setAttribute("class","col-3");
    var bankNameContent = document.createElement("p");
    bankNameContent.innerHTML = b;
    bankNameContentDiv.appendChild(bankNameContent);

    firstRow.appendChild(bankNameTagDiv);
    firstRow.appendChild(bankNameContentDiv);

    var accountNumberTagDiv = document.createElement("div");
    accountNumberTagDiv.setAttribute("class","col-2");
    var accountNumberTag = document.createElement("h6");
    accountNumberTag.innerHTML = c+": ";
    accountNumberTagDiv.appendChild(accountNumberTag);

    var accountNumberContentDiv = document.createElement("div");
    accountNumberContentDiv.setAttribute("class","col-5");
    var accountNumberContent = document.createElement("p");
    accountNumberContent.innerHTML = d;
    accountNumberContentDiv.appendChild(accountNumberContent);

    firstRow.appendChild(accountNumberTagDiv);
    firstRow.appendChild(accountNumberContentDiv);

    containerTeam.appendChild(firstRow);
}

function moreDetails(memberId) {
    memberId = parseInt(memberId.substring(2));
    var memberDetail = teamArray[memberId-1];
    console.log(memberDetail);

    var containerTeam = document.getElementById("containerTeam");
    containerTeam.innerHTML = `<div class="mt-4 teamTitle d-flex align-items-center">
    <a href="./team.html">
        <button type="button" class="btn backButton" id="backButton"><i class="bi bi-arrow-left"></i></button>
    </a>
    <h4>Team-Member Details</h4>
    </div>`;

    var memberNameDiv = document.createElement("div");
    memberNameDiv.setAttribute("class","mt-3");
    var memberName = document.createElement("h5");
    memberName.innerHTML = memberDetail[0];
    memberNameDiv.appendChild(memberName);

    var memberJoinDate = document.createElement("div");
    memberJoinDate.setAttribute("class","mt-2");
    var joinDate = document.createElement("h5");
    joinDate.innerHTML = "Team Member Since: " + memberDetail[16];
    memberJoinDate.appendChild(joinDate);

    containerTeam.appendChild(memberNameDiv);
    containerTeam.appendChild(memberJoinDate);
    
    makeRow("<b>Bank Name</b>", memberDetail[12], "<b>Account Number</b>", memberDetail[11]);
    makeRow("IFSC", memberDetail[13], "PAN", memberDetail[10]);
    makeRow("Primary Skills", memberDetail[1], "Skill Details", memberDetail[9]);
    makeRow("Address", memberDetail[8], "Remarks", memberDetail[15]);

    var firstRow = document.createElement("div");
    firstRow.setAttribute("class","row");

    var trackerTagDiv = document.createElement("div");
    trackerTagDiv.setAttribute("class","col-2");
    var trackerTag = document.createElement("h6");
    trackerTag.innerHTML = "Payouts Tracker: ";
    trackerTagDiv.appendChild(trackerTag);

    var trackerContentDiv = document.createElement("div");
    trackerContentDiv.setAttribute("class","col-10");
    var trackerContent = document.createElement("p");
    trackerContent.innerHTML = memberDetail[14];
    trackerContentDiv.appendChild(trackerContent);

    firstRow.appendChild(trackerTagDiv);
    firstRow.appendChild(trackerContentDiv);

    containerTeam.appendChild(firstRow);
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
        makeApiCallTeam();
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