import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const input = await request.json();
    

    const lastBill = (await prisma.bill.findFirst({
      orderBy: { createdAt: "desc" },
    })) as any;

    let newBillNumber = "100001";

    if (lastBill) {
      const lastNumber = parseInt(lastBill.billNumber, 10);
      newBillNumber = (lastNumber + 1).toString().padStart(6, "0");
    }

    let data : any = {
      billNumber: newBillNumber,
    };

    if (input) {
      data = {
        ...data,
        ...input,
      };
    }

    // Create the new bill
    const newBill = await prisma.bill.create({
      data,
    });

    return NextResponse.json(
      {
        id: newBill.id,
        message: "Bill created successfully!",
        billNumber: newBillNumber,
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
