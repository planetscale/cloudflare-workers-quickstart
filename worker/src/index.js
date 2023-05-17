import { connect } from '@planetscale/database';

export default {
  async fetch(request, env) {
		const config = {
      host: env.DATABASE_HOST,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
			fetch: (url, init) => {
				delete (init)["cache"]; // Remove cache header
				return fetch(url, init);
			}
    }
    const conn = connect(config)
		const data = await conn.execute('SELECT * FROM hotels;')

    return new Response(JSON.stringify(data.rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
};