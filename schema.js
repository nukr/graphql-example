var {
  graphql,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} = require('graphql');

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: () => ({
    field1: {
      type: GraphQLString,
      resolve: createResolver(tracer, validator, business, pipeline),
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQuery,
});

function tracer(root, args, context, info) {
  console.log('tracing >>>', info.path.key);
}

/**
 * validator
 *
 * @param {Object} args
 * @param {Number} args.price
 * @returns {bool}
 */
function validator(root, args, context, info) {
  return true;
}

function business(root, args, context, info) {
  return 'hihi';
}

function pipeline(data) {
  return data + 'qqqqqqqqqqqqqqqqq';
}

function createResolver(tracer, validator, business, pipeline) {
  return async function(...args) {
    await tracer(...args);
    const valid = await validator(...args);
    if (!valid) {
      return null;
    }
    let result = await business(...args);
    return await pipeline(result);
  };
}

module.exports = schema;
