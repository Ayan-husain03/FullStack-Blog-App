import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDb from "./src/database/db.js";
const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("server failed and db connection");
  });
