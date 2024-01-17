module.exports = {
    addMinutes: (time, minutes) => {
        time = time.split(":")
        totalMinutes = parseInt(time[1], 10) + minutes
        extraHours = 0
        extraMinutes = 0
        // console.log(totalMinutes)
        if (totalMinutes >= 60) {
            extraHours = parseInt((totalMinutes) / 60)
            // console.log(extraHours)
            extraMinutes = totalMinutes - (60 * extraHours)
            // console.log(extraMinutes)
        }
        time[0] = parseInt(time[0]) + extraHours
        time[1] = extraMinutes ? extraMinutes : (totalMinutes - (extraHours * 60))
        if (time[0] >= 24) {
            time[0] = time[0] - (24 * parseInt((time[0]/24)))
        }
        return time.join(":")
    }
}