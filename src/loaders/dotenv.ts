import * as dotenv from "dotenv";

export default function init(): void {
  dotenv.config({ path: `${__dirname}/../../.env` });  
}
