import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const input = await request.json();

    const lastSnapShot = await prisma.productSnapshot.findFirst({
      where: {
        productSnapId: input.productId,
      },
      orderBy: { createdAt: "desc" },
    });

    const { productId, ...rest } = input;
    console.log({input,lastSnapShot})

    // Create the new stock item
    const newStockItem = await (prisma as any).stockItem.create({
      data: { ...rest, productSnapId: lastSnapShot?.id },
    });

    if (!newStockItem) {
      return NextResponse.json(
        { error: "Error in Creating a New Item" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "New Stock Item created successfully!",
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
