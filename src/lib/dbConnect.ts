import mongoose from "mongoose";

type ConnectedObject = {
    isConnected?: number
}

const connection: ConnectedObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected");
        return
    }
    try{
        const db = await mongoose.connect(process.env.MONGO_URL || '');
        connection.isConnected = db.connection.readyState;
        
        console.log("DB Connected Sucessfully");
    }catch(error){
        console.log("DB Connection failed", error);
        process.exit(1);
    }
}

export default dbConnect;