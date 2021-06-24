//required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config()

//body parser is used to render JSON formatted responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const url = 'https://api.covalenthq.com/v1'
const key = process.env.COVALENT_API_KEY;


// *****  Routes *******

//Home
app.get('/', (req, res) => {
	res.status(200).json({ msg: "Hello World" })
});

//Token Balances Endpoints
//Formatted
app.get('/TokenBalances/address/:address/chain/:chainID/', (req, res) => {
	const address = req.params.address;
	const chain_id = req.params.chainID;

	try {
		fetch(`${url}/${chain_id}/address/${address}/balances_v2/?key=${key}`,
			{
				headers: { 'content-type': 'application/json' }
			}
		).then(data => {

			return data.json();

		}).then(response => {

			const crypto = [];
			const stablecoins = [];
			const dust = [];

			for (let item of response.data.items) {
				switch (item.type) {
					case ('cryptocurrency'):
						crypto.push({ 'contract_name': item.contract_name, 'contract_ticker_symbol': item.contract_ticker_symbol, 'logo_url': item.logo_url, 'balance': ((item.balance) / Math.pow(10, item.contract_decimals)), 'USD_value': item.quote });
						break;
					case ('stablecoin'):
						stablecoins.push({ 'contract_name': item.contract_name, 'contract_ticker_symbol': item.contract_ticker_symbol, 'logo_url': item.logo_url, 'balance': ((item.balance) / Math.pow(10, item.contract_decimals)), 'USD_value': item.quote });
						break;
					case ('dust'):
						dust.push({ 'contract_name': item.contract_name, 'contract_ticker_symbol': item.contract_ticker_symbol, 'logo_url': item.logo_url, 'balance': ((item.balance) / Math.pow(10, item.contract_decimals)), 'USD_value': item.quote });
						break;
				}
			}
			const resp = { 'cryptocurrencies': crypto, 'stablecoins': stablecoins, 'dust': dust }
			res.status(200).json(resp)
		})

	} catch (error) {
		res.status(500).json(error)
	}
});

//Raw
app.get('/TokenBalances/address/:address/chain/:chainID/raw', (req, res) => {

	const address = req.params.address;
	const chain_id = req.params.chainID;

	try {
		fetch(`${url}/${chain_id}/address/${address}/balances_v2/?key=${key}`,
			{
				headers: { 'content-type': 'application/json' }
			}
		).then(data => {

			return data.json();

		}).then(response => {
			res.status(200).json(response.data)
		})

	} catch (error) {
		res.status(500).json(error)
	}
});

//Error Handling (404 endpoint not found)
app.use((req, res, next) => {
	const error = new Error('404 Endpoint Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});


//server configuration to run the app
const port = 8000;
app.listen(port, () => console.log(`App running on port ${port}!`))

module.exports = app;