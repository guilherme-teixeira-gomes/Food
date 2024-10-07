/* eslint-disable */
import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";

const server = initIO(app);

server.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${process.env.PORT}`);
});

gracefulShutdown(server);
