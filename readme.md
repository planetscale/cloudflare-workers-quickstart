## Cloudflare Workers quickstart

This repository contains a simple Cloudflare worker example that will run a query from a PlanetScale database that may be queried via HTTP. The rows are returned in the payload as JSON.

## How to use this demo

### Prerequisites

Before you can use this demo, make sure you have the following:

- A PlanetScale account
- A Cloudflare account
- NodeJS installed 

### 1 Create a database

This demo assumes you dont currently have a database set up to test with. A script is provided at `db/create_table.sql` that can be used to create a table and insert some data for testing.

Start by creating a PlanetScale database using the [guide located on our documentation portal](https://planetscale.com/docs/onboarding/create-a-database). Once the database has been created, you may run the script via the Console tab in the PlanetScale Dashboard.

### 2. Publish the Worker

Open the `worker` directory in your terminal and run the following command to install the dependencies:

```sh
npm install
```

Then run the following to publish the Worker to your Cloudflare account:

```sh
npx wrangler publish
```

### 3. Set up the integration in Cloudflare

Open Cloudflare in your browser. Navigate to Workers > Overview, and select you worker from the list. Once there, navigate to Settings > Integrations and click Add Integration in the PlanetScale card.

This will open a new page that will walk you through the process of connecting your PlanetScale database to Cloudflare:

1. Click Accept to allow this process to write secrets to your Worker.
2. Authenticate with PlanetScale. Make sure to allow access to the organization, database, and branch you wish to connect to.
3. Select your PlanetScale organization, click "**Continue**:.
4. Select your Database and User role, click "**Continue**". 
> More information on user roles can be found in our [documentation](https://planetscale.com/docs/concepts/password-roles).
5. Select the database branch you wish to connect to. Click "**Continue**".
6. Review the secrets that will be created. For the sake of this demo, these values can be left as-is.

Click "**Add Integration**" to complete the process.

### 4. Test the Worker function

In the overview of the worker, a preview URL is provided near the top of the page with the format `https://{PROJECT_NAME}.{ACCOUNT_NAME}.workers.dev`. Click that to open a new browser tab where the Worker will execute the code and return the results. 

If done correctly, you should data from the database in the browser window. If you used the sample script provided with this repository, the results will look like this:

```json
[
    {
        "id": 1,
        "name": "Hotel California",
        "address": "1967 Can Never Leave Ln, San Fancisco CA, 94016",
        "stars": 7.6
    },
    {
        "id": 2,
        "name": "The Galt House",
        "address": "140 N Fourth St, Louisville, KY 40202",
        "stars": 8
    }
]
```

Once the integration is configured, you can also run the project on your computer using:

```sh
npx wrangler dev
```

This will automatically use the secrets defined in Cloudflare to run the Worker on your computer. 

### 5. Test the HTTP methods (optional)

To test the various HTTP methods, you may also use the provided `tests.http` file which is designed to work with the [VSCode REST client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). The file is preconfigured to work with the local environment, or you can change the `@host` variable to match the URL provided in the Cloudflare dashboard that cooresponds with your Worker project.

## Related resources:

- On the blog: [Integrate Cloudflare Workers with PlanetScale](https://planetscale.com/blog/integrate-cloudflare-workers-with-planetscale)
- On YouTube: [Integrate PlanetScale with Cloudflare Workers](https://youtu.be/K21jb_yv33Y)
