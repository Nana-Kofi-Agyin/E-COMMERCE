const express =  require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req,res) => {
    res.send("WELCOME TO DEX API")
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})