const router=require('./routes/productsRoute')
const express=require('express')
require('dotenv').config()


const app =express()
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("ok")
})
app.use(router)

// const port=4000

const port=process.env.PORT ||4000
app.listen(port,()=>console.log(`running on port ${port}`))
