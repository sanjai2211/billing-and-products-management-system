import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { generateNewNumber } from "../../generate-code/route";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    const { searchParams } = request.nextUrl;

    const checkExisiting = searchParams.get("checkExisiting");

    if (checkExisiting) {
      const getExisitingData = await (prisma as any).stock.findFirst({
        where: {
          shopId: input.shopId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      console.log({ getExisitingData });

      if (getExisitingData && getExisitingData.dataStatus === "IN_PROGRESS") {
        return NextResponse.json(
          {
            id: getExisitingData.id,
            message: "Stock got successfully!",
          },
          { status: 200 }
        );
      }
    }

    const stockCode = await generateNewNumber({
      modelName: "stock",
      incrementField: "stockCode",
      initialNumber: "300001",
      where: {
        dataStatus: {
          not: "DRAFT",
        },
      },
    });

    const newStock = await (prisma as any).stock.create({
      data: { ...input, stockCode },
    });
    console.log({ newStock });
    return NextResponse.json(
      {
        id: newStock.id,
        message: "Stock created successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
