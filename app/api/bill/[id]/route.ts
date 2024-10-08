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
    const bill = await (prisma as any).bill.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        Bank: true,
        Customer: true,
        Shop: true,
      },
    });

    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 400 });
    }

    return NextResponse.json(bill, { status: 200 });
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
      return NextResponse.json({ error: "Bill id not found" }, { status: 400 });
    }

    const updatedBill = await (prisma as any).bill.update({
      where: { id },
      data,
    });

    if (data?.dataStatus === "COMPLETED" && data?.effectStock) {
      const billingItems = await (prisma as any).billingItems.findMany({
        where: { billId: id },
        include: {
          product: true,
        },
      });

      const updateStockPromises = billingItems.map(async (item: any) => {
        const productSnap = item.product;

        if (!productSnap?.productSnapId) return;

        const product = await (prisma as any).product.findUnique({
          where: { id: productSnap.productSnapId },
        });

        if (!product) return;

        const newOpenStock = (product.openStock || 0) - item.quantity;

        return (prisma as any).product.update({
          where: { id: product.id },
          data: { openStock: newOpenStock < 0 ? 0 : newOpenStock },
        });
      });

      await Promise.all(updateStockPromises);
      return NextResponse.json(
        { message: "Bill updated and stock adjusted successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Bill updated successfully" },
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
        { error: "Product id not found" },
        { status: 400 }
      );
    }

    const product = await (prisma as any).product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const checkAnyotherImpact = await (prisma as any).billingItems.findUnique({
      where: { productSnapId: id },
    });

    if (!checkAnyotherImpact)
      await (prisma as any).productSnapshot.delete({
        where: { productSnapId: id },
      });

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
