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
        { error: "Bill id not found" },
        { status: 400 }
      );
    }

    const bill = await (prisma as any).bill.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    await Promise.all([
      (prisma as any).billingItems.deleteMany({
        where: { billId: id },
      }),
      (prisma as any).bill.update({
        where: { id },
        data: {
          bankId: null,
          customerId: null,
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Bill deleted successfully" },
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
