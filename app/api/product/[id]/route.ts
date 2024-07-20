import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Bill id not found" }, { status: 400 });
  }

  try {
    const billItems = await (prisma as any).productSnapshot.findUnique({
      where: { billId: id },
    });

    if (!billItems) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(billItems, { status: 200 });
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
        { error: "Product id not found" },
        { status: 400 }
      );
    }

    const updatedProduct = await (prisma as any).product.update({
      where: { id },
      data,
    });
    console.log({ updatedProduct });
    const { openStock, stockValue, shopId, ...rest } = data;

    if (rest) {
      await (prisma as any).productSnapshot.create({
        data: {
          ...rest,
          productId: id,
        },
      });
    }

    console.log({ updatedProduct });

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Bill id not found" }, { status: 400 });
    }

    const billItems = await (prisma as any).productSnapshot.findUnique({
      where: { billId: id },
    });

    if (!billItems) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await (prisma as any).product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
