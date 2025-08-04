const { GraphQLError } = require('graphql');

const jwt = require('jsonwebtoken');

module.exports = (context) => {
	const authHeader = context.req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split('Bearer ')[1]; // Fixed: added space after 'Bearer'
		if (token) {
			try {
				const user = jwt.verify(token, 'secret_is_out');
				return user;
			} catch (error) {
				throw new GraphQLError('Invalid/Expired token', {
					extensions: { code: 'UNAUTHENTICATED' },
				});
			}
		}
	}
};
