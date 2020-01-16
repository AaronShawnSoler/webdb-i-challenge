const server = require('./server.js');
const db = require('./data/dbConfig');

const PORT = process.env.PORT || 4000;

server.get('/', (req, res) => {
  db.get()
  .then(response => res.send(response));
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});