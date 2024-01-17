var multer = require("multer")
var path = require("path")
var fs = require("fs")
const dateObj = new Date()
const month = dateObj.getUTCMonth() + 1
const day = dateObj.getUTCDate()
const year = dateObj.getUTCFullYear()

var store = multer.diskStorage({

    destination: function (req, file, cb) {
        if (!fs.existsSync('./uploads/' + year)) {
            fs.mkdirSync('./uploads/' + year)
        }
        if (!fs.existsSync('./uploads/' + year + '/' + month)) {
            fs.mkdirSync('./uploads/' + year + '/' + month)
        }
        cb(null, './uploads/' + year + '/' + month)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
        // cb(null, req.body.docname + '.jpg')
    }
})

var upload = multer({ storage: store }).single("file")

module.exports = {
    upload: (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                return res.status(501).json({ error: err })
            }
            return res.json({ msg: "Uploaded Successfully", file: req.file, "fileName": req.file.filename })
        })
    },
    download: (req, res) => {
        filepath = path.join(__dirname, "/../uploads/") + req.params.folder1 + '/' + req.params.folder2 + '/' + req.params.filename
        defaultfilepath = path.join(__dirname, "/../uploads") + "/no-image.png"
        if (fs.existsSync(filepath)) {
            res.sendFile(filepath)
        } else {
            res.sendFile(defaultfilepath)
        }
    },
}