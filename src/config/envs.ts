import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  // variable PORT 
  PORT: get('PORT').required().asPortNumber(),

}