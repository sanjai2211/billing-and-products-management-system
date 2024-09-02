import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newProduct = await (prisma as any).product.create({
      data,
    });
    const {openStock,stockValue,shopId,...rest } = data
    await (prisma as any).productSnapshot.create({
      data : {
        ...rest,
        productSnapId : newProduct?.id
      },
    });
    if (!newProduct || !newProduct.id) {
      return NextResponse.json(
        { error: "Error in Creating a New Product" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Product created successfully !" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
