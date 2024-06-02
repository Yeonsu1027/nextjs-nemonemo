"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const SPEECH = prisma.tbl_speech;

export const speech_SelectAll = async () => {
  console.log("??");

  // return await prisma.tbl
  const result = await prisma.tbl_speech.findMany();
  // console.log("스피치", result);
  return result;
  // const result = await prisma.tbl_speech.findMany();
  // console.log("스피치", result);
};
