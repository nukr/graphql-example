const http = require('http');
const schema = require('./schema');
const { graphql } = require('graphql');

http
  .createServer((req, res) => {
    graphql(schema, '{ field1 }')
      .then(data => {
        res.write(JSON.stringify(data));
        res.end();
      })
      .catch(err => {
        console.error(err);
      });
  })
  .listen(3000);
