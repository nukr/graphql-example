const { graphql } = require('graphql');
const schema = require('./schema');

const query = `
{
  field1
}
`;

console.time('graphql');
graphql(schema, query)
  .then(function(data) {
    console.log(data);
    console.timeEnd('graphql');
  })
  .catch(function(err) {
    console.log(err);
  });
