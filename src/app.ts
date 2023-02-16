import { Controllers } from "./controller";
import { Server } from "./server";
new Server().cross().registerControllers(Controllers).run(4002);
