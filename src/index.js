const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.listen({ port: process.env.PORT || 4000 });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          trackAPI: new TrackAPI(),
        },
      };
    },
  });

  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();
