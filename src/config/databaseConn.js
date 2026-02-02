 import { connect } from "mongoose";

 const dbConn = async () => {
    try{
         await connect(process.env.DATABASE)
         .then( () =>{
            console.log("database connected successfully.");
         })
         .catch( (err) => {
           console.log("could not connected to the database.", err);
         });
    }catch (error){
        console.log("could not connected to the database.", error);
        logger.error("Could not connect to the database.", error);
    }
 };

 export default dbConn;