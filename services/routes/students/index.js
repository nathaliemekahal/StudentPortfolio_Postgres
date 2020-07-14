const express= require('express')
const db= require('../../db')

const router=express.Router()

// router.post("/import", async (req, res) => {
//     //retrieve previous ASINs
//     const response = await db.query('SELECT _id  FROM "Students"')

//     //mapping them out as a list of strings
//     const _idlist = response.rows.map(x => x._id)

//     let total = 0
//     let skipped = 0

//     books.forEach(async student => { 
//         if (_idlist.indexOf(student._id) === -1){ 
//             //ADD IT to the Database
//             await db.query(`INSERT INTO "Students" (_id, name, surname, email, DOB) 
//                                                 Values ($1, $2, $3, $4, $5)`, 
//                                                 [ student._id, student.name, student.surname, student.email, student.DOB])
//             total++ //increment total
//         } //if it's in the list
//         else { //skip it!
//             console.log(`Element ${student._id} is already in the DB!`)
//             skipped++ //increment skipped
//         }
//     })

//     res.send({ //return the number of skipped and added
//         added: total,
//         skipped
//     })
// })
router.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "Students" (_id, name, surname, email, "DOB") 
                                     Values ($1, $2, $3, $4, $5)
                                     RETURNING *`, 
                                    [ req.body._id, req.body.name, req.body.surname, req.body.email, req.body.DOB ])
    
    console.log(response)
    res.send(response.rows[0])
})
module.exports=router