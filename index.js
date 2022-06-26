// Your code here
const createEmployeeRecord = (array) => {
    const fName = array[0]
    const famName = array[1]
    const titleName = array[2]
    const pph = array[3]
    const tie = []
    const toe = []

    const result = {firstName: fName, 
        familyName: famName, 
        title: titleName, 
        payPerHour: pph, 
        timeInEvents: tie, 
        timeOutEvents: toe
    }

    return result

} 

const createEmployeeRecords = (arrayOfArrays) => {
    const newArray = []
    arrayOfArrays.map((array) => {
        newArray.push(createEmployeeRecord(array))
    }  )
    return newArray
}

const createTimeInEvent = (empObject, time) => {
    const timeArray = time.split('')
    const dateExtracted = timeArray.slice(0,10).join('')
    const hourExtracted = parseInt(timeArray.slice(11,timeArray.length).join(''))
    empObject.timeInEvents.push({
        type: "TimeIn",
        hour: hourExtracted,
        date: dateExtracted
    })

    return empObject   
}

const createTimeOutEvent = (empObject, time) => {
    const timeArray = time.split('')
    const dateExtracted = timeArray.slice(0,10).join('')
    const hourExtracted = parseInt(timeArray.slice(11,timeArray.length).join(''))
    empObject.timeOutEvents.push({
        type: "TimeOut",
        hour: hourExtracted,
        date: dateExtracted
    })

    return empObject   
}

const hoursWorkedOnDate = (empObject, dateParam) => {
    const timeInObject = empObject.timeInEvents.find(function(time){
        return time.date === dateParam
    })
    const timeOutObject = empObject.timeOutEvents.find(function(time){
        return time.date === dateParam
    })
    return timeOutObject.hour/100 - timeInObject.hour/100
}

const wagesEarnedOnDate = (empObject, dateParam) => {
    const hours = hoursWorkedOnDate(empObject, dateParam)
    return hours * empObject.payPerHour
}

const allWagesFor = (empObject) => {
    const datesOfWorkArray = empObject.timeOutEvents.map(function(dateParam){
        return dateParam.date
    })
    const amount = datesOfWorkArray.reduce(function(sum, date){
        return sum + wagesEarnedOnDate(empObject, date)
    }, 0)
    return amount
}

const calculatePayroll = (arrayOfEmpObject) => {
    const amount = arrayOfEmpObject.reduce((sum, empObject) => {
        return sum += allWagesFor(empObject)
    }, 0)
    return amount
}
