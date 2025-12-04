import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';
import  bodyParser from 'body-parser'
import dotenv from 'dotenv';
import {lipaNaMpesa} from "./routes/lipaNaMpesa.js";
import {ngrokURL} from "./middleware/ngrokURL.js";
import {callback} from "./routes/callback.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

app.use(lipaNaMpesa);
app.use(ngrokURL);
app.use(callback);



app.get("/", ngrokURL, (req, res) => {
    console.log(req.domain);
    res.render("payment");
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));