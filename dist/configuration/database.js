import mongoose from "mongoose";
const liveUrl = "mongodb://dev_chichi:chichi1994@ac-dxfpnvb-shard-00-00.hazqwyu.mongodb.net:27017,ac-dxfpnvb-shard-00-01.hazqwyu.mongodb.net:27017,ac-dxfpnvb-shard-00-02.hazqwyu.mongodb.net:27017/mydatabase?ssl=true&replicaSet=atlas-59pzbw-shard-0&authSource=admin&appName=Cluster0";
// local url = "mongodb://localhost:27017/nodejs_typescript"
export async function connectDB() {
    try {
        await mongoose.connect(liveUrl);
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
//# sourceMappingURL=database.js.map