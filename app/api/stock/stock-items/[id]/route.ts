import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Stock id not found" }, { status: 400 });
  }

  try {
    const stock = await (prisma as any).stockItem.findMany({
      where: { stockId: id },
    });

    // if (!stock) {
    //   return NextResponse.json({ error: "Stock not found" }, { status: 400 });
    // }

    return NextResponse.json(stock, { status: 200 });
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
    console.log({id})
    const data = await req.json();
    console.log({data})

    if (!id) {
      return NextResponse.json(
        { error: "Stock Item id not found" },
        { status: 400 }
      );
    }

    const updatedStock = await (prisma as any).stockItem.update({
      where: { id },
      data,
    });
    console.log({ updatedStock });

    return NextResponse.json(
      { message: "Product updated successfully", updatedStock },
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
      return NextResponse.json(
        { error: "Stock id not found to delete" },
        { status: 400 }
      );
    }

    const stockItem = await (prisma as any).stockItem.findUnique({
      where: { id },
    });

    if (!stockItem) {
      return NextResponse.json(
        { error: "Stock Item not found" },
        { status: 404 }
      );
    }

    await (prisma as any).stockItem.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Stock Item deleted successfully" },
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
