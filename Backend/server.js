const express =  require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();


const PORT = process.env.PORT || 3000;

//connect to database
connectDB(); 

app.get("/", (req,res) => {
    res.send("WELCOME TO DEX API")
});

// API Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
}) 