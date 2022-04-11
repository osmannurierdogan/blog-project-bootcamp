const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
})
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}...`);
});
