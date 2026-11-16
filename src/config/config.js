import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI){
    console.log("NO REQ ENVIROMENTAL VARIABLES MONGO_URL");
}
if(!process.env.JWT_SECRET){
    console.log("jwt secret not present in files")
}

const config={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config;