var records = []
var shownRecords = []

$(document).ready(function () {

    // prepare page content
    $("#incomePlaceholder").html(addIncomePopup());
    $("#outcomePlaceholder").html(addOutcomePopup());

    $.get("http://localhost:7777/api/budget", function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        records = data;
        shownRecords = records
        refreshTable(shownRecords)
    });

    $('#incomeDropdown li').click(function () {
        $('#categoryButton-income').text($(this).text());
    });

    $('#outcomeDropdown li').click(function () {
        $('#categoryButton-outcome').text($(this).text());
    });

    $('#incomeButton').click(function () {
        var todayDate = new Date().toJSON().slice(0, 10)
        document.getElementById("income-date").value = todayDate;

        $('#categoryButton-income').text('Any');
        $('#betrag-value-income').val('0,00');
        $('#memo-note-income').val('');
        $('#alert-dialog-income').hide();
    });

    $('#outcomeButton').click(function () {
        var todayDate = new Date().toJSON().slice(0, 10)
        document.getElementById("outcome-date").value = todayDate;

        $('#categoryButton-outcome').text('Any');
        $('#betrag-value-outcome').val('0,00');
        $('#memo-note-outcome').val('');
        $('#alert-dialog-outcome').hide();
    });

});


function refreshTable(data) {
    $("#table").html(loaddata(data));
}

function getTransactionIcone(type) {
    if (type == "income") {
        return '➕'
    } else {
        return '➖'
    }
}

function loaddata(data) {
    var tableHeader = `<table class="table table-striped" id="sortTable">
    <thead>
      <tr>
        <th onclick="sort('type')">Transaction</th>
        <th onclick="sort('category')">Category</th>
        <th onclick="sort('value')">Value</th>
        <th onclick="sort('date')">Date</th>
        <th onclick="sort('memo')">Memotext</th>
        <th> </th>

      </tr>
    </thead>
    <tbody>
    `

    var tableEnd = `    </tbody>
    </table>`

    var tableContent = ""
    Array.prototype.forEach.call(data, element => {

        tableContent += `
        <tr>
          <td>` + getTransactionIcone(element.type) + `</td>
          <td>` + element.category + `</td>
          <td>` + element.value + `</td>
          <td>` + formatDate(element.date) + `</td>
          <td>` + element.memo + `</td>
          

          <td> <span onclick="deleteItem(` + element.id + `)"> 🗑️</span> </td>
        
        
          </tr>`
    });

    return tableHeader + tableContent + tableEnd
}

function formatDate(date) {
    var itemDate = Date.parse(date)
    const d = new Date(itemDate)

    day = d.getDate()
    month = d.getMonth()
    month = month + 1;
    if ((String(day)).length == 1)
        day = '0' + day;
    if ((String(month)).length == 1)
        month = '0' + month;

    dateT = day + '-' + month + '-' + d.getFullYear();

    return dateT
}

function addIncomePopup() {
    return `
    <div class="modal fade" id="incomeModal" tabindex="-1" aria-labelledby="incomeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="incomeModalLabel">Einzahlung</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
    

                <div id="alert-dialog-income" class="alert alert-danger alert-dismissible" style="display: none;">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    Please fill all the required data.
                </div>
  
              
                    <form>
                        <div class="mb-3 mt-3,">
                            <label for="email" class="form-label">Category:*</label>
                            <div class="dropdown">
                                <button id="categoryButton-income" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                    Typ
                                </button>
                                <ul id="incomeDropdown" class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Salary</a></li>
                                    <li><a class="dropdown-item" href="#">Other</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Betrag:*</label>
                            <div class="input-group">
                                <span class="input-group-text">EUR</span>
                                <input type="number" class="form-control" placeholder="0,00" id="betrag-value-income">
                              </div>
                        </div>
    
                        <div class="mb-3">
                            <label class="form-label">Datum:*</label>
                            <input type="date" class="form-control" id="income-date">
                        </div>
    
    
                        <div class="mb-3">
                            <label class="form-label">Memotext :</label>
                            <textarea class="form-control" rows="2" id="memo-note-income"></textarea>
                        </div>
    
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="add-button"  onclick="createEntry('income')">Add</button>
                </div>
            </div>
        </div>
    </div>
    `
}

