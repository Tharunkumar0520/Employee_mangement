import express from "express";
import { PrismaClient } from '@prisma/client'

const client=new PrismaClient();
const app=express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use(express.json());
const port=3000;

app.post('/push-user',async (req,res)=>{
    try{
        const aa=await client.Employee.create({
            data:{
                name:req.body.name,
                email:req.body.email,
                employeeId:req.body.employeeId,
                phoneNumber:req.body.phoneNumber,
                department:req.body.department,
                role:req.body.role,
                dateOfJoining:req.body.dateOfJoining,

            }
        })
        res.json({message:'User Pushed'});
    }catch(error){
        if(error.code=="P2002" && error.message.includes("email")){
            res.json({message:"Email already exists"})
            return;
        }
        if(error.code=="P2002" && error.message.includes("employeeId")){
            res.json({message:"Employee Id already exists"})
            return;
        }
        res.json({message:'Error Occured'});
    }
})

app.get('/get-user', async(req, res)=>{
    const id = req.query.search;   
    try {
        const employee = await client.employee.findUnique({
            where: {
                employeeId: id,
            }
        });
        if (!employee) {
            return res.json({ message: "Employee not found" });
        }
        res.send(employee);
    } catch (error) {
        res.json({ message: "Server error" });
    }
});


app.delete('/del-user',async (req,res)=>{
    try{
    const id = req.query.delid;
    const data=await client.Employee.delete({
        where : {
            employeeId:id,
        }
    });
    res.json({message:`User ${id} Deleted Successfully`});
}
catch(err){
    res.json({message:"error during deletion"})
}
});

app.post('/update-user',async (req,res)=>{
    try{
        const id = req.body.id;
        const data = await client.employee.update({
            where :{
                employeeId:id,
            },
            data:{
                name:req.body.name,
                email:req.body.email,
                employeeId:req.body.employeeId,
                phoneNumber:req.body.phoneNumber,
                department:req.body.department,
                role:req.body.role,
                dateOfJoining:req.body.dateOfJoining,
            }
        });
        res.json({message:`User ${id} Updated Successfully`});
    }
    catch(err){
        res.json({message:"Error during Updation"})
    }
});

app.listen(port , () => console.log("Listening 3000"));