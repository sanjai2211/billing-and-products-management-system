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

    const { searchParams } = req.nextUrl;
    const type = searchParams.get("type");

    let where: any = {};

    if (type === "shop") {
      where.shopId = id;
    } else {
      where.customerId = id;
    }

    const bank = await (prisma as any).bank.findMany({
      where,
    });

    return NextResponse.json(bank, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
