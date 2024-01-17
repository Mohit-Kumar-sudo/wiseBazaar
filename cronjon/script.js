const debug = require('debug')('mb:cronjob');
const axios = require('axios');
var cron = require('node-cron');
const mongoose = require('mongoose')
require('./helpers/init_mongodb')
const { addMinutes } = require('./helpers/time_functions')

const EventModel = require('./models/Event.Model')
const ResultModel = require('./models/Result.Model')
const BidModel = require('./models/Bid.Model')
const UserModel = require('./models/User.Model')

const fs = require('fs')
var minuteDiff = 30
async function initEventsCron() {
    console.log('fx called')
    EventModel.find({}, { "notification.openResultTime": 1, "notification.closeResultTime": 1, "notification.closeResultDay": 1, title: 1 }, (err, data) => {
        if (err) {
            debug(err)
        } else {
            data = data.map(o => {
                return {
                    openResultTime: o.notification[0].openResultTime,
                    closeResultTime: o.notification[0].closeResultTime,
                    closeResultDay: o.notification[0].closeResultDay,
                    title: o.title,
                    _id: o._id
                }
            });
            data = data.map(o => {
                o.openResultTime = addMinutes(o.openResultTime, minuteDiff)
                o.closeResultTime = addMinutes(o.closeResultTime, minuteDiff)
                return o;
            })
            for (const datum of data) {
                debug('will be running a open task At ' + datum.openResultTime + ' for ' + datum.title);
                cron.schedule(`${datum.openResultTime.split(":")[1]} ${datum.openResultTime.split(":")[0]} * * *`, async () => {
                    debug('running a open task At ' + datum.openResultTime + ' for ' + datum.title);
                    await axios.post('http://35.154.176.14:3000/apiv1/updateMatka')
                    let nums = await fs.readFileSync('../admin/nums.json')
                    nums = JSON.parse(nums.toString())
                    const todayDate = new Date()
                    todayDate.setMinutes(todayDate.getMinutes() - minuteDiff)
                    todayDate.setHours(todayDate.getHours() + 5);
                    todayDate.setMinutes(todayDate.getMinutes() + 30);
                    todayDate.setHours(0);
                    todayDate.setMinutes(0);
                    todayDate.setSeconds(0);
                    todayDate.setMilliseconds(0);
                    nums = nums.filter(o => {
                        const keys = Object.keys(o)
                        if (keys.length) {
                            if (keys[0].toLowerCase() != datum.title.toLowerCase()) {
                                return false;
                            } else {
                                return true
                            }
                        } else {
                            return false;
                        }
                    })
                    nums = nums.map(o => {
                        const keys = Object.keys(o)
                        o = new ResultModel({
                            event_name: keys[0],
                            patti: o[keys[0]].split('-')[0],
                            digit: o[keys[0]].split('-')[1].split('')[0],
                            data_set: 'open',
                            event_slot: datum.openResultTime,
                            event_date: todayDate
                        })
                        return o;
                    })
                    for (const num of nums) {
                        const result = await num.save()
                    }
                    console.log('open result saved to database');
                    const bidTypes = [
                        'single-ank',
                        'single-patti',
                        'double-patti',
                        'triple-patti',
                    ]
                    const bidMultipliers = [
                        9.5,
                        140,
                        280,
                        600,
                    ]
                    // console.log('=========>>>>>>>>>', bidTypes);
                    let counter = 0;
                    for (const betType of bidTypes) {
                        // console.log('=========>>>>>>>>>', betType);
                        let tdate = new Date()
                        tdate.setHours(tdate.getHours() + 5);
                        tdate.setMinutes(tdate.getMinutes() + 30);
                        tdate.setHours(0);
                        tdate.setMinutes(0);
                        tdate.setSeconds(0);
                        tdate.setMilliseconds(0);
                        let query = { eventId: datum._id, bidType: "open", betType, "slot.bidDate": tdate.toISOString().split("T")[0] }
                        if (betType == 'single-ank') {
                            query["userInput.userInputValue"] = nums[0].digit
                        }
                        else if (betType == 'single-patti') {
                            query["userInput.userInputValue"] = nums[0].patti
                        }
                        else if (betType == 'double-patti') {
                            query["userInput.userInputValue"] = nums[0].patti
                        }
                        else if (betType == 'triple-patti') {
                            query["userInput.userInputValue"] = nums[0].patti
                        }
                        // const resData = await BidModel.countDocuments(query);
                        await updateWinnerData(query, bidMultipliers[counter]);
                        // console.log(resData)
                        counter++;
                    }
                }, {
                    scheduled: true,
                    timezone: "Asia/Kolkata"
                });
                debug('will be running a close task At ' + datum.closeResultTime + ' for ' + datum.title);
                cron.schedule(`${datum.closeResultTime.split(":")[1]} ${datum.closeResultTime.split(":")[0]} * * *`, async () => {
                    debug('running a close task At ' + datum.closeResultTime + ' for ' + datum.title);
                    await axios.post('http://35.154.176.14:3000/apiv1/updateMatka')
                    let nums = await fs.readFileSync('../admin/nums.json')
                    nums = JSON.parse(nums.toString())
                    nums = nums.filter(o => {
                        const keys = Object.keys(o)
                        if (keys.length) {
                            if (keys[0].toLowerCase() != datum.title.toLowerCase()) {
                                return false;
                            } else {
                                return true
                            }
                        } else {
                            return false;
                        }
                    })
                    nums = nums.map(o => {
                        const todayDate = new Date()
                        todayDate.setMinutes(todayDate.getMinutes() - minuteDiff)
                        todayDate.setHours(todayDate.getHours() + 5);
                        todayDate.setMinutes(todayDate.getMinutes() + 30);
                        todayDate.setHours(0);
                        todayDate.setMinutes(0);
                        todayDate.setSeconds(0);
                        todayDate.setMilliseconds(0);
                        console.log(datum);
                        if (datum.closeResultDay == '1') {
                            todayDate.setDate(todayDate.getDate() - 1)
                        }
                        const keys = Object.keys(o)
                        o = new ResultModel({
                            event_name: keys[0],
                            patti: o[keys[0]].split('-')[2],
                            digit: o[keys[0]].split('-')[1].split('')[1],
                            open_patti: o[keys[0]].split('-')[0],
                            open_digit: o[keys[0]].split('-')[1].split('')[0],
                            data_set: 'close',
                            event_slot: datum.closeResultTime,
                            event_date: todayDate
                        })
                        return o;
                    })
                    console.log('mums', nums);
                    for (const num of nums) {
                        const result = await num.save()
                    }
                    console.log('close result saved to database');
                    const bidTypes = [
                        'single-ank',
                        'jodi',
                        'single-patti',
                        'double-patti',
                        'triple-patti',
                        'half-sangam',
                        'full-sangam'
                    ]
                    const bidMultipliers = [
                        9.5,
                        95,
                        140,
                        280,
                        600,
                        1000,
                        10000
                    ]
                    // console.log('=========>>>>>>>>>', bidTypes);
                    let counter = 0;
                    for (const betType of bidTypes) {
                        // console.log('=========>>>>>>>>>', betType);
                        let tdate = new Date()
                        tdate.setHours(tdate.getHours() + 5);
                        tdate.setMinutes(tdate.getMinutes() + 30);
                        tdate.setHours(0);
                        tdate.setMinutes(0);
                        tdate.setSeconds(0);
                        tdate.setMilliseconds(0);
                        let query = { eventId: datum._id, bidType: "close", betType, "slot.bidDate": tdate.toISOString().split("T")[0] }
                        if (betType == 'single-ank') {
                            query["userInput.userInputValue"] = nums[0].digit
                        }
                        else if (betType == 'jodi') {
                            query["userInput.userInputValue"] = nums[0].open_digit + "" + nums[0].digit
                        }
                        else if (betType == 'single-patti') {
                            query["userInput.userInputValue"] = nums[0].patti
                        }
                        else if (betType == 'double-patti') {
                            query["userInput.userInputValue"] = nums[0].patti
                        }
                        else if (betType == 'triple-patti') {
                            query["userInput.userInputValue"] = nums[0].patti
                        }
                        else if (betType == 'full-sangam') {
                            query["userInput.openPanna"] = nums[0].open_patti
                            query["userInput.closePanna"] = nums[0].patti
                        }
                        if (betType == 'half-sangam') {
                            query["userInput.openPanna"] = nums[0].open_patti
                            query["userInput.closeDigit"] = nums[0].digit
                            // const resData = await BidModel.updateMany(query, {$set: {}});
                            await updateWinnerData(query, bidMultipliers[counter]);
                            // console.log(resData)
                            delete query["userInput.openPanna"]
                            delete query["userInput.closeDigit"]
                            query["userInput.closePanna"] = nums[0].patti
                            query["userInput.openDigit"] = nums[0].open_digit
                            // const resData2 = await BidModel.countDocuments(query);
                            await updateWinnerData(query, bidMultipliers[counter]);
                            // console.log(resData2)
                        } else {
                            // const resData = await BidModel.countDocuments(query);
                            await updateWinnerData(query, bidMultipliers[counter]);
                            // console.log(resData)
                        }
                        counter++;
                    }
                }, {
                    scheduled: true,
                    timezone: "Asia/Kolkata"
                });
            }
        }
    });
}
setTimeout(async () => {
    initEventsCron();
}, 5000);

async function updateWinnerData(query, multiplier) {
    let bids = await BidModel.find(query, { _id: 1, bidAmount: 1, userId: 1, eventId: 1 })
    // for (const b of bids) {
    for (let i = 0; i < bids.length; i++) {
        const b = bids[i];
        query._id = mongoose.Types.ObjectId(b._id)
        const winningAmount = b.bidAmount * multiplier
        const bidWindStatusUpdate = await BidModel.updateOne(query, { $set: { winingAmount: winningAmount, bidStatus: "Winner" } })
        let user = await UserModel.updateOne({ _id: mongoose.Types.ObjectId(b.userId) }, { $inc: { wallet: winningAmount } })
    }
}