const express = require('express')
const router = express.Router()
const visitorRoute = require('./visitorRoute.js')

router.use('/visitors',visitorRoute)

module.exports = router