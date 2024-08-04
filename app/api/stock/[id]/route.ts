import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNewNumber } from "../../generate-code/route";

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
    const stock = await (prisma as any).stock.findUnique({
      where: { id },
      include: {
        Bank: true,
        Customer: true,
        stockItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 400 });
    }

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
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Stock id not found" },
        { status: 400 }
      );
    }

    if (data?.dataStatus === "DRAFT") {
      data.stockCode = "";
    }

    const updatedStock = await (prisma as any).stock.update({
      where: { id },
      data,
      include: {
        stockItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (data?.dataStatus === "COMPLETED") {
      const productUpdates = updatedStock?.stockItems.map(async (item: any) => {
        const productId = item?.product?.productSnapId;
        const stockQuantity = item?.quantity;

        // Fetch the current product
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (product) {
          const newQuantity = product.openStock + stockQuantity;

          // Update the product's quantity
          await prisma.product.update({
            where: { id: productId },
            data: { openStock: newQuantity },
          });
        }
      });

      await Promise.all(productUpdates);

      if (!updatedStock?.stockCode) {
        const stockCode = await generateNewNumber({
          modelName: "stock",
          incrementField: "stockCode",
          initialNumber: "300001",
          where: {
            dataStatus: {
              not: "DRAFT",
            },
          },
        });

        console.log({ stockCode });
        await (prisma as any).stock.update({
          where: { id },
          data: { stockCode },
        });
      }
    }

    return NextResponse.json(
      { message: "Stock updated successfully" },
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

    if (stock?.dataStatus === "COMPLETED") {
      const productUpdates = stock?.stockItems?.map(async (item: any) => {
        const productId = item?.product?.productSnapId;
        const stockQuantity = item?.quantity;

        // Fetch the current product
        const product: any = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (product) {
          const newQuantity: any = product.openStock - stockQuantity;

          // Update the product's quantity
          await prisma.product.update({
            where: { id: productId },
            data: { openStock: newQuantity },
          });
        }
      });

      await Promise.all(productUpdates);
    }

    await (prisma as any).stockItem.deleteMany({
      where: { stockId: id },
    });

    await (prisma as any).stock.delete({
      where: { id },
    });

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
