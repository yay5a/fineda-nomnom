const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('./config/connection');

const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server v4
const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const PORT = process.env.PORT || 5000;

// Apollo Server v4 startup function
const startApollo = async () => {
	// Start the Apollo Server
	await server.start();

	// Set up middleware
	app.use(
		'/graphql',
		cors({
			origin:
				process.env.NODE_ENV === 'production'
					? process.env.CLIENT_URL || 'https://your-app.com'
					: 'http://localhost:3000',
			credentials: true,
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => ({ req }),
		})
	);

	// Serve static files
	app.use(express.static(path.join(__dirname, '../client/build')));

	if (process.env.NODE_ENV !== 'production') {
		app.use(express.static(path.join(__dirname, '../client/public')));
	}

	// Catch-all handler for React Router
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});

	// Start the server after MongoDB connection
	mongoose.connection.once('open', () => {
		httpServer.listen(PORT, () => {
			console.log(`🚀 API initialized on localhost:${PORT}`);
			console.log(`📊 Use GraphQL at http://localhost:${PORT}/graphql`);
		});
	});
};

startApollo();
