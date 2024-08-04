import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateNewNumber({
  modelName,
  incrementField,
  where = {},
  padLength = 6,
  initialNumber = "100001",
}: any) {
  const lastRecord = await (prisma as any)[modelName].findFirst({
    where : {
      stockCode: {
        not: {
          in : [""]
        },
      },
      ...where
    },
    orderBy: {createdAt: "desc" },
  });

  let newNumber = initialNumber.toString();
  console.log({newNumber,lastRecord})

  if (lastRecord && lastRecord[incrementField] != null) {
    const lastNumber = parseInt(lastRecord[incrementField], 10);
    newNumber = (lastNumber + 1).toString().padStart(padLength, "0");
  }

  console.log({
    modelName,
    incrementField,
    where,
    padLength,
    initialNumber,
    lastRecord,
    newNumber,
  });

  return newNumber;
}
