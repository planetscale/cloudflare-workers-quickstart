import { connect } from '@planetscale/database';
import { withContent, ThrowableRouter, } from 'itty-router-extras';

// Creates a PlanetScale connection object and returns it
function getPlanetScaleConnection(env) {
  const config = {
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    fetch: (url, init) => {
      delete (init)["cache"];
      return fetch(url, init);
    }
  }
  return connect(config)
}

const router = ThrowableRouter()

// Return a list of hotels
router.get("/", async (request, env) => {
  const conn = getPlanetScaleConnection(env)
  const data = await conn.execute('SELECT * FROM hotels;')
  return new Response(JSON.stringify(data.rows), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
})

// Return a single hotel based on it's ID
router.get("/:id", async ({ params }, env) => {
  const conn = getPlanetScaleConnection(env)
  const data = await conn.execute('SELECT * FROM hotels where id = :id;', {
    id: params.id
  })

  if(data.rows.length == 0) {
    return new Response("", { status: 404 })
  }

  return new Response(JSON.stringify(data.rows[0]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
})

// Create a hotel
router.post("/", withContent, async ({ content }, env) => {
  const { name, address, stars } = content

  const conn = getPlanetScaleConnection(env)
  const data = await conn.execute('INSERT INTO hotels (name, address, stars) VALUES (:name, :address, :stars);', {
    name,
    address,
    stars
  })
  
  const newHotel = {
    id: +data.insertId,
    name,
    address,
    stars
  }

  return new Response(JSON.stringify(newHotel), {
    status: 201,
    headers: {
      "Content-Type": "application/json"
    }
  })
})

// Update a hotel given its ID
router.put("/:id", withContent, async ({ params, content }, env) => {
  const { id } = params
  const { name, address, stars } = content

  const conn = getPlanetScaleConnection(env)
  await conn.execute('UPDATE hotels SET name=:name, address=:address, stars=:stars WHERE id=:id;', {
    id,
    name,
    address,
    stars
  })

  return new Response("ok", {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
})

// Delete a hotel based on ID
router.delete("/:id", async ({ params }, env) => {
  const { id } = params

  const conn = getPlanetScaleConnection(env)
  await conn.execute('DELETE FROM hotels WHERE id=:id;', {
    id,
  })

  return new Response("ok", {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
})

// Catchall
router.all("*", () => new Response("404, not found!", { status: 404 }))

export default {
  fetch: router.handle
}