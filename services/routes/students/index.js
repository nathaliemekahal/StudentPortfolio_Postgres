const express= require('express')
const db= require('../../db')

const router=express.Router()


router.get('/',async(req,res)=>{
    const response= await db.query(`SELECT * FROM "Students"`)
    res.send(response.rows)
})

router.get('/:id',async (req,res)=>{
    const response= await db.query(`SELECT * FROM "Students" WHERE _id=$1`,[req.params.id])
    res.send(response.rows)
})

router.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "Students" (_id, name, surname, email, "DOB") 
                                     Values ($1, $2, $3, $4, $5)
                                     RETURNING *`, 
                                    [ req.body._id, req.body.name, req.body.surname, req.body.email, req.body.DOB ])
    console.log(response)
    res.send(response.rows[0])
})

router.put('/:id',async(req,res)=>{
    try {
        let params=[]
        let query= 'UPDATE "Students" SET '

        for(bodyParams in req.body){
        query+=
        (params.length>0? ", ": '') + bodyParams +' = $'+(params.length+1)
        params.push(req.body[bodyParams])
        }
        params.push(req.params.id)
        query+=' WHERE _id = $'+params.length + ' RETURNING *'

        console.log(query)
        const result = await db.query(query, params)
        res.send(result.rows)
        
    } catch (error) {
        console.log(error)
    }
})
module.exports=router