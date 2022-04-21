var delivery = [];
var projects = [];

function displayYearlyView(year, projects, delivery) {
  let revenue = 0.0;
  let value = 0.0;
  let cost = 0.0;

  for (let i = 0; i < projects.length; i++) {
    let dateAwarded = projects[i][1];

    let date = dateAwarded.split("/");
    let month = date[1];

    if (
      (month <= 12 && month >= 4 && year == date[2]) ||
      (month <= 3 && month >= 1 && year + 1 == date[2])
    ) {
      value += parseFloat(projects[i][7]);
      revenue += parseFloat(projects[i][9]);

      for (let j = 0; j < delivery.length; j++) {
        console.log(delivery[j]);
        if (delivery[j][0] == projects[i][0]) {
          if (delivery[j][11] != "") cost += parseFloat(delivery[j][11]);
          else
            cost +=
              parseFloat(delivery[j][6]) +
              (parseFloat(delivery[j][6]) * parseFloat(delivery[j][7])) / 100.0;
        }
      }
    }
  }

  var tableBody = document.getElementById("projectsYearlyViewTable");
  var tableRow = document.createElement("tr");

  var finYear = document.createElement("td");
  var projectsValue = document.createElement("td");
  var projectRevenue = document.createElement("td");
  var projectCost = document.createElement("td");
  var profit = document.createElement("td");
  var profitPercentage = document.createElement("td");

  let str = "";
  str += year;
  year++;
  str += "-";
  str += year;

  finYear.innerHTML = str;
  projectsValue.innerHTML = value.toFixed(1);
  projectRevenue.innerHTML = revenue.toFixed(1);
  projectCost.innerHTML = cost.toFixed(1);
  profit.innerHTML = (revenue - cost).toFixed(1);

  if (((revenue - cost) / revenue) * 100.0 !== NaN && revenue != 0)
    profitPercentage.innerHTML = (((revenue - cost) / revenue) * 100.0).toFixed(
      1
    );
  else profitPercentage.innerHTML = (0).toFixed(1);

  tableRow.appendChild(finYear);
  tableRow.appendChild(projectsValue);
  tableRow.appendChild(projectRevenue);
  tableRow.appendChild(projectCost);
  tableRow.appendChild(profit);
  tableRow.appendChild(profitPercentage);
  tableBody.appendChild(tableRow);
}

async function reportsYearlyView(projects, delivery) {
  // paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Projects!A2:Z1000',
  // };

  // projects = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // projects = projects.result.values;

  // paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Delivery!A2:Z1000',
  // };

  // delivery = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // delivery = delivery.result.values;

  var d = new Date();
  end = d.getFullYear();
  end = parseInt(end);

  var start = 2020;

  for (let i = end; i >= start; i--) {
    let year = i;

    displayYearlyView(year, projects, delivery);
  }
}

