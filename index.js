const server = require('./server.js');
const db = require('./data/dbConfig');

const PORT = process.env.PORT || 4000;

server.get('/', (req, res) => {
  db.get()
  .then(response => res.send(response));
})

server.get('/:id', (req, res) => {
  db.getById(req.params.id)
  .then(data => {
    if(data) {
      res.send(data);
    } else {
      res.status(404).json({ message: 'account not found'});
    }
  })
})

server.post('/', (req, res) => {
  if (req.body.name && req.body.budget) {
    const newAccount = {
      name: req.body.name,
      budget: req.body.budget
    }
    db.insert(newAccount);
    res.status(201).send(newAccount);
  } else {
    res.status(400).json({ message: 'please enter name and budget for account'});
  }
})

server.put('/:id', (req, res) => {
  const id = req.params.id;
  try {
    db.getById(id)
    .then(account => {
      if(account) {
        db.update(id, req.body)
        .then(response => res.status(204).send());
      } else {
        res.status(404).json({ message: 'account not found'});
      }
    })
  } catch {
    res.status(500).json({ error: 'error'})
  }
});

server.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(data => {
    if(data) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'account not found'});
    }
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});