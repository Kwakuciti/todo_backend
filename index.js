import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import TodoModel from './schemas/todo_schemas.js';


dotenv.config();
const app = express();
app.use(express.json());
const db = process.env.DB_URL;
const PORT = process.env.PORT || 3000

mongoose.connect(db,{
    useUnifiedTopology: true
}).then(()=> {console.log('Connected to MongoDB successfully')}).catch((err)=> {
    console.log(err)})


// create a Todo
app.post('/todos',async (req,res)=>{
   try {
       const newTodo =await TodoModel.create({...req.body})
         res.status(201).json({
             status: true,
             message: 'Todo created successfully',
             data: newTodo
         })}
         catch (error) {
             console.log('Something went wrong',error);
             //res.status(400).send('failed to fetch todo', error)

         }
            // get all todos
            app.get('/todos',async(req,res)=>{
                try {
                    const todos = await TodoModel.find({});
                    return res.status(200).json({
                        status: true,
                        message: 'Todos fetched successfully',
                        data: todos
                        }) 
                } catch (error) {
                    console.log('Something went Wrong', error)
                }
            })
        })


 // update  Todo
 app.patch('/todos/:id', async(req,res)=>{
    try{
        const{id} = req.params;
        const{status} = req.body;


        const updateTodo = await TodoModel.updateOne({status: status}).where({_id:id})
        return res.status(201).json({
            status: true,
            message: 'Todo updated Successfull',
            data: updateTodo
        })
    } catch  (err) {
    console.log('Something went wrong', error)
    }
})

     //delete a todo
     app.delete('/todos/:id',async(req,res)=>{
         try {
             const {id} = re.params;
             const deleteTodo = await TodoModel.findbyIdAndDelete(id);
             return res.status(201).json({
                 message: 'Todo dele successfully'
             })

         } catch (error) {
             console.log('Something went wrong',error);
         }
     }
     )


    app.listen(PORT)













