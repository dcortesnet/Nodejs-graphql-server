import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";

const json = fs.readFileSync("./persons.db.json", "utf8");
const persons = JSON.parse(json);

const typeDefs = gql`
  type Person {
    name: String!
    phone: String
    age: Int
    city: String
    id: ID!
  }

  type Query {
    personsCount: Int
    getAllPersons: [Person]!
    getPersonById(id: String!): Person
  }
`;

const resolvers = {
  Query: {
    personsCount: () => persons.length,
    getAllPersons: () => persons,
    getPersonById: (root, args) => persons.find((person) => person.id === args.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  {
    console.log(`🚀  Server ready at ${url}`);
  }
});
