const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
// Import createstore  function to set up our database,
const { createStore } = require('./utils');
// Import our data sources
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
// Create our database by calling createStore
// and pass it to the User API data source
const store = createStore();

const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    // Connect resolver map to Apollo Server
    resolvers,
    // add the dataSources function to our ApolloServer
    // to connect LaunchAPI and UserAPI to our graph
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store }),
    })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
