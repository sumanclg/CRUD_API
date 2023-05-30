import express from 'express';
const app = express();
import { join } from "path";
import web from "./routes/web.js";
import mongoose from 'mongoose';
const url = "mongodb://127.0.0.1:27017/schooldb";



mongoose.connect(url, {
  useNewUrlParser: true
});

const con = mongoose.connection;


con.on("open", () => {
    console.log("Database connected...")
})


app.use(express.urlencoded({extended: false}))



// Static Files
app.use("/student", express.static(join(process.cwd(), "public")));
app.use("/student/edit", express.static(join(process.cwd(), "public")));


// Set Template Engine
app.set("view engine", "ejs");
app.use("/student", web);

















const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`);
})