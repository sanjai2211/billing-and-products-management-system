import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Customer id not found" }, { status: 400 });
  }

  try {
    const customer = await (prisma as any).customer.findFirst({
      where: { id },
    });

    if (!customer || !customer?.id) {
      return NextResponse.json(
        { error: "There is no customer exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(customer, { status: 200 });
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
        { error: "Customer id not found" },
        { status: 400 }
      );
    }

    const updatedCustomer = await (prisma as any).customer.update({
      where: { id },
      data,
    });
   
    return NextResponse.json(
      { message: "Customer updated successfully", updatedCustomer },
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
      return NextResponse.json({ error: "Customer id not found" }, { status: 400 });
    }

    await (prisma as any).customer.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Customer deleted successfully" },
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
