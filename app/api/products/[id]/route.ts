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
    console.log({ shop });

    if (!shop || !shop?.id) {
      return NextResponse.json(
        { error: "There is no shop exists" },
        { status: 400 }
      );
    }

    const products = await (prisma as any).product.findMany({
      where: { shopId: id,status: { not: "DRAFT" } },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
