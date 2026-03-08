require('dotenv').config();
const express =require ("express");
const mongoose = require ("mongoose");


const app = express();
app.use(express.json());

async function connection_DB() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}
connection_DB();


const AuthRoute = require("./routes/AuthRoute");
app.use("/api", AuthRoute);

const GoalsRoute = require("./routes/GoalsRoute");
app.use("/api/goal", GoalsRoute);

const IncomeRoute = require("./routes/IncomeRoute");
app.use("/api/income", IncomeRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Is Running ${port}`);
    
})