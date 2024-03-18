import { prisma } from "../postgres";
import { data } from "./data";


export const seed = async () => {
  await prisma.book.createMany( {
    data: data
  } );
}


