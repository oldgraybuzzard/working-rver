const express = require('express');
const exphbs = require ('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', ',./views');

app.get('/', (req, res) => {
  res.render('home');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
