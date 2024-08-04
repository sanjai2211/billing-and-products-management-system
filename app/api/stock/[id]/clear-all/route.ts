import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Stock id not found" },
        { status: 400 }
      );
    }

    const stock = await (prisma as any).stock.findUnique({
      where: { id },
      include: {
        stockItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 });
    }

    await Promise.all([
      (prisma as any).stockItem.deleteMany({
        where: { stockId: id },
      }),
      (prisma as any).stock.update({
        where: { id },
        data: {
          bankId: null,
          customerId: null,
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Stock deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Stock:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
