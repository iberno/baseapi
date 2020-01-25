const express = require('express')
const bodyParser = require('body-parser')

// Router File
const auth = require('./routes/auth');
const login = require('./routes/login');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/register', auth);
app.use('/login', login);


require('./controllers/TasksConstroller')(app);

app.listen(3000);