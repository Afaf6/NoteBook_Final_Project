require('dotenv').config();
const express =require ("express");
const mongoose = require ("mongoose");


const app = express();
app.use(express.json());

require("./cron/jobs");

async function connection_DB() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}
connection_DB();

const cors = require("cors");
app.use(cors({ origin: "*" }));  // front API
app.use(express.json());

const AuthRoute = require("./routes/AuthRoute");
app.use("/api", AuthRoute);

const GoalsRoute = require("./routes/GoalsRoute");
app.use("/api/goal", GoalsRoute);

const IncomeRoute = require("./routes/IncomeRoute");
app.use("/api/income", IncomeRoute);

const HabitRoute = require("./routes/HabitRoute");
app.use("/api/habit", HabitRoute);

const expenseRoute = require("./routes/ExpenseRoute");
app.use("/api/expenses", expenseRoute);

const SubscripRoute = require("./routes/SubscripRoute");
app.use("/api/subscrip", SubscripRoute);

const DashboardRoute = require("./routes/DashboardRoute");
app.use("/api/dashboard", DashboardRoute);

const NotificationRoute = require("./routes/NotificationRoute");
app.use("/api/notifications", NotificationRoute);



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Is Running ${port}`);
    
});