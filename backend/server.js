require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require("./models/db")
const loginRouter = require("./routes/loginRouter")

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api",loginRouter)


app.listen(PORT,()=>{
    console.log(`server is running:${PORT}`);
    
})

