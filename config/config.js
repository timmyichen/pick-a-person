if (process.env.NODE_ENV != 'production') require('dotenv').load()

module.exports = {
	APPNAME: process.env.APPNAME || 'Pick a Person',
    PORT: process.env.PORT || 8080,
    DEVMODE: (process.env.NODE_ENV != 'production'),
    keys: process.env.NODE_ENV === 'production' ? require('./.prodKeys') : require('./.devKeys'),
}