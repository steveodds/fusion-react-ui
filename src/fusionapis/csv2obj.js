//converts csv data to an object that can be easily used
function csv2obj(str, delimiter = "\t") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    // const headers = str.slice(0, str.indexOf("\n")).split(delimiter)
    const headers = ["Date", "Endpoint", "OrganizationID", "UserID", "Free", "Count"]

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    str = str.trim()
    const rows = str.split("\n")

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
        const values = row.split(delimiter)
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index]
            return object
        }, {})
        return el
    })

    // return the array
    return arr
}

export const csvToObjectConverter = csv2obj