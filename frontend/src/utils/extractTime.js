export const extractTime = (dateString)=>{
    const date = new Date(dateString)
    const hours = padToZero(date.getHours())
    const minutes = padToZero(date.getMinutes())
    return `${hours}:${minutes}`
}

const padToZero=(number)=>{
    return number.toString().padStart(2,'0')
}