function addOutcomePopup() {
    return `
    <div class="modal fade" id="outcomeModal" tabindex="-1" aria-labelledby="outcomeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="outcomeModalLabel">Auszahlung</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div id="alert-dialog-outcome" class="alert alert-danger alert-dismissible" style="display: none;">
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        Please fill all the required data.
                    </div>
    
                    <form>
                        <div class="mb-3 mt-3,">
                            <label for="email" class="form-label">Category:*</label>
                            <div class="dropdown">
                                <button id="categoryButton-outcome" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                    Typ
                                </button>
                                <ul id="outcomeDropdown" class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Rent</a></li>
                                    <li><a class="dropdown-item" href="#">Entertainment</a></li>
                                    <li><a class="dropdown-item" href="#">Clothes</a></li>
                                    <li><a class="dropdown-item" href="#">Transportation</a></li>
                                    <li><a class="dropdown-item" href="#">Food</a></li>
                                    <li><a class="dropdown-item" href="#">Eating out</a></li>
                                    <li><a class="dropdown-item" href="#">Others</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Betrag:*</label>
                            <div class="input-group">
                                <span class="input-group-text">EUR</span>
                                <input type="number" class="form-control" placeholder="0,00" id="betrag-value-outcome">
                              </div>
                        </div>
    
                        <div class="mb-3">
                            <label class="form-label">Datum:*</label>
                            <input type="date" class="form-control" id="outcome-date">
                        </div>
    
    
                        <div class="mb-3">
                            <label class="form-label">Memotext :</label>
                            <textarea class="form-control" rows="2" id="memo-note-outcome"></textarea>
                        </div>
    
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="add-button" onclick="createEntry('outcome')">Add</button>
                </div>
            </div>
        </div>
    </div>
    `
}

function createEntry(val) {

    var _category = $('#categoryButton-' + val)[0].textContent
    var _value = $('#betrag-value-' + val)[0].value
    var _date = $('#' + val + '-date')[0].value
    var _memo = $('#memo-note-' + val)[0].value
    var _type = val

    if (_category == "Any" || _value == "") {
        $('#alert-dialog-' + val).show();

        return
    }

    $('#alert-dialog-income').hide();

    var entry = {
        category: _category,
        value: _value,
        date: _date,
        memo: _memo,
        type: _type
    };

    var dataJson = JSON.stringify(entry);

    $.ajax({
        url: "http://localhost:7777/api/budget",
        type: "POST",
        data: dataJson,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {

            $.get("http://localhost:7777/api/budget", function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                records = data;
                shownRecords = records
                refreshTable(shownRecords)
                clearFilter()
            });

        }
    })

    $('#' + val + 'Modal').modal('toggle');
}


function filterRecords(records, filterType, filterValue) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var filteredData = []

    Array.prototype.forEach.call(records, element => {
        var itemDate = Date.parse(element.date)
        const d = new Date(itemDate);
        var itemMonthName = monthNames[d.getMonth()]
        var itemYear = d.getFullYear()

        if (filterType == "month") {
            if (itemMonthName == filterValue) {
                filteredData.push(element)
            }
        } else if (filterType == "year") {
            if (itemYear == filterValue) {
                filteredData.push(element)
            }
        } else if (filterType == "type") {
            console.log(element)
            console.log(filterValue)

            if (element.type == filterValue) {
                filteredData.push(element)
            }
        }
    });

    return filteredData;

}

function filter() {

    var month = $('#month-filter')[0].value
    var year = $('#year-filter')[0].value
    var type = $('#type-filter')[0].value

    var data

    if (month == "Any" && year == "Any" && type == "Any") {
        refreshTable(records)
        return
    }

    if (month != "Any") {
        data = filterRecords(records, "month", month)
    }

    if (year != "Any") {
        data = filterRecords(records, "year", year)
    }

    if (type != "Any") {
        console.log(type)
        data = filterRecords(records, "type", type)
    }

    shownRecords = data
    refreshTable(shownRecords)
}


function clearFilter() {

    $("#month-filter").val('Any');
    $("#year-filter").val('Any');
    $("#type-filter").val('Any');

    shownRecords = records
    refreshTable(shownRecords)

}

function compareTransaction(a, b) {
    if (a.type < b.type) {
        return -1;
    }
    if (a.type > b.type) {
        return 1;
    }
    return 0;
}

function compareCategory(a, b) {
    if (a.category < b.category) {
        return -1;
    }
    if (a.category > b.category) {
        return 1;
    }
    return 0;
}

function compareBetrag(a, b) {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
}

function compareDate(a, b) {
    if (a.date < b.date) {
        return -1;
    }
    if (a.date > b.date) {
        return 1;
    }
    return 0;
}

function compareMemo(a, b) {
    if (a.memo < b.memo) {
        return -1;
    }
    if (a.memo > b.memo) {
        return 1;
    }
    return 0;
}

function sort(target) {
    var data = shownRecords
    if (target == "type") {
        data.sort(compareTransaction)
    } else if (target == "category") {
        data.sort(compareCategory)
    } else if (target == "value") {
        console.log(target)
        data.sort(compareBetrag)
    } else if (target == "date") {
        data.sort(compareDate)
    } else if (target == "memo") {
        data.sort(compareMemo)
    }
    shownRecords = data
    refreshTable(shownRecords)
}

function deleteItem(id) {
    console.log(id)
    $.ajax({
        url: "http://localhost:7777/api/budget/" +id,
        type: "DELETE",
        success: function () {

            $.get("http://localhost:7777/api/budget", function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                records = data;
                shownRecords = records
                refreshTable(shownRecords)
                clearFilter()
            });

        }
    })
}