const errorHandler = (error, req, res, next) => {
    if (error.name === 'BSONTypeError') {
        res.status(400).json({
            message: "not found"
        })
    } else if (error.type === 'known') {
        res.status(error.code).json({
            message: error.message
        })
    } else {
        res.status(500).json({
            message: "internal server Error"
        })
    }
}

module.exports = {
    errorHandler
}