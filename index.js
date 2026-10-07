const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');



require('dotenv').config();

const database = require('./config/database');
database.connect();

const systemConfig = require("./config/system");

const routeAdmin = require('./routes/admin/index.route');
const route = require('./routes/client/index.route');


const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Flash 
app.use(cookieParser("ABCDERRRR"));
app.use(session({ cookie: {maxAge: 60000 } }));
app.use(flash());
// End Flash 


//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

// Route
routeAdmin(app);
route(app);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
