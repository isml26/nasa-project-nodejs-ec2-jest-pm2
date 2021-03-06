const {MongoMemoryServer} = require("mongodb-memory-server")
const mongoose = require("mongoose")

jest.useFakeTimers('legacy')

let mongo;

beforeAll(async()=>{
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    db = await mongoose.connect(mongoUri);
});

beforeEach(async()=>{
    // reach mongodb database reset all the data inside there
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
    const planets = await mongoose.connection.db.collection('planets');
    const mockPlanet = {keplerName: 'Kepler-1410 b'};
    //const mockPlanet2 = {keplerName: 'Kepler-442 b'};
    await planets.insertOne(mockPlanet);
    //await planets.insertOne(mockPlanet2);
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});
