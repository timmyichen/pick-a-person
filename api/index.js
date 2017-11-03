const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function sanitize(str) {
    return str.replace(/<(\/)*script>/gi,'[nice try]').replace(/<|>/gi, '');
}

function pickWinner(data) {
  const spread = data.reduce((arr, elem) => {
    for (let i=0; i<elem.quantity; i++) {
      arr.push(elem.index);
    }
    return arr;
  }, []);
  const randomIndex = Math.floor(Math.random() * spread.length);
  return data[spread[randomIndex]];
}

router.post('/new', (req, res) => {
  let { people, title } = req.body;
  people = sanitize(people);
  title = sanitize(title);
  const { db } = req.app.locals;
  db.collection('results').find().sort({id:-1}).limit(1).toArray((err, docs) => {
    if (err) {
      console.log(`error in searching for last object in db: ${err}`);
      return res.status(500).send();
    }
    
    const id = docs.length === 0 ? 0 : docs[0].id + 1;
    
    people = people.map(person => {
      if (person.name.trim().length === 0) person.name = 'Unnamed';
      return person;
    });
    if (title.trim().length === 0) title = 'Untitled Drawing';
    const winner = pickWinner(people);
    const created = Date.now();
    const obj = { id, people, title, winner, created };
    
    db.collection('results').insertOne(obj).then(response => {
      return res.send({ id });
    }).catch(err => {
      console.log(`error in inserting new obj ${obj} ${err}`);
    });
  });
});

router.get('/get-results/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { db } = req.app.locals;
  db.collection('results').findOne({ id })
    .then(response => {
      if (response) {
        return res.send(response);
      }
      return res.send({ error: 'not found' });
    });
});

//nothing matched our api requests, return 404
router.get('*', (req, res) => res.status(404).send({ error: 'Invalid API usage. Response not found.' }));

module.exports = router;