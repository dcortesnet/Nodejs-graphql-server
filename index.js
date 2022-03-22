import { ApolloServer, gql } from "apollo-server";

const persons = [
  {
    name: "John",
    age: 20,
    phone: "123-456-7890",
    street: "123 Main St",
    city: "Anytown",
    id: "123-456-7890",
  },
  {
    name: "Jane",
    age: 22,
    phone: "123-456-2123",
    street: "123 Hook St",
    city: "New York",
    id: "123-456-7890",
  },
];

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
  }
`;

const resolvers = {
  Query: {
    personsCount: () => persons.length,
    getAllPersons: () => persons,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  {
    console.log(`🚀  Server ready at ${url}`);
  }
});
