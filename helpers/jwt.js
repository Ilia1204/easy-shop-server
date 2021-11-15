import expressJwt from 'express-jwt'

function authJwt() {
	const secret = process.env.secret
	return expressJwt({
		secret,
		algorithms: ['HS256'],
		isRevoked,
	}).unless({
		path: [
			{ url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
			{ url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS'] },
			{ url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
			{
				url: /\/api\/orders(.*)/,
				methods: ['GET', 'OPTIONS', 'POST'],
			},
			'http://localhost:5000/users/login',
			'http://localhost:5000/users/register',
		],
	})
}

async function isRevoked(req, payload, done) {
	if (!payload.isAdmin) {
		done(null, true)
	}

	done()
}

export default authJwt
