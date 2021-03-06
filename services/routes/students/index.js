const express= require('express')
const db= require('../../db')

const router=express.Router()


router.get('/',async(req,res)=>{
    const order = req.query.order || "asc"
    const offset = req.query.offset || 0
    const limit = req.query.limit || 10

    // removing them from Query since otherwise I'll automatically filter on them
    delete req.query.order
    delete req.query.offset
    delete req.query.limit

    let query = 'SELECT * FROM "Students" ' 

    const params = []
    for (queryParam in req.query) { 
        params.push(req.query[queryParam])

        if (params.length === 1) 
            query += `WHERE ${queryParam} = $${params.length} `
        else
            query += ` AND ${queryParam} = $${params.length} `
    }

    query += " ORDER BY _id " + order 

    params.push (limit)
    query += ` LIMIT $${params.length} `
    params.push(offset)
    query += ` OFFSET $${params.length}`
   
    console.log(query)

    //you can also specify just the fields you are interested in, like:
    //SELECT asin, category, img, title, price FROM "Books" 
    const response = await db.query(query, params)
    res.send(response.rows)
    // const response= await db.query(`SELECT * FROM "Students"`)
    // res.send(response.rows)
})

router.get('/:id',async (req,res)=>{
    const response= await db.query(`SELECT * FROM "Students" WHERE _id=$1`,[req.params.id])
    res.send(response.rows)
})

router.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "Students" (_id, name, surname, email, "dob") 
                                     Values ($1, $2, $3, $4, $5)
                                     RETURNING *`, 
                                    [ req.body._id, req.body.name, req.body.surname, req.body.email, req.body.dob ])
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

router.delete("/:id", async (req, res) => {
    const response = await db.query(`DELETE FROM "Students" WHERE _id = $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})
module.exports=router