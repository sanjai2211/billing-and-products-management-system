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
    const bill = await (prisma as any).billingItems.findMany({
      where: { billId :  id },
      include: {
        product: {
          select : {
            printName : true,
            code : true,
            gstSales : true,
            igstSales : true,
            hsnCode : true,
            unit : true,
            cost : true,
            productSnapId : true
          }
        }, 
      },
    });

    // if (!bill) {
    //   return NextResponse.json({ error: "Bill not found" }, { status: 400 });
    // }

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
      return NextResponse.json(
        { error: "Bill Item id not found" },
        { status: 400 }
      );
    }

    const updatedProduct = await (prisma as any).billingItems.update({
      where: { id },
      data,
    });
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
      return NextResponse.json(
        { error: "Bill id not found to delete" },
        { status: 400 }
      );
    }

    const billItem = await (prisma as any).billingItems.findUnique({
      where: { id },
    });

    if (!billItem) {
      return NextResponse.json({ error: "Bill Item not found" }, { status: 404 });
    }

    await (prisma as any).billingItems.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Bill Item deleted successfully" },
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
