import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Shop id not found" }, { status: 400 });
  }

  try {
    const shop = await (prisma as any).shop.findFirst({
      where: { id },
    });

    if (!shop || !shop?.id) {
      return NextResponse.json(
        { error: "There is no shop exists" },
        { status: 400 }
      );
    }

    const customers = await (prisma as any).customer.findMany({
      where: { shopId: id },
    });

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
