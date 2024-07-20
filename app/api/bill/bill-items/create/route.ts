import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const input = await request.json();

    const lastSnapShot = await (prisma as any).productSnapshot.findFirst({
      where: {
        productSnapId: input.productId,
      },
      orderBy: { createdAt: "desc" },
    });

    const { productId, ...rest } = input;

    // Create the new bill
    const newBillingItem = await prisma.billingItems.create({
      data: { ...rest, productSnapId: lastSnapShot?.id },
    });

    if (!newBillingItem) {
      return NextResponse.json(
        { error: "Error in Creating a New Item" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "New Billing Item created successfully!",
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
