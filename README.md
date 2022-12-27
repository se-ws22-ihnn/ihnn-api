# ihnn-api v1.0

ExpressJS based interface for a ReactJS frontend to a MongoDB.

You need to specify an MONGO DB instance inside the `.env` file in order to start up the server. Without it the server will not start up (Expected uri: `mongodb://user:pass@address:port`).

It contains a frontend based on the [Swagger UI](https://www.npmjs.com/package/swagger-ui-express) which contains some small documentation.

### Disclaimer

Currently, no authentication is created in the project, each request is simply executed. As long as the database contains only questions this is halfway OK - secrets should NOT be stored in here!

## Development

```bash
npm install
npm run dev
```

then open [http://localhost:5555](http://localhost:5555)

it automaticly rerenders after every change

## Production

```bash
npm install
npm start
```

then open [http://localhost:5555](http://localhost:5555)

## Docker

```bash
docker build -t ihnn-api .
docker run -p 5555:3000 ihnn-api
```

then open [http://localhost:5555](http://localhost:5555)

🐞
