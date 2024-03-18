import express, { Router } from 'express'
import { requestLogger } from './middlewares/requestLogger';

interface Options {
  port: number;
  routes: Router
}


export class Server {
  
  public readonly app = express()
  private readonly port: number;
  private readonly routes: Router;
  
  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }


  async start() {

    //* Middlewares
    this.app.use(express.json());
    this.app.use(requestLogger)

    //* Routes
    this.app.use(this.routes);

    //* Start server
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });
  }

}


