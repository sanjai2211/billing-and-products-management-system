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
      const getExisitingData = await (prisma as any).bill.findFirst({
        where: {
          shopId: input.shopId,
          dataStatus : 'IN_PROGRESS',
          type : input.type
        },
        orderBy: {
          createdAt: "desc",
        },
      });

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

    const initialNumber : any = {
      BILL : '100001',
      TAX_INVOICE : '400001',
      QUOTATION : '500001'
    }

    const billNumber = await generateNewNumber({
      modelName: "bill",
      incrementField: "billNumber",
      initialNumber: initialNumber[input?.type] ,
      where: {
        dataStatus: {
          not: "DRAFT",
        },
      },
    });

    // Create the new bill
    const newBill = await prisma.bill.create({
      data: { ...input, billNumber },
    });

    return NextResponse.json(
      {
        id: newBill.id,
        message: "Bill created successfully!",
        billNumber,
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
