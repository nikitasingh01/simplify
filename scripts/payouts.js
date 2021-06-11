function createPayouts(arr, projectsArray, deliveryArray, count) {
    let outerDiv = document.getElementById("accordion");

    let card = document.createElement("div");
    card.setAttribute("class","card payoutsCard");

    let cardHead = document.createElement("div");
    cardHead.setAttribute("class","card-header d-flex");
    cardHead.setAttribute("id","heading"+count);

    let title = document.createElement("a");
    title.setAttribute("class","title col-7");

    let titleContent = document.createElement("h5");
    titleContent.setAttribute("class","mb-0");
    titleContent.setAttribute("data-toggle","collapse");
    titleContent.setAttribute("data-target","#collapse"+count);
    titleContent.setAttribute("id","title"+count);
    titleContent.innerText = arr[0];
    title.appendChild(titleContent);

    let totalDueDiv = document.createElement("div");
    totalDueDiv.setAttribute("class","col-2 d-flex align-items-center");
    let totalDueContent = document.createElement("h6");
    totalDueContent.setAttribute("class","d-flex align-items-center");
    totalDueContent.setAttribute("id","totalDue"+count);
    totalDueDiv.appendChild(totalDueContent);

    let paidStatusDiv = document.createElement("div");
    paidStatusDiv.setAttribute("class","col-3 manageProjectsToggle d-flex");

    let paidLabel = document.createElement("label");
    paidLabel.setAttribute("class","ml-2 mr-2 switch toggleButton");
    let paidInput = document.createElement("input");
    paidInput.setAttribute("type","checkbox");
    paidInput.setAttribute("id","Toggle"+count);
    let paidSpan = document.createElement("span");
    paidSpan.setAttribute("class","slider round");
    paidLabel.appendChild(paidInput);
    paidLabel.appendChild(paidSpan);

    let paidStatus = document.createElement("h6");
    paidStatus.setAttribute("class","completedText");
    paidStatus.innerText = "Paid";

    paidStatusDiv.appendChild(paidLabel);
    paidStatusDiv.appendChild(paidStatus);

    cardHead.appendChild(title);
    cardHead.appendChild(totalDueDiv);
    cardHead.appendChild(paidStatusDiv);
    
    let cardbodyDiv = document.createElement("div");
    cardbodyDiv.setAttribute("id","collapse"+count);
    cardbodyDiv.setAttribute("class","collapse");
    cardbodyDiv.setAttribute("aria-labelledby","heading"+count);
    cardbodyDiv.setAttribute("data-parent","#accordion");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");
    cardbodyDiv.appendChild(cardBody);
    
    card.appendChild(cardHead);
    card.appendChild(cardbodyDiv);
    outerDiv.appendChild(card);

    for(let i=0; i<projectsArray.length; i++) {

        let addTaskArray = [];
        for(let j=0; j<deliveryArray.length; j++) {

            if(deliveryArray[j][4]==arr[0] && deliveryArray[j][0] == projectsArray[i][0] && deliveryArray[j][8]=="Completed" && deliveryArray[j][12]=="Due") {
                
                let dummyArray = [];
                dummyArray.push(deliveryArray[j][2]);
                dummyArray.push(deliveryArray[j][3]);
                dummyArray.push(deliveryArray[j][6]);
                dummyArray.push(deliveryArray[j][7]);

                addTaskArray.push(dummyArray);
            }
        }

        if(addTaskArray != "") {
            let projectDiv = document.createElement("div");
            projectDiv.setAttribute("class","row align-items-center");
            let projectTitleDiv = document.createElement("div");
            projectTitleDiv.setAttribute("class","col-12");
            let projectTitle = document.createElement("h6");
            projectTitle.innerHTML += projectsArray[i][0];
            projectTitle.innerHTML += " :: ";
            projectTitle.innerHTML += projectsArray[i][3];
            projectTitleDiv.appendChild(projectTitle);
            projectDiv.appendChild(projectTitleDiv);

            let headingsDiv = document.createElement("div");
            headingsDiv.setAttribute("class","row align-items-center mt-1");

            let taskIdDiv = document.createElement("div");
            taskIdDiv.setAttribute("class","taskId");
            let taskIdContent = document.createElement("h6");
            taskIdContent.innerHTML += "Task ID";
            taskIdDiv.appendChild(taskIdContent);

            let completedTaskDiv = document.createElement("div");
            completedTaskDiv.setAttribute("class","completedTask");
            let completedTaskContent = document.createElement("h6");
            completedTaskContent.innerHTML += "Completed Task";
            completedTaskDiv.appendChild(completedTaskContent);

            let fixedPayMaxDiv = document.createElement("div");
            fixedPayMaxDiv.setAttribute("class","fixedPayMax");
            let fixedPayMaxContent = document.createElement("h6");
            fixedPayMaxContent.innerHTML += "Fixed Pay (Max)";
            fixedPayMaxDiv.appendChild(fixedPayMaxContent);

            let variablePayMaxDiv = document.createElement("div");
            variablePayMaxDiv.setAttribute("class","variablePayMax");
            let variablePayMaxContent = document.createElement("h6");
            variablePayMaxContent.innerHTML += "Variable Pay (Max)";
            variablePayMaxDiv.appendChild(variablePayMaxContent);

            let fixedPayDiv = document.createElement("div");
            fixedPayDiv.setAttribute("class","fixedPayActual");
            let fixedPayContent = document.createElement("h6");
            fixedPayContent.innerHTML += "Fixed Pay (Actual)";
            fixedPayDiv.appendChild(fixedPayContent);

            let variablePayDiv = document.createElement("div");
            variablePayDiv.setAttribute("class","variablePayActual");
            let variablePayContent = document.createElement("h6");
            variablePayContent.innerHTML += "Variable Pay (Actual)";
            variablePayDiv.appendChild(variablePayContent);

            let totalPayDiv = document.createElement("div");
            totalPayDiv.setAttribute("class","totalPay");
            let totalPayContent = document.createElement("h6");
            totalPayContent.innerHTML += "Total Payout";
            totalPayDiv.appendChild(totalPayContent);

            let feedbackDiv = document.createElement("div");
            feedbackDiv.setAttribute("class","feedback");
            let feedbackContent = document.createElement("h6");
            feedbackContent.innerHTML += "Feedback";
            feedbackDiv.appendChild(feedbackContent);

            let trackerDiv = document.createElement("div");
            trackerDiv.setAttribute("class","tracker");
            let trackerContent = document.createElement("h6");
            trackerContent.innerHTML += "Tracker";
            trackerDiv.appendChild(trackerContent);

            headingsDiv.appendChild(taskIdDiv);
            headingsDiv.appendChild(completedTaskDiv);
            headingsDiv.appendChild(fixedPayMaxDiv);
            headingsDiv.appendChild(variablePayMaxDiv);
            headingsDiv.appendChild(fixedPayDiv);
            headingsDiv.appendChild(variablePayDiv);
            headingsDiv.appendChild(totalPayDiv);
            headingsDiv.appendChild(feedbackDiv);
            headingsDiv.appendChild(trackerDiv);

            cardBody.appendChild(projectDiv);
            cardBody.appendChild(headingsDiv);
        }

        for(let j=0; j<addTaskArray.length; j++) {

            let taskDiv = document.createElement("div");
            taskDiv.setAttribute("class","row align-items-center mt-1");

            let taskIdDiv = document.createElement("div");
            taskIdDiv.setAttribute("class","taskId");
            let taskIdContent = document.createElement("h6");
            taskIdContent.innerHTML += addTaskArray[j][0];
            taskIdDiv.appendChild(taskIdContent);

            let completedTaskDiv = document.createElement("div");
            completedTaskDiv.setAttribute("class","completedTask");
            let completedTaskContent = document.createElement("h6");
            completedTaskContent.innerHTML += addTaskArray[j][1];
            completedTaskDiv.appendChild(completedTaskContent);

            let fixedPayMaxDiv = document.createElement("div");
            fixedPayMaxDiv.setAttribute("class","fixedPayMax");
            let fixedPayMaxContent = document.createElement("h6");
            fixedPayMaxContent.innerHTML += addTaskArray[j][2];
            fixedPayMaxDiv.appendChild(fixedPayMaxContent);

            let variablePayMaxDiv = document.createElement("div");
            variablePayMaxDiv.setAttribute("class","variablePayMax");
            let variablePayMaxContent = document.createElement("h6");
            variablePayMaxContent.innerHTML += addTaskArray[j][3];
            variablePayMaxDiv.appendChild(variablePayMaxContent);
            
            let fixedPayDiv = document.createElement("div");
            fixedPayDiv.setAttribute("class","fixedPayActual");
            let fixedPayContent = document.createElement("input");
            fixedPayContent.setAttribute("type","text");
            fixedPayContent.setAttribute("class","form-control");
            fixedPayContent.setAttribute("placeholder","Fixed Payout");
            fixedPayDiv.appendChild(fixedPayContent);

            let variablePayDiv = document.createElement("div");
            variablePayDiv.setAttribute("class","variablePayActual");
            let variablePayContent = document.createElement("input");
            variablePayContent.setAttribute("type","text");
            variablePayContent.setAttribute("class","form-control");
            variablePayContent.setAttribute("placeholder","Variable Payout");
            variablePayDiv.appendChild(variablePayContent);

            let totalPayDiv = document.createElement("div");
            totalPayDiv.setAttribute("class","totalPay");
            let totalPayButton = document.createElement("button");
            totalPayButton.setAttribute("class", "btn calculatorButton");
            totalPayButton.setAttribute("onclick","totalPayCalculation()");
            let buttonLogo = document.createElement("i");
            buttonLogo.setAttribute("class","bi bi-calculator");
            totalPayButton.appendChild(buttonLogo);
            let totalPayContent = document.createElement("h6");
            totalPayContent.setAttribute("style","display: inline;")
            totalPayContent.setAttribute("class","ml-1")
            totalPayContent.innerHTML = "0";
            totalPayDiv.appendChild(totalPayButton);
            totalPayDiv.appendChild(totalPayContent);

            let feedbackDiv = document.createElement("div");
            feedbackDiv.setAttribute("class","feedback");
            let feedbackContent = document.createElement("input");
            feedbackContent.setAttribute("type","text");
            feedbackContent.setAttribute("class","form-control");
            feedbackContent.setAttribute("placeholder","Feedback");
            feedbackDiv.appendChild(feedbackContent);

            let trackerDiv = document.createElement("div");
            trackerDiv.setAttribute("class","tracker");
            let trackerContent = document.createElement("button");
            trackerContent.setAttribute("class","btn btn-primary");
            trackerContent.setAttribute("onclick","")
            trackerContent.innerHTML += "Update";
            trackerDiv.appendChild(trackerContent);

            taskDiv.appendChild(taskIdDiv);
            taskDiv.appendChild(completedTaskDiv);
            taskDiv.appendChild(fixedPayMaxDiv);
            taskDiv.appendChild(variablePayMaxDiv);
            taskDiv.appendChild(fixedPayDiv);
            taskDiv.appendChild(variablePayDiv);
            taskDiv.appendChild(totalPayDiv);
            taskDiv.appendChild(feedbackDiv);
            taskDiv.appendChild(trackerDiv);

            cardBody.appendChild(taskDiv);
        }
    }
}

async function makeApiCallPayouts() {
    
    var params1 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Delivery!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    let deliveryArray = request1.result.values;

    var params2 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Team!A2:Z1000',
    };

    var request2 = await gapi.client.sheets.spreadsheets.values.get(params2);
    let teamArray = request2.result.values;

    var params3 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Projects!A2:Z1000',
    };

    var request3 = await gapi.client.sheets.spreadsheets.values.get(params3);
    let projectsArray = request3.result.values;

    for(let i=0; i<teamArray.length; i++) {
        createPayouts(teamArray[i], projectsArray, deliveryArray, i+1);
    }
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
        let signInButton = document.getElementById("singinPayouts");
        signInButton.style.backgroundColor = "#f1f1f1";
        signInButton.style.borderColor = "black";
        signInButton.style.borderWidth = "2px";
        signInButton.style.color = "black";
        signInButton.innerHTML = "<b>Signed In</b>";

        makeApiCallPayouts();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}