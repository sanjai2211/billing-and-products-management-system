import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newShop = await (prisma as any).shop.create({
      data,
    });

    if (!newShop || !newShop.id) {
      return NextResponse.json(
        { error: "Error in Creating a New Shop" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Shop created successfully !" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
