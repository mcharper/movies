const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Movie {
    title: String,
    director: String
  }

  type Query {
    hello: String,
    movies: [Movie],
    url: String,
    envvar: String
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return "Hello, world!";
    },
    movies: (parent, args, context) => ([
      {
        title: "The Truman Show",
        director: "Peter Weir"
      }]),
    url: () => (process.env.URL),
    envvar: () => (process.env.MY_ENV_VAR)
  }
};

const getHandler = (event, context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
  });
  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
    event.requestContext = context;
  }
  return graphqlHandler(event, context);
}

exports.handler = getHandler;