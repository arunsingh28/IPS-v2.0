

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.PORT || 8080;

const server = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

export default server;