function displayQuarterlyView(num, year, projects, delivery) {
  let todayDate = new Date();
  let m = todayDate.getMonth();
  m = parseInt(m) + 1;
  let y = todayDate.getFullYear();
  y = parseInt(y);

  let revenue = 0.0;
  let value = 0.0;
  let cost = 0.0;

  let first = -1;
  let second = -1;
  let third = -1;

  if (num == 1) {
    first = 4;
    second = 5;
    third = 6;
  } else if (num == 2) {
    first = 7;
    second = 8;
    third = 9;
  } else if (num == 3) {
    first = 10;
    second = 11;
    third = 12;
  } else if (num == 4) {
    first = 1;
    second = 2;
    third = 3;
  }

  if (year < y) {
  } else if (year == y) {
    if (num <= 3) {
      if (m >= first || m >= second || m >= third) {
      } else {
        return;
      }
    } else {
      if (m == first || m == second || m == third) {
      } else {
        return;
      }
    }
  } else {
    return;
  }

  for (let i = 0; i < projects.length; i++) {
    let dateAwarded = projects[i][1];
    let date = dateAwarded.split("/");
    let month = date[1];
    if (
      ((num == 4 && year + 1 == date[2]) || (num != 4 && year == date[2])) &&
      (month == first || month == second || month == third)
    ) {
      revenue += parseFloat(projects[i][9]);
      value += parseFloat(projects[i][7]);

      for (let j = 0; j < delivery.length; j++) {
        if (projects[i][0] == delivery[j][0]) {
          if (delivery[j][11] != "") cost += parseFloat(delivery[j][11]);
          else
            cost +=
              parseFloat(delivery[j][6]) +
              (parseFloat(delivery[j][6]) * parseFloat(delivery[j][7])) / 100.0;
        }
      }
    }
  }

  var tableBody = document.getElementById("projectsQuarterlyViewTable");

  var tableRow = document.createElement("tr");

  var finYear = document.createElement("td");
  var quarter = document.createElement("td");
  var projectsValue = document.createElement("td");
  var projectRevenue = document.createElement("td");
  var projectCost = document.createElement("td");
  var profit = document.createElement("td");
  var profitPercentage = document.createElement("td");

  let str = "";
  str += year;
  year++;
  str += "-";
  str += year;

  finYear.innerHTML = str;
  quarter.innerHTML = "Q" + num;
  projectsValue.innerHTML = value.toFixed(1);
  projectRevenue.innerHTML = revenue.toFixed(1);
  projectCost.innerHTML = cost.toFixed(1);
  profit.innerHTML = (revenue - cost).toFixed(1);

  if ((((revenue - cost) / revenue) * 100.0).toFixed(1) != NaN && revenue != 0)
    profitPercentage.innerHTML = (((revenue - cost) / revenue) * 100.0).toFixed(
      1
    );
  else profitPercentage.innerHTML = (0).toFixed(1);

  tableRow.appendChild(finYear);
  tableRow.appendChild(quarter);
  tableRow.appendChild(projectsValue);
  tableRow.appendChild(projectRevenue);
  tableRow.appendChild(projectCost);
  tableRow.appendChild(profit);
  tableRow.appendChild(profitPercentage);
  tableBody.appendChild(tableRow);
}

async function reportsQuarterlyView(projects, delivery) {
  // var paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Projects!A2:Z1000',
  // };

  // var projects = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // projects = projects.result.values;

  // paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Delivery!A2:Z1000',
  // };

  // var delivery = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // delivery = delivery.result.values;

  var d = new Date();
  end = d.getFullYear();
  end = parseInt(end);

  var start = 2020;

  for (let i = end; i >= start; i--) {
    let year = i;
    for (let j = 4; j >= 1; j--) {
      displayQuarterlyView(j, year, projects, delivery);
    }
  }
}

function displayMonthlyView(thisMonth, monthArray, delivery, projects) {
  let cost = 0.0;
  let revenue = 0.0;
  let value = 0.0;

  for (let i = 0; i < projects.length; i++) {
    let projectMonth = projects[i][1];
    let projectsMonth = projectMonth.substring(3);

    if (projectsMonth == thisMonth) {
      for (let j = 0; j < delivery.length; j++) {
        if (projects[i][0] == delivery[j][0]) {
          if (delivery[j][11] != "") {
            cost += parseFloat(delivery[j][11]);
          } else {
            cost +=
              parseFloat(delivery[j][6]) +
              (parseFloat(delivery[j][6]) * parseFloat(delivery[j][7])) / 100.0;
          }
        }
      }
    }
  }

  for (let i = 0; i < projects.length; i++) {
    let projectMonth = projects[i][1];
    let projectsMonth = projectMonth.substring(3);

    if (projectsMonth == thisMonth) {
      revenue += parseFloat(projects[i][9]);
      value += parseFloat(projects[i][7]);
    }
  }

  var tableBody = document.getElementById("projectsMonthlyViewTable");

  var tableRow = document.createElement("tr");

  var month = document.createElement("td");
  var projectValue = document.createElement("td");
  var projectRevenue = document.createElement("td");
  var projectCost = document.createElement("td");
  var profit = document.createElement("td");
  var profitPercentage = document.createElement("td");

  let temp = thisMonth[0] + thisMonth[1];

  month.innerHTML =
    monthArray[temp - 1] +
    ", " +
    thisMonth[3] +
    thisMonth[4] +
    thisMonth[5] +
    thisMonth[6];
  projectValue.innerHTML = value.toFixed(1);
  projectRevenue.innerHTML = revenue.toFixed(1);
  projectCost.innerHTML = cost.toFixed(1);
  profit.innerHTML = (revenue - cost).toFixed(1);
  if ((((revenue - cost) / revenue) * 100.0).toFixed(1) != NaN && revenue != 0)
    profitPercentage.innerHTML = (((revenue - cost) / revenue) * 100.0).toFixed(
      1
    );
  else profitPercentage.innerHTML = (0).toFixed(1);

  tableRow.appendChild(month);
  tableRow.appendChild(projectValue);
  tableRow.appendChild(projectRevenue);
  tableRow.appendChild(projectCost);
  tableRow.appendChild(profit);
  tableRow.appendChild(profitPercentage);
  tableBody.appendChild(tableRow);
}

