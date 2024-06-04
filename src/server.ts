import app from "./app";
import config from "./config";

const port = config.port || 9000;

let server;

const main = async () => {
  server = app.listen(port, () => {
    console.log(`Travel Buddy Matching server is running on port ${port}`);
  });
};

main();
