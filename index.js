const express = require('express');


const app = express();



app.get('/', (req, res) => {
	res.send('Home route')
})

app.listen(() => console.log(`Server is up!`));