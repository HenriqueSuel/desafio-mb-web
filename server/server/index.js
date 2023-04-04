const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(cors());


const users = require("./routes/api/user");

app.use("/registration", users);

const vueRoutes = ['/', "/registration"];
vueRoutes.map((route) => app.use(route, express.static(path.join(__dirname, '/../../client/dist'))));

/*   const path = require('path');
app.use(express.static(path.join(__dirname, '/../public'))); */

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port} 🚀`));
