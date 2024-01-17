const _router = require('express').Router()
const Controller = require('../Controller/Collection.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

_router.get('/export/:id', Controller.ExportSampleFile)

_router.post('/', verifyAccessToken, Controller.create)

_router.get('/count', verifyAccessToken, Controller.count)

_router.get('/:id', verifyAccessToken, Controller.get)

_router.get('/', verifyAccessToken, Controller.list)

_router.put('/:id', verifyAccessToken, Controller.update)

_router.delete('/:id', verifyAccessToken, Controller.delete)

_router.put('/:id/restore', verifyAccessToken, Controller.restore)


module.exports = _router