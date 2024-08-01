import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newCustomer = await (prisma as any).customer.create({
      data,
    });
    
    if (!newCustomer || !newCustomer.id) {
      return NextResponse.json(
        { error: "Error in Creating a New Product" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Customer created successfully !" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
