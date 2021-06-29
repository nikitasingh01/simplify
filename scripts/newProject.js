async function makeApiCallHelperSheet() {
    var params1 = {
        spreadsheetId: '1_pUO34inYV81KGTy-DFZsr7rLtpTewd7tZuL_g9EwHA', 
        range: 'Project Type!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);

    let projectType = [];

    if(request1.result.values != undefined) 
        projectType = request1.result.values;

    var params2 = {
        spreadsheetId: '1_pUO34inYV81KGTy-DFZsr7rLtpTewd7tZuL_g9EwHA', 
        range: 'Contract Type!A2:Z1000',
    };

    var request2 = await gapi.client.sheets.spreadsheets.values.get(params2);

    let contractType = [];

    if(request2.result.values != undefined) 
        contractType = request2.result.values;

    let projectTypeDiv = document.getElementById("projectTypeSelect");
    for(let i=0; i<projectType.length; i++) {
        if(projectType[i] !== "") {
            let options = document.createElement("option");
            options.innerHTML = projectType[i];

            projectTypeDiv.appendChild(options);
        }
    }

    let contractTypeDiv = document.getElementById("contractTypeSelect");
    for(let i=0; i<contractType.length; i++) {
        if(contractType[i] !== "") {
            let options = document.createElement("option");
            options.innerHTML = contractType[i];

            contractTypeDiv.appendChild(options);
        }
    }
}

var clientArrayForSuggestions = [];
let clientArrayAutoFill = [];

async function makeApiCallTotalProjectValue() {
    let clientArray = [];
    var params1 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Clients!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    if(request1.result.values != undefined) {
        clientArray = request1.result.values;
        clientArrayAutoFill = clientArray;
    }

    var params2 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Projects!A2:Z1000',
    };

    var request2 = await gapi.client.sheets.spreadsheets.values.get(params2);
    var projectArray = [];
    if(request2.result.values != undefined) 
        projectArray = request2.result.values;

    for(let i=0; i<clientArray.length; i++) {
        let totalValue = 0;
        for(let j=0; j<projectArray.length; j++) {
            if(clientArray[i][1] === projectArray[j][2]) {
                totalValue += parseInt(projectArray[j][7]);
            }
        }

        clientArrayForSuggestions.push(clientArray[i][1]);
        if(totalValue != "0")
            clientArray[i][4] = totalValue;
    }

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
    }, function(reason) {
    console.error('error: ' + reason.result.error.message);
    });
}

