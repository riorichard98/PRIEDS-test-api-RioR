const docs = require('../visitors.json')
const { getDataBase, connectMongoDb } = require('../config/mongoDb')

async function seedUsers() {
    try {
        docs.forEach((e,i)=>{
            e.queueNumber = `A-${i+1}`
        })
        const db = getDataBase()
        const visitors = await db
            .collection('visitors')
            .insertMany(docs)
        console.log(visitors);
    } catch (error) {
        console.log(error);
    } finally{
        console.log('Seeding done');
        process.exit()
    }
}
connectMongoDb()
    .then(db => {
        seedUsers()
    })