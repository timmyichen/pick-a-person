# Pick-A-Person

A small app for picking names out of a hat. Built with Node/Express/React/MongoDB.  See live link here: [http://pick-a-person.herokuapp.com](http://pick-a-person.herokuapp.com)

## Setup and Installation

Clone this repository and enter it:
```
git clone https://github.com/timmyichen/pick-a-person
cd pick-a-person
```

Switch to the correct version of node (use `install` instead of `use` if not installed) and install the dependencies:
```
nvm use 8
npm install
```

In `/config`, you'll need to create a file called `.devKeys.js`.  The contents of the file should look like this:
```
module.exports = {
  mongoURI: <YOUR_MONGO_URI_HERE>,
}
```
(You can create a free MongoDB instance locally or using an online service such as [Mongodb Atlas](https://www.mongodb.com/cloud/atlas) or [MLab](https://mlab.com))

You'll also want to edit `clientConfig.js` within `/config` as well to point to wherever you're hosting the server.

Run the server by running `npm start`.  By default, this app runs on port 8080.  This can be changed in `/config/config.js`.

If you want to make changes or run it in devmode, which restarts the server whenever you make a change, use `npm run dev`.

If you want to make a build of your minified gzipped JS bundle, use `npm run build`.