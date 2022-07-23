const { ObjectId } = require("mongodb");
const { getDataBase } = require("../config/mongoDb");
const { currentTimeGetter } = require("../helpers/currentTimeGetter");

class Visitor {
    static async findAllVisitor(query) {
        try {
            let searchQuery = query.search ? {name: new RegExp(`^${query.search}`)} : {}
            const db = getDataBase()
            const visitors = await db
                .collection('visitors')
                .find(searchQuery)
                .skip((query.page - 1) * 10)
                .limit(11)
                .toArray()
            const total = await db
                .collection('visitors')
                .count()
            const nextPage = visitors.length === 11 ? true : false
            if(nextPage){
                visitors.pop()
            }
            return {visitors,total,nextPage}
        } catch (error) {
            throw (error)
        }
    }

    static async createVisitor(data) {
        try {
            const db = getDataBase()
            const lastVisitor = await db
                .collection('visitors')
                .find()
                .sort({ queueNumber: -1 })
                .limit(1)
                .toArray()
            data.queueNumber = 'A-' + (parseInt(lastVisitor[0].queueNumber.split('-')[1]) + 1)
            data.createdAt = currentTimeGetter()
            const visitor = await db
                .collection('visitors')
                .insertOne(data)
            return visitor
        } catch (error) {
            throw (error)
        }
    }

    static async findVisitorById(id) {
        try {
            const db = getDataBase()
            const visitor = await db
                .collection('visitors')
                .findOne({ _id: ObjectId(id) })
            return visitor
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = { Visitor }