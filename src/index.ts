import DotEnv from "dotenv";
import * as http from 'http';

import Server from './server';

DotEnv.config();
const port = process.env.SERVER_PORT;

const server = http.createServer(Server.instance);

server.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});