async function feesRateCalculation() {
    let feeRate = 0.0;
    var params1 = {
        spreadsheetId: '1_pUO34inYV81KGTy-DFZsr7rLtpTewd7tZuL_g9EwHA', 
        range: 'Fees Rate!A4:Z1000',
    };
    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    var regularContractFeesRate = request1.result.values;

    var params2 = {
        spreadsheetId: '1_pUO34inYV81KGTy-DFZsr7rLtpTewd7tZuL_g9EwHA', 
        range: 'Fees Rate!E3',
    };
    var request2 = await gapi.client.sheets.spreadsheets.values.get(params2);
    var directContractFeesRate = request2.result.values;

    var clientName = document.getElementById("clientName").value;
    var projectValue = document.getElementById("projectValue").value;
    if(projectValue === "")
        projectValue = "0";
    var contractTypeSelect = document.getElementById("contractTypeSelect").value;

    var totalProjectValue = 0;
    var params3 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Projects!A2:Z1000',
    };

    var request3 = await gapi.client.sheets.spreadsheets.values.get(params3);
    var projectArray = [];
    if(request3.result.values != undefined) 
        projectArray = request3.result.values;

    for(var i=0; i<projectArray.length; i++) {
        if(projectArray[i][2] == clientName) {
            totalProjectValue += parseInt(projectArray[i][7]);
        }
    }
    var totalProjectValueBofore = 0;
    totalProjectValueBofore += totalProjectValue;
    totalProjectValue += parseInt(projectValue);
    var totalProjectSum = 0.0;
    var first = 0;
    var last = 0;
    if(contractTypeSelect === "Regular Contract") {
        var i=0;
        while(totalProjectValueBofore >= parseInt(regularContractFeesRate[i][1])) {
            i++;
        }
        first = i;
        regularContractFeesRate[i][0] = totalProjectValueBofore;

        while(totalProjectValue > regularContractFeesRate[i][1]) {
            i++;
        }
        regularContractFeesRate[i][1] = totalProjectValue;
        last = i;

        while(first <= last) {
            totalProjectSum += (parseInt(regularContractFeesRate[first][1]) - parseInt(regularContractFeesRate[first][0]))*parseInt(regularContractFeesRate[first][2])/100.0;
            first++;
        }
        console.log(totalProjectSum);
        
        var val = (totalProjectSum/(projectValue))*100.0;
        feeRate += val;
        document.getElementById("feesRate").value = val.toFixed(1) + "%";
    } else if(contractTypeSelect === "Direct Contract") {
        document.getElementById("feesRate").value = directContractFeesRate[0];
    }

    let projValue = document.getElementById("projectValue").value;
    projValue = parseInt(projValue);
    let exchangeRate = document.getElementById("exchangeRate").value;
    exchangeRate = parseInt(exchangeRate);

    console.log(projValue);
    console.log(feeRate);
    console.log(exchangeRate);
    let num = 0.0;
    num += (projValue*(100.0 - feeRate)*exchangeRate)/100.0;
    console.log(num);

    document.getElementById("expectedRevenue").value = num;
}

async function saveNewProject(id) {
    let clientArray = [];

    var params1 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Clients!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params1);

    if(request.result.values != undefined) 
        clientArray = request.result.values;

    var params2 = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Projects!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params2);
    var projectArray = [];
    if(request1.result.values != undefined) 
        projectArray = request1.result.values;

    var projectId = projectArray[projectArray.length-1][0];
    var clientName = document.getElementById("clientName").value;
    var contactPerson = document.getElementById("contactPerson").value;
    var clientCountry = document.getElementById("clientCountry").value;

    var rating = "";
    if(document.getElementById("rating").value !== "")
        rating = document.getElementById("rating").value;

    projectId = parseInt(projectId) + parseInt("1");
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
            let totalSum = 0;

            for(let j=0; j<projectArray.length; j++) {
                if(projectArray[j][2] === clientName) {
                    totalSum += parseInt(projectArray[j][7]);
                }
            }

            totalSum += parseInt(projectValue);
            clientArray[i][4] = totalSum;

            if(rating !== "") {
                clientArray[i][3] = rating;
            }

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
        obj = document.getElementById(id);
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
        obj = document.getElementById(id);
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

   if(id=="newProjectSaveManage") {
        window.location.href='./manageProjects.html';
   }
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.setAttribute("onclick", "autoFill()");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function autoFill() {
    var clientName = document.getElementById("clientName").value;
    var flag = true;

    for(var i=0; i<clientArrayAutoFill.length; i++) {
        if(clientArrayAutoFill[i][1] == clientName) {
            flag = false;
            document.getElementById("contactPerson").value = clientArrayAutoFill[i][2];
            document.getElementById("clientCountry").value = clientArrayAutoFill[i][0];
            document.getElementById("rating").value = clientArrayAutoFill[i][3];
        }
    }

    if(flag == true) {
        document.getElementById("contactPerson").value = "";
        document.getElementById("clientCountry").value = "";
        document.getElementById("rating").value = "";   
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
        makeApiCallHelperSheet();
        makeApiCallTotalProjectValue();

        let signInButton = document.getElementById("newProjectSignInButton");

        signInButton.style.backgroundColor = "#f1f1f1";
        signInButton.style.borderColor = "black";
        signInButton.style.borderWidth = "2px";
        signInButton.style.color = "black";
        signInButton.innerHTML = "<b>Signed In</b>";
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

autocomplete(document.getElementById("clientName"), clientArrayForSuggestions);
