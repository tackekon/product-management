const express = require('express');
require('dotenv').config();

const database = require('./config/database');
database.connect();

const systemConfig = require("./config/system");

const routeAdmin = require('./routes/admin/index.route');
const route = require('./routes/client/index.route');


const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug');

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static('public'));

// Route
routeAdmin(app);
route(app);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
