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
const path = require('path')
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
var crypto = require('crypto');

const AuthRoute = require('./routes/Auth.route')
app.use('/apiv2/auth', AuthRoute)

const BidRoute = require('./routes/Bid.Route')
app.use('/apiv2/bid', BidRoute)

const FileRoute = require('./routes/File.Route')
app.use('/apiv2/file', FileRoute)

const KalyanStarLineRoute = require('./routes/KalyanStarline.Route')
app.use('/apiv2/kalyanStarline', KalyanStarLineRoute)

const NotificationRoute = require('./routes/Bid.Route')
app.use('/apiv2/notification', NotificationRoute)

app.get('/apiv2', verifyAccessToken, async (req, res, next) => {
    res.send("Backend Start")
})

app.get('/apiv2/getTime', (req, res) => {
    const today = new Date()
    today.setHours(today.getHours() + 5)
    today.setMinutes(today.getMinutes() + 30)
    const DateString = today.toISOString().split('T')[0]
    const ghantaString = today.toISOString().split('T')[1].split(':')[0]
    const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
    const timeString = [ghantaString, chotaGhantaString].join(':')
    res.send({ data: today, DateString, timeString })
})

// app.post('/apiv2/updateMatka', (req, res, next) => {
//     try {
//         runUpdatematka((status) => {
//             console.log(status);
//             return res.send({ status })
//         })
//     } catch (error) {
//         if (error.isJoi === true)
//             return next(createError.BadRequest('Bad Request'))
//         next(error)
//     }
// })

app.get('/apiv2/getMatka', async (req, res) => {
    try {
        const nums = await fs.readFileSync('nums.json')
        res.send(nums.toString())
    } catch (error) {
        res.status(500).send({ 'msg': "Somthing went wrong" })
    }
})


app.post('/apiv2/genHash', function (req, res, next) {
    try {
            var data = req.body;
            var cryp = crypto.createHash('sha512');
            var text = 'WJZbDt|' + data.txnid + '|' + data.amount + '|' + data.pinfo + '|' + data.fname + '|' + data.email + '|||||' + data.udf5 + '||||||zppxe17MRlBwzLZ2nxDLnLy2Mn95TD0R';
            cryp.update(text);
            var hash = cryp.digest('hex');
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(hash);
            return
    } catch (error) {
        next(error)
    }
});

app.post('/apiv2/rescheck', function (req, res) {
        var data = req.body;
        var cryp = crypto.createHash('sha512');
        var text = 'zppxe17MRlBwzLZ2nxDLnLy2Mn95TD0R|' + data.status + '||||||' + data.udf5 + '|||||' + data.email + '|' + data.fname + '|' + data.pinfo + '|' + data.amount + '|' + data.txnid + '|WJZbDt';
        cryp.update(text);
        var hash = cryp.digest('hex');
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(hash);
    });


// app.use('/', express.static(path.join(__dirname, 'public', 'thankyou.html')))
app.get('/thankyou', (req, res) => {
    return res.sendFile(__dirname + '/public/thankyou.html')
})

// app.use('/user/*', express.static(path.join(__dirname, 'public', 'user')))

// app.use('/stmt/*', express.static(path.join(__dirname, 'public', 'stmt')))


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
