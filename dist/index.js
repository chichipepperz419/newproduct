import "dotenv/config";
import { connectDB } from "./configuration/database.js";
import app from "./app.js";
connectDB();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map