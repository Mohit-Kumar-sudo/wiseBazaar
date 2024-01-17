const express = require("express");
const router = express.Router();
const FileController = require('../Controller/File.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

router.post("/upload", verifyAccessToken, FileController.upload);

router.get("/download/:folder1/:folder2/:filename", FileController.download);

module.exports = router;
