export function toReadableDate(date) {

    const allMonths = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    const year = date.substring(0, 4)
    //get month number for index in allMonths
    const month = allMonths[parseInt(date.substring(5, 7) - 1)]

    //if day starts with a 0 then "delete" the 0
    const day = function () {
        return (date.substring(8, 10).startsWith("0") ? date.substring(9, 10) : date.substring(8, 10))
    }

    const armyTime = date.substring(11, 16)
    const regularTime = armyToRegConverter(armyTime)

    // console.log(`${month} ${day()}, ${year} at ${regularTime}`)
    return `${month} ${day()}, ${year} at ${regularTime}`
}


function armyToRegConverter(armytime) {
    let hour = parseInt(armytime.substring(0, 2))
    let minute = parseInt(armytime.substring(3));
    let PM = ""
    if (hour > 12) {
        let remainder = hour - 12
        hour = remainder; //PM
        PM = "PM"
    }
    return `${hour}:${minute} ${PM}`;
}