/* Your Code Here */
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(records) {
    let employeeRecords = [];
    // Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new array
    records.map(record => {
        let recorded = createEmployeeRecord(record);
        employeeRecords.push(recorded);
    })
    // returns an array of objects
    return employeeRecords;
}

function createTimeInEvent(dateStamp) {
    // Add an Object with keys type, hour and date
    const splitDateStamp = dateStamp.split(" ");
    const date = splitDateStamp[0];
    const hour = splitDateStamp[1];
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date,
    }
    this.timeInEvents.push(timeInObj);
    return this;
}

function createTimeOutEvent(dateStamp) {
    // Add an Object with keys type, hour and date
    const splitDateStamp = dateStamp.split(" ");
    const date = splitDateStamp[0];
    const hour = splitDateStamp[1];
    const timeOutObj = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date,
    }
    this.timeOutEvents.push(timeOutObj);
    return this;
}

function hoursWorkedOnDate(date) {
    // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    // Find & store the timeIn from the date passed
    let timeIn;
    this.timeInEvents.find(el => {
        if (date === el.date) {
            return timeIn = el.hour / 100;
        }
    });
    let timeOut;
    this.timeOutEvents.find(el => {
        if (date === el.date) {
            return timeOut = el.hour / 100;
        }
    });
    return timeOut - timeIn
}

function wagesEarnedOnDate(date) {
    // Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
    const hours = hoursWorkedOnDate.call(this, date);
    const wage = this.payPerHour;
    // return pay owed
    return hours * wage;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString) {
    // Test the firstName field for a match with the firstName argument
    return collection.find(rec => {
        return rec.firstName === firstNameString
    })
}


function calculatePayroll(collection) {
    return collection.reduce((e, record) => {
        return e + allWagesFor.call(record);
    }, 0)
}