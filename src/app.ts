import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

// funcion anonima autoinvocada
(async()=>{
  main()
})();


// funcion principal
function main() {
  const server = new Server({ 
    port: envs.PORT,
    routes: AppRoutes.routes
  });
  server.start()
}











