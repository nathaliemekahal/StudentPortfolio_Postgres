const express= require('express')
const db= require('../../db')

const router=express.Router()



router.post("/:studentId", async (req, res)=> {
    const response =
    await db.query(`INSERT INTO 
    "Projects" (name, description, "creationDate", "repoUrl","liveUrl", "studentId", "proj_id")                                    
    Values ($1, $2, $3, $4, $5,$6,$7)
    RETURNING *`, 
    [ req.body.name, req.body.description, req.body.creationDate,req.body.repoUrl, req.body.liveUrl, req.params.studentId,req.body.proj_id ])
    console.log(response)
    res.send(response.rows[0])
})
router.get("/:studentId", async (req, res)=> {
   const response= await db.query('SELECT * FROM "Projects" WHERE "studentId"=$1 ',[req.params.studentId]) 
   res.send(response.rows)
})

module.exports=router