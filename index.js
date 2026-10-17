import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectToDB } from './config/db.js';
import { ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const conn= await connectToDB();
const db= conn.db('simple_crud');
const users= db.collection('users');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async(req, res)=>{
    const cursor= users.find({})
    const allUsers= await cursor.toArray()
    res.send(allUsers)
})

app.get('/users/:id', async(req,res)=>{
    const id= req.params.id
    const query= {_id: new ObjectId(id) }
    const user= await users.findOne(query)
    res.send(user)
})

app.post('/users', async(req, res)=>{
    const user= req.body
    const insert = await users.insertOne(user)
    res.send(insert)
})

app.delete('/users/:id', async(req, res)=>{
    const id= req.params.id
    const query= {_id: new ObjectId(id) }
    const result= await users.deleteOne(query)
    res.send(result)
})

app.patch('/users/:id', async(req, res)=>{
    const id= req.params.id
    const user= req.body

    const query= {_id: new ObjectId(id) }

    const options={
        upsert: true
    }

    const updateDoc={
        $set: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    }

    const result= await users.updateOne(query, updateDoc, options)
    res.send(result)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});