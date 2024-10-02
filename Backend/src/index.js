import { config } from "dotenv"
import connectDb from "./Db/index.js"
import { PORT } from "./constant.js"
import { app } from "./app.js"

config({
    path:"./env"
})
connectDb()
.then(()=>{
    app.on("Error",error =>{
        console.log("Server Error : ", error)
    })
    app.listen(PORT ||8043 , ()=>{
        console.log(`Server is running at port http://localhost:${PORT}`)
    })
})
.catch((err) => {
    console.error("MongoDB connection Failed !!!",err)
})