async function reportsMonthlyView(projects, delivery) {
  // var paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Projects!A2:Z1000',
  // };

  // var projects = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // projects = projects.result.values;

  // paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Delivery!A2:Z1000',
  // };

  // var delivery = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // delivery = delivery.result.values;

  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let startDate = "01/06/2020";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;

  if (mm < 10) mm = "0" + mm;

  var endDate = dd + "/" + mm + "/" + yyyy;

  var start = startDate.split("/");
  var end = endDate.split("/");
  var startYear = parseInt(start[2]);
  var endYear = parseInt(end[2]);
  var dates = [];

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? "0" + month : month;
      dates.push([displayMonth, i].join("/"));
    }
  }
  
  for (let i =dates.length-1 ; i>=0; i--) {
    displayMonthlyView(dates[i], monthArray, delivery, projects);
  }
}

function displayProjects(arr, deliveryArray) {
  var tableBody = document.getElementById("projectTableBody");

  var tableRow = document.createElement("tr");
  var id = document.createElement("td");
  var dateAwarded = document.createElement("td");
  var projectType = document.createElement("td");
  var clientName = document.createElement("td");
  var projectName = document.createElement("td");
  var value = document.createElement("td");
  var feesRate = document.createElement("td");
  var revenue = document.createElement("td");
  var cost = document.createElement("td");
  var profit = document.createElement("td");
  var profitPercentage = document.createElement("td");

  id.innerHTML = arr[0];
  dateAwarded.innerHTML = arr[1];
  projectType.innerHTML = arr[5];
  clientName.innerHTML = arr[2];
  projectName.innerHTML = arr[3];
  value.innerHTML = arr[7];
  feesRate.innerHTML = arr[8];
  revenue.innerHTML = arr[9];

  let totalCost = 0.0;

  for (let i = 0; i < deliveryArray.length; i++) {
    if (deliveryArray[i][0] == arr[0] && deliveryArray[i][11] != "") {
      totalCost += parseFloat(deliveryArray[i][11]);
    } else if (deliveryArray[i][0] == arr[0] && deliveryArray[i][11] == "") {
      totalCost +=
        parseFloat(deliveryArray[i][6]) +
        (parseFloat(deliveryArray[i][6]) * parseFloat(deliveryArray[i][7])) /
          100.0;
    }
  }

  cost.innerHTML = totalCost;
  profit.innerHTML = parseFloat(arr[9]) - totalCost;
  let temp = 0.0;
  temp += ((parseFloat(arr[9]) - totalCost) / parseFloat(arr[9])) * 100.0;

  if (temp.toFixed(1) != NaN && parseFloat(arr[9]) != 0)
    profitPercentage.innerHTML = temp.toFixed(1);
  else profitPercentage.innerHTML = (0).toFixed(1);

  tableRow.appendChild(id);
  tableRow.appendChild(dateAwarded);
  tableRow.appendChild(projectType);
  tableRow.appendChild(clientName);
  tableRow.appendChild(projectName);
  tableRow.appendChild(value);
  tableRow.appendChild(feesRate);
  tableRow.appendChild(revenue);
  tableRow.appendChild(cost);
  tableRow.appendChild(profit);
  tableRow.appendChild(profitPercentage);

  tableBody.appendChild(tableRow);
}

async function fetchProjectData(projects, delivery) {
  // var paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Projects!A2:Z1000',
  // };

  // projects = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // projects = projects.result.values;

  // paramsDelivery = {
  //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
  //     range: 'Delivery!A2:Z1000',
  // };

  // delivery = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
  // delivery = delivery.result.values;

  for (let i = projects.length-1; i >=0; i--) {
    displayProjects(projects[i], delivery);
  }
}

