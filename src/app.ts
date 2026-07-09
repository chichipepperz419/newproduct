import express from "express"
import userRouter from "./routes/userRoutes.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import ProductRouter from "./routes/product.routes.js"

const app = express()
app.use(express.json())
app.get("/", (req , res)=>{
    res.send("API is ready!!!")
})
 app.use("/user", userRouter)
 app.use("/product", ProductRouter)


 app.use(errorHandler)
 
 export default app
