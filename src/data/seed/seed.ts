import { prisma } from "../postgres";
import { data } from "./data";


export const seed = async () => {

  const books = await prisma.book.findMany();

  if (books.length > 0) return;

  await prisma.book.createMany( {
    data: data
  } );
}


