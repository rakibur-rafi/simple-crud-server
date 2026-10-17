import { MongoClient } from 'mongodb'
import 'dotenv/config'


const client= new MongoClient(process.env.MONGO_URI);

export const connectToDB= async ()=>{
    try {
        await client.connect();
        console.log('Connected to MongoDB', process.env.MONGO_URI);
        return client
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
