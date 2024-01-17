const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
require('./helpers/init_mongodb')
require('./helpers/init_redis')
const createError = require('http-errors')
const { verifyAccessToken } = require('./helpers/jwt_helper')
const cors = require('cors')
const fs = require('fs')
// const { runUpdatematka } = require('./helpers/scripts.js')
const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')

app.use('/apiv1', express.static(path.join(__dirname, 'public')))

const MasterRoute = require('./routes/Master.Route')
app.use('/apiv1/auth', MasterRoute)

const UserRoute = require('./routes/User.Route')
app.use('/apiv1/user', UserRoute)

const EventRoute = require('./routes/Event.Route')
app.use('/apiv1/event', EventRoute)

const ResultRoute = require('./routes/Result.Route')
app.use('/apiv1/result', ResultRoute)

const UserPaymentRoute = require('./routes/UserPayment.Route')
app.use('/apiv1/payment', UserPaymentRoute)

const fileRoute = require('./routes/File.Route')
app.use('/apiv1/file', fileRoute)

const UserWalletRoute = require('./routes/UserWallet.Route')
app.use('/apiv1/user-wallet', UserWalletRoute)

const WithdrawalRoute = require('./routes/Withdrawal.Route')
app.use('/apiv1/withdrawal', WithdrawalRoute)

const BidRoute = require('./routes/Bid.Route')
app.use('/apiv1/bid', BidRoute)

const ManualPaymentRoute = require('./routes/ManualPayment.Route')
app.use('/apiv1/ManualPaymentRoute', ManualPaymentRoute)

const KalyanEventRoute = require('./routes/KalyanEvent.Route')
app.use('/apiv1/kalyanEvent', KalyanEventRoute)

const KalyanStarLineRoute = require('./routes/KalyanStarline.Route')
app.use('/apiv1/kalyanStarline', KalyanStarLineRoute)

const KalyanResultRoute = require('./routes/KalyanResult.Route')
app.use('/apiv1/kalyanStarlineResult', KalyanResultRoute)

const NotificationRoute = require('./routes/Notification.route')
app.use('/apiv1/notification', NotificationRoute)

app.get('/apiv1', verifyAccessToken, async (req, res, next) => {
    res.send("Backend Start")
})

app.get('/apiv1/getTime', (req, res) => {
    const today = new Date()
    today.setHours(today.getHours() + 5)
    today.setMinutes(today.getMinutes() + 30)
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const DateString = today.toISOString().split('T')[0]
    const ghantaString = today.toISOString().split('T')[1].split(':')[0]
    const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
    const timeString = [ghantaString, chotaGhantaString].join(':')
    res.send({ data: today, DateString, timeString })
})

// app.post('/apiv1/updateMatka', (req, res, next) => {
//     try {
//         runUpdatematka((status) => {
//             return res.send({ status })
//         })
//     } catch (error) {
//         if (error.isJoi === true)
//             return next(createError.BadRequest('Bad Request'))
//         next(error)
//     }
// })


// app.get('/apiv1/getMatka', async (req, res) => {
//     try {
//         const nums = await fs.readFileSync('nums.json')
//         res.send(nums.toString())
//     } catch (error) {
//         res.stats(500).send({ 'msg': "Somthing went wrong" })
//     }
// })


// app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')))

// app.use('/admin/*', express.static(path.join(__dirname, 'public', 'admin')))

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 3100

app.listen(PORT, () => {
    console.log(`Server on runnig on port ${PORT}`)
})
