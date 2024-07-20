import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; type: string } }
) {
  const { id, type } = params;

  if (!id) {
    return NextResponse.json({ error: "Shop id not found" }, { status: 400 });
  }

  let where ={
    
  };

  where.shopId = id;

  if (type) {
    where.type = type;
  }

  try {
    const bill = await (prisma as any).bill.findUnique({
      where,
      include: {
        items: true,
      },
    });

    return NextResponse.json(bill, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
