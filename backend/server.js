require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require("./models/db")
const authRouter = require("./routes/authRouter")

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api",authRouter)


app.listen(PORT,()=>{
    console.log(`server is running:${PORT}`);
    
})