function displayEarningsPerformance(arr, delivery, projects) {
  let projectsArray = projects;
  let projectsDone = 0;
  let earnings = 0.0;
  let earningsMax = 0.0;
  let performance = 0.0;

  for (let j = 0; j < delivery.length; j++) {
    if (delivery[j][4] == arr[0]) {
      if (delivery[j][11] != "") {
        earnings += parseFloat(delivery[j][11]);
        earningsMax +=
          parseFloat(delivery[j][6]) +
          (parseFloat(delivery[j][6]) * parseFloat(delivery[j][7])) / 100.0;
      }
    }
  }

  if (earningsMax != 0) performance = (earnings / earningsMax) * 100.0;

  for (let i = 0; i < projectsArray.length; i++) {
    projectsArray[i] = [projects[i][0], 0];
  }

  for (let j = 0; j < delivery.length; j++) {
    if (delivery[j][4] == arr[0]) {
      for (let i = 0; i < projectsArray.length; i++) {
        if (
          projectsArray[i][0] == delivery[j][0] &&
          delivery[j][8] == "Completed"
        ) {
          projectsArray[i][1] += 1;
        }
      }
    }
  }

  for (let i = 0; i < projectsArray.length; i++) {
    if (projectsArray[i][1] > 0) {
      projectsDone += 1;
    }
  }

  var tableBody = document.getElementById("teamEarningsTable");

  var tableRow = document.createElement("tr");
  var member = document.createElement("td");
  var memberProjects = document.createElement("td");
  var memberEarnings = document.createElement("td");
  var memberPerformance = document.createElement("td");

  member.innerHTML = arr[0];
  memberProjects.innerHTML = projectsDone;
  memberEarnings.innerHTML = earnings.toFixed(1);
  memberPerformance.innerHTML = performance.toFixed(1);

  tableRow.appendChild(member);
  tableRow.appendChild(memberProjects);
  tableRow.appendChild(memberEarnings);
  tableRow.appendChild(memberPerformance);
  tableBody.appendChild(tableRow);
}

function reportsEarningsPerformance(team, delivery, projects) {
  for (let i = 0; i < team.length; i++) {
    displayEarningsPerformance(team[i], delivery, projects);
  }
}

function noOfDays(dates1, dates2) {
  let date1 = dates1.split("/");
  let date2 = dates2.split("/");

  // console.log(date1);
  // console.log(date2);

  date1 = new Date(date1[2], date1[1], date1[0]);
  date2 = new Date(date2[2], date2[1], date2[0]);

  // console.log(date1);
  // console.log(date2);

  date1_unixtime = parseFloat(date1.getTime() / 1000);
  date2_unixtime = parseFloat(date2.getTime() / 1000);

  // console.log(date1_unixtime);
  // console.log(date2_unixtime);

  var timeDifference = date2_unixtime - date1_unixtime;

  // console.log(timeDifference);

  var timeDifferenceInHours = timeDifference / 60 / 60;

  var timeDifferenceInDays = timeDifferenceInHours / 24;

  // console.log(timeDifferenceInDays);
  // console.log(timeDifferenceInHours);

  return timeDifferenceInDays + 1;
}

function displayLeverage(arr, delivery, projects) {
  let leverage = 0.0;
  let projectDays = 0.0;

  let totalDays = 0.0;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;

  if (mm < 10) mm = "0" + mm;

  var endDate = "";
  endDate = dd + "/" + mm + "/" + yyyy;
  let startDate = arr[16];
  totalDays = noOfDays(startDate, endDate);

  let dateArray = [];

  for (let j = 0; j < delivery.length; j++) {
    if (delivery[j][4] == arr[0]) {
      let temp = [];
      temp.push(delivery[j][15]);

      if (delivery[j][16] == undefined) {
        temp.push(endDate);
      } else {
        temp.push(delivery[j][16]);
      }

      dateArray.push(temp);
    }
  }

  dateArray.sort(function (a, b) {
    return a[0] - b[0];
  });

  let start = "01/06/2020";
  let end = "01/06/2020";

  if (dateArray.length > 0) {
    start = dateArray[0][0];
    end = dateArray[0][1];
  }

  projectDays += noOfDays(start, end);

  if (dateArray.length == 0) projectDays = 0;

  for (let i = 1; i < dateArray.length; i++) {
    let tempStart = dateArray[i][0];
    let tempEnd = dateArray[i][1];

    let flag = noOfDays(tempStart, end);
    if (flag >= 0) {
      let flag1 = noOfDays(tempEnd, end);
      if (flag1 >= 0) {
      } else {
        projectDays += noOfDays(end, tempEnd);
        end = tempEnd;
      }
    } else {
      start = tempStart;
      end = tempEnd;

      projectDays += noOfDays(start, end);
    }
  }

  var tableBody = document.getElementById("leverageTable");

  var tableRow = document.createElement("tr");
  var member = document.createElement("td");
  var memberProjectDays = document.createElement("td");
  var memberNonProjectDays = document.createElement("td");
  var memberLeverage = document.createElement("td");

  member.innerHTML = arr[0];
  memberProjectDays.innerHTML = projectDays;
  memberNonProjectDays.innerHTML = totalDays - projectDays;
  memberLeverage.innerHTML = ((projectDays / totalDays) * 100.0).toFixed(1);

  tableRow.appendChild(member);
  tableRow.appendChild(memberProjectDays);
  tableRow.appendChild(memberNonProjectDays);
  tableRow.appendChild(memberLeverage);
  tableBody.appendChild(tableRow);
}

function reportsLeverage(team, delivery, projects) {
  for (let i = 0; i < team.length; i++) {
    displayLeverage(team[i], delivery, projects);
  }
}

function displayPayoutsMonthly(thisMonth, monthArray, payouts) {
  let revenue = 0.0;

  for (let i = 0; i < payouts.length; i++) {
    let projectMonth = payouts[i][0];
    let projectsMonth = projectMonth.substring(3);

    if (projectsMonth == thisMonth) {
      revenue += parseFloat(payouts[i][2]);
    }
  }

  var tableBody = document.getElementById("payoutMonthlyTable");

  var tableRow = document.createElement("tr");
  var month = document.createElement("td");
  var payoutsRevenue = document.createElement("td");

  let temp = thisMonth[0] + thisMonth[1];

  month.innerHTML =
    monthArray[temp - 1] +
    ", " +
    thisMonth[3] +
    thisMonth[4] +
    thisMonth[5] +
    thisMonth[6];
  payoutsRevenue.innerHTML = revenue.toFixed(1);

  tableRow.appendChild(month);
  tableRow.appendChild(payoutsRevenue);
  tableBody.appendChild(tableRow);
}

function payoutsMonthlyView(payouts) {
  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let startDate = "01/06/2020";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;

  if (mm < 10) mm = "0" + mm;

  var endDate = dd + "/" + mm + "/" + yyyy;

  var start = startDate.split("/");
  var end = endDate.split("/");
  var startYear = parseInt(start[2]);
  var endYear = parseInt(end[2]);
  var dates = [];

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? "0" + month : month;
      dates.push([displayMonth, i].join("/"));
    }
  }

  for (let i = 0; i < dates.length; i++) {
    displayPayoutsMonthly(dates[i], monthArray, payouts);
  }
}

function displayPayoutsQuarterlyView(num, year, payouts) {
  let todayDate = new Date();
  let m = todayDate.getMonth();
  m = parseInt(m) + 1;
  let y = todayDate.getFullYear();
  y = parseInt(y);

  let first = -1;
  let second = -1;
  let third = -1;

  if (num == 1) {
    first = 4;
    second = 5;
    third = 6;
  } else if (num == 2) {
    first = 7;
    second = 8;
    third = 9;
  } else if (num == 3) {
    first = 10;
    second = 11;
    third = 12;
  } else if (num == 4) {
    first = 1;
    second = 2;
    third = 3;
  }

  if (year < y) {
  } else if (year == y) {
    if (num <= 3) {
      if (m >= first || m >= second || m >= third) {
      } else {
        return;
      }
    } else {
      if (m == first || m == second || m == third) {
      } else {
        return;
      }
    }
  } else {
    return;
  }

  let revenue = 0.0;

  for (let i = 0; i < payouts.length; i++) {
    let dateAwarded = payouts[i][0];
    let date = dateAwarded.split("/");
    let month = date[1];
    if (
      ((num == 4 && year + 1 == date[2]) || (num != 4 && year == date[2])) &&
      (month == first || month == second || month == third)
    ) {
      revenue += parseFloat(payouts[i][2]);
    }
  }

  var tableBody = document.getElementById("payoutQuarterlyTable");

  var tableRow = document.createElement("tr");

  var finYear = document.createElement("td");
  var quarter = document.createElement("td");
  var projectRevenue = document.createElement("td");

  let str = "";
  str += year;
  year++;
  str += "-";
  str += year;

  finYear.innerHTML = str;
  quarter.innerHTML = "Q" + num;
  projectRevenue.innerHTML = revenue.toFixed(1);

  tableRow.appendChild(finYear);
  tableRow.appendChild(quarter);
  tableRow.appendChild(projectRevenue);
  tableBody.appendChild(tableRow);
}

function payoutsQuarterlyView(payouts) {
  var d = new Date();
  end = d.getFullYear();
  end = parseInt(end);

  var start = 2020;

  for (let i = start; i <= end; i++) {
    let year = i;
    for (let j = 1; j <= 4; j++) {
      displayPayoutsQuarterlyView(j, year, payouts);
    }
  }
}

function displayPayoutsYearlyView(year, payouts) {
  let revenue = 0.0;

  for (let i = 0; i < payouts.length; i++) {
    let dateAwarded = payouts[i][0];

    let date = dateAwarded.split("/");
    let month = date[1];

    if (
      (month <= 12 && month >= 4 && year == date[2]) ||
      (month <= 3 && month >= 1 && year + 1 == date[2])
    ) {
      revenue += parseFloat(payouts[i][2]);
    }
  }

  var tableBody = document.getElementById("payoutYearlyTable");
  var tableRow = document.createElement("tr");

  var finYear = document.createElement("td");
  var projectRevenue = document.createElement("td");

  let str = "";
  str += year;
  year++;
  str += "-";
  str += year;

  finYear.innerHTML = str;
  projectRevenue.innerHTML = revenue.toFixed(1);

  tableRow.appendChild(finYear);
  tableRow.appendChild(projectRevenue);
  tableBody.appendChild(tableRow);
}

function payoutsYearlyView(payouts) {
  var d = new Date();
  end = d.getFullYear();
  end = parseInt(end);

  var start = 2020;

  for (let i = start; i <= end; i++) {
    let year = i;
    displayPayoutsYearlyView(year, payouts);
  }
}

//Authentication functions used for this app

$(document).ready(function () {
  $(".signoutButton").click(function () {
    location.reload();
  });
});

function initClient() {
  var API_KEY = "AIzaSyA5iKpQ3DJ66zFJGsQCaNV8lF7dv0alyAw";
  var CLIENT_ID =
    "1080657069033-jcl8n4ojl14fvofuq9qh1esfog3g0piq.apps.googleusercontent.com";
  var SCOPE = "https://www.googleapis.com/auth/spreadsheets";

  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
    })
    .then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

async function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    let signInButton = document.getElementById("reportsSignIn");
    signInButton.style.backgroundColor = "#f1f1f1";
    signInButton.style.borderColor = "black";
    signInButton.style.borderWidth = "2px";
    signInButton.style.color = "black";
    signInButton.innerHTML = "<b>Signed In</b>";

    paramsDelivery = {
      spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
      range: "Projects!A2:Z1000",
    };

    let projects = await gapi.client.sheets.spreadsheets.values.get(
      paramsDelivery
    );
    projects = projects.result.values;

    paramsDelivery = {
      spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
      range: "Delivery!A2:Z1000",
    };

    let delivery = await gapi.client.sheets.spreadsheets.values.get(
      paramsDelivery
    );
    delivery = delivery.result.values;

    paramsDelivery = {
      spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
      range: "Team!A2:Z1000",
    };

    let team = await gapi.client.sheets.spreadsheets.values.get(paramsDelivery);
    team = team.result.values;

    paramsDelivery = {
      spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
      range: "Payouts!A2:Z1000",
    };

    let payouts = await gapi.client.sheets.spreadsheets.values.get(
      paramsDelivery
    );
    payouts = payouts.result.values;
    // projects.sort(function(a, b) {

    //     return new Date(b[1]) - new Date(a[1]);

    // });
    reportsYearlyView(projects, delivery);
    reportsQuarterlyView(projects, delivery);
    reportsMonthlyView(projects, delivery);
    fetchProjectData(projects, delivery);

    reportsEarningsPerformance(team, delivery, projects);
    reportsLeverage(team, delivery, projects);

    payoutsYearlyView(payouts);
    payoutsQuarterlyView(payouts);
    payoutsMonthlyView(payouts);
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
