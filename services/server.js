const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const studentRoute=require('./routes/students')

dotenv.config()
const db = require('./db')
const server=express()
server.use(cors())
server.use(express.json())
// server.get('/' ,(req,res)=>{
//     res.send('ere')
// })

// server.get('/getdb',async (req,res)=>{
//     const response=await db.query('SELECT 1+1')
//     res.send(response)
// })
server.use('/students',studentRoute)
server.listen(process.env.PORT||3453,()=>console.log('RUNNING ON',process.env.PORT||3453))