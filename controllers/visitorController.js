const { isInteger } = require("../helpers/integerChecker");
const { Visitor } = require("../models/visitor");

class VisitorController{
    static async findAllVisitor(req, res, next) {
        try {
            let page = req.query.page ? req.query.page : 1
            const data = Visitor.findAllVisitor(page)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createVisitor(req, res, next) {
        try {
            if(!req.body.name || !req.body.age){
                throw({
                    type:"known",
                    code:400,
                    message:"Name and age required"
                })
            }
            if(!isInteger(req.body.age)){
                throw({
                    type:"known",
                    code:400,
                    message:"Invalid age"
                })
            }
            const data = {
                name: req.body.name,
                age: req.body.age
            }
            const visitor = Visitor.createVisitor(data)
            res.status(200).json(visitor)
        } catch (error) {
            next(error)
        }
    }

    static async findVisitorById(req, res, next) {
        try {
            const { id } = req.params
            const visitor = Visitor.findVisitorById(id)
            res.status(200).json(visitor)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {VisitorController}