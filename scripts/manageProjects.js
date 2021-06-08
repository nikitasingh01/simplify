let teamArray = [];
let projectArray = [];
let deliveryArray = [];
async function getTeamArray() {
    var params = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Team!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params);
    request = request.result.values;
    
    for(let i=0; i<request.length; i++) {
        teamArray.push(request[i][0]);
    }
}

let idArray = [];
function addNewTask(id, taskName = "", dueDate = "", teamMember = "", fixedPay = "", variablePay = "", taskStatus = "") {
    idArray[id-1]++;

    let accordion = document.getElementById("collapse"+id);
    let cardbody = accordion.getElementsByClassName("card-body");

    let outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "row ml-1 mt-2 Row");
    outerDiv.setAttribute("id", idArray[id-1]);

    let taskIdDiv = document.createElement("div");
    taskIdDiv.setAttribute("class", "col-1 taskId");
    let taskIdNumber = document.createElement("h6");
    taskIdNumber.innerHTML = 1;
    taskIdDiv.appendChild(taskIdNumber);

    let taskNameDiv = document.createElement("div");
    taskNameDiv.setAttribute("class", "col-2");
    let taskNameInput = document.createElement("input");
    taskNameInput.setAttribute("type","text");
    taskNameInput.setAttribute("class","form-control taskNameClass");
    taskNameInput.setAttribute("placeholder","Task Name");
    taskNameInput.setAttribute("style","display: inline;");
    taskNameDiv.appendChild(taskNameInput);

    let datepickerDiv = document.createElement("div");
    datepickerDiv.setAttribute("class", "col-2 input-group date datepicker form-group");
    datepickerDiv.setAttribute("data-date-format", "dd-mm-yyyy");
    let datepickerInput = document.createElement("input");
    datepickerInput.setAttribute("type", "text");
    datepickerInput.setAttribute("placeholder", "dd-mm-yyyy");
    datepickerInput.setAttribute("class", "form-control datePickerClass");
    let datepickerSpan = document.createElement("span");
    datepickerSpan.setAttribute("class","input-group-addon");
    datepickerDiv.appendChild(datepickerInput);
    datepickerDiv.appendChild(datepickerSpan);

    let selectDiv = document.createElement("div");
    selectDiv.setAttribute("class", "col-2");
    let selectElement = document.createElement("select");
    selectElement.setAttribute("class","custom-select selectClass");
    selectDiv.appendChild(selectElement);

    let fixedPayDiv = document.createElement("div");
    fixedPayDiv.setAttribute("class", "col-2");
    let fixedPayInput = document.createElement("input");
    fixedPayInput.setAttribute("type","text");
    fixedPayInput.setAttribute("class","form-control fixedPayoutClass");
    fixedPayInput.setAttribute("placeholder","Fixed Payout");
    fixedPayInput.setAttribute("style","display: inline;");
    fixedPayDiv.appendChild(fixedPayInput);

    let variablePayDiv = document.createElement("div");
    variablePayDiv.setAttribute("class", "col");
    let variablePayInput = document.createElement("input");
    variablePayInput.setAttribute("type","text");
    variablePayInput.setAttribute("class","form-control variablePayoutClass");
    variablePayInput.setAttribute("placeholder","Variable Payout");
    variablePayInput.setAttribute("style","display: inline;");
    variablePayDiv.appendChild(variablePayInput);

    let checkBoxDiv = document.createElement("div");
    checkBoxDiv.setAttribute("class", "col row align-items-center");
    let checkBoxLabel = document.createElement("label");
    checkBoxLabel.setAttribute("class","ml-2 mr-2 switch toggleButton");
    let checkBoxinput = document.createElement("input");
    checkBoxinput.setAttribute("type","checkbox");
    checkBoxinput.setAttribute("class","checkboxClass");
    let checkBoxSpan = document.createElement("span");
    checkBoxSpan.setAttribute("class","slider round");
    checkBoxLabel.appendChild(checkBoxinput);
    checkBoxLabel.appendChild(checkBoxSpan);
    let heading = document.createElement("h6");
    heading.setAttribute("class","completedText");
    heading.innerHTML = "Completed";
    checkBoxDiv.appendChild(checkBoxLabel);
    checkBoxDiv.appendChild(heading);
    
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class","btn deleteButton");
    deleteButton.setAttribute("onclick","deleteTask(id)");
    let deleteLogo = document.createElement("i");
    deleteLogo.setAttribute("class","bi bi-trash cardIconManageProject");
    deleteButton.appendChild(deleteLogo);

    outerDiv.appendChild(taskIdDiv);
    outerDiv.appendChild(taskNameDiv);
    outerDiv.appendChild(datepickerDiv);
    outerDiv.appendChild(selectDiv);
    outerDiv.appendChild(fixedPayDiv);
    outerDiv.appendChild(variablePayDiv);
    outerDiv.appendChild(checkBoxDiv);
    outerDiv.appendChild(deleteButton);

    cardbody[0].appendChild(outerDiv);

    let arrList = cardbody[0].getElementsByClassName("Row");
    let countTask = arrList.length;

    let taskId = arrList[countTask-1].getElementsByClassName("taskId");
    let num = taskId[0].getElementsByTagName("h6");
    num[0].innerHTML = countTask;

    let selectOption = cardbody[0].getElementsByTagName("select");
    for(let i=0; i<teamArray.length; i++) {
        let option1 = document.createElement("option");
        option1.setAttribute("value", teamArray[i]);
        option1.innerHTML = teamArray[i];

        if(teamMember == teamArray[i]) {
            option1.setAttribute("selected", "selected");
        }

        selectOption[countTask-1].appendChild(option1);
    }

    taskNameInput.setAttribute("value", taskName);
    datepickerInput.setAttribute("value", dueDate);
    fixedPayInput.setAttribute("value", fixedPay);
    variablePayInput.setAttribute("value", variablePay);
    if(taskStatus === "Completed") {
        checkBoxinput.setAttribute("checked", true);    
    }
    selectOption[countTask-1].setAttribute("value", teamMember);

    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        changeMonth: true,
        changeYear: true,
        orientation: "button",
        clearBtn: true,
        todayBtn: "linked"
    });
}

function makeProject(projectId, projectName, count, deliveryArray) {
    idArray.push(0);
    let outerDiv = document.getElementById("outerDiv");

    outerDiv.innerHTML += `<div id="accordion`+ count +`" class="manageProjectContainer">
        <div class="card manageProjectCard">
            <div class="card-header d-flex" id="heading`+count+`">
                <a class="title col-7">
                    <h5 class="mb-0" data-toggle="collapse" data-target="#collapse`+count+`">
                    `+projectId+` : `+projectName+`  
                    </h5>
                </a>
                <div class="col-2">   
                </div>
                <div class="col-3 manageProjectsToggle d-flex">
                    <h6 class="ml-4 ongoingText">
                        Ongoing
                    </h6>
                    <label class="ml-2 mr-2 switch toggleButton">
                        <input type="checkbox" id="Toggle`+count+`">
                        <span class="slider round"></span>
                    </label>
                    <h6 class="completedText">
                        Completed
                    </h6>
                </div>
            </div>
    
            <div id="collapse`+count+`" class="collapse" aria-labelledby="heading`+count+`" data-parent="#accordion`+count+`">
                <div class="card-body">
                    <div class="row ml-3">
                        <button class="btn manageProjectAddTaskButton" id="`+count+`" onclick="addNewTask(id)">Add New Task</button>
                    </div>
                    <div class="row ml-1 mt-4">
                        <div class="col-1 taskId">
                            <h6>Task ID</h6>
                        </div>
                        <div class="col-2">
                            <h6>Task Name</h6>
                        </div>
                        <div class="col-2">
                            <h6>Due Date</h6>
                        </div>
                        <div class="col-2">
                            <h6>Team Member</h6>
                        </div>
                        <div class="col-2">
                            <h6>Fixed Payout</h6>
                        </div>
                        <div class="col">
                            <h6>Variable Payout</h6>
                        </div>
                        <div class="col">
                            <h6>Task Status</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    if(projectName == "ProjectBlank") {
        let elem = document.getElementById("accordion"+count);
        addNewTask(count,"","","","","","","");
        elem.style.visibility = "hidden";
    }
    

    for(let i=0; i<deliveryArray.length; i++) {
        if(deliveryArray[i][0] == projectId) {
            addNewTask(count, deliveryArray[i][3], deliveryArray[i][5], deliveryArray[i][4], deliveryArray[i][6], deliveryArray[i][7], deliveryArray[i][8]);
        }
    }
}

function saveProjectTasks() {
    obj = document.getElementById("manageProjectSaveButton");
    obj.style.backgroundColor = "#f1f1f1";
    obj.style.borderColor = "black";
    obj.style.color = "black";
    obj.innerHTML = "Saved <b>&#10003;</b>";
    setTimeout(function() {
        obj.style.backgroundColor = "#007bff";
        obj.innerHTML = "Save";
        obj.style.color = "white";
    }, 4000);

    let outerDiv = document.getElementById("outerDiv");
    let projects = outerDiv.getElementsByClassName("manageProjectContainer");
    
    let data = [];

    for(let i=0; i<projects.length-1; i++) {
        let idName = projects[i].getElementsByTagName("h5");
        idName = idName[0].innerText;

        let id = "";
        let name = "";

        let iterator = 0;
        while(idName[iterator] != " ") {
            id += idName[iterator];
            iterator++;
        }
        iterator+=3;
        while(iterator < idName.length) {
            name += idName[iterator];
            iterator++;
        }

        let taskData = projects[i].getElementsByClassName("Row");

        for(let j=0; j<taskData.length; j++) {
            let taskIdNum = taskData[j].getElementsByClassName("taskId");
            let taskNameClass = taskData[j].getElementsByClassName("taskNameClass");
            let datePickerClass = taskData[j].getElementsByClassName("datePickerClass");
            let selectClass = taskData[j].getElementsByClassName("selectClass");
            let fixedPayoutClass = taskData[j].getElementsByClassName("fixedPayoutClass");
            let variablePayoutClass = taskData[j].getElementsByClassName("variablePayoutClass");
            let checkboxClass = taskData[j].getElementsByClassName("checkboxClass");
        
            for(let k=0; k<taskIdNum.length; k++) {
                let temp = [];
                temp.push(id);
                temp.push(name);
                temp.push(taskIdNum[k].innerText);
                temp.push(taskNameClass[k].value);
                temp.push(selectClass[k].value);
                temp.push(datePickerClass[k].value);
                temp.push(fixedPayoutClass[k].value);
                temp.push(variablePayoutClass[k].value);
                if(checkboxClass[k].checked == true)
                    temp.push("Completed"); 
                else
                    temp.push("Ongoing");

                data.push(temp);
            }
        }
    }

    var params = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Delivery!A2',
        valueInputOption: "USER_ENTERED",
    };

    var valueRangeBody = {
        "majorDimension": "ROWS",
        "values": data,
    };

    var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    request.then(function(response) {
    }, function(reason) {
    console.error('error: ' + reason.result.error.message);
    });
}

async function makeApiCallManageProjects() {
    var params = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Projects!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params);
    projectArray = request.result.values;

    var params1 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Delivery!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    deliveryArray = request1.result.values;

    idArray = [];
    let count = 0;
    for(let i=0; i<projectArray.length+1; i++) {
        if(i == projectArray.length) {
            count++;
            makeProject(0, "ProjectBlank", count, deliveryArray);
        }
        else if(projectArray[i][10] == "Ongoing") {
            count++;
            makeProject(projectArray[i][0], projectArray[i][3], count, deliveryArray);
        }
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
        let signInButton = document.getElementById("manageProjectsSignIn");

        signInButton.style.backgroundColor = "#f1f1f1";
        signInButton.style.borderColor = "black";
        signInButton.style.borderWidth = "2px";
        signInButton.style.color = "black";
        signInButton.innerHTML = "<b>Signed In</b>";

        makeApiCallManageProjects();
        getTeamArray();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

