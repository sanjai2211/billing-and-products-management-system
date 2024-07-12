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
    const shop = await (prisma as any).shop.findUnique({
      where: { id },
    });

    if (!shop || !shop?.id) {
      return NextResponse.json(
        { error: "There is no shop exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(shop, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Shop id not found" },
        { status: 400 }
      );
    }

    const updatedProduct = await (prisma as any).shop.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      { message: "Product updated successfully", updatedProduct },
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
