const app = require("./loaders/app");
const { connectDB } = require("./loaders/mongoose");
const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.PORT || 5000 ;


async function startServer(){
    await connectDB();
    await loadPlanetsData();
    app.listen(PORT, ()=>{
        console.log(`App started on ${PORT}`);
    });
};

startServer();


