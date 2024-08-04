import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseQueryParams } from "@/lib/utils-helper/api/parseQueryParams";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const {
    shopId,
    dataStatus,
    customerName,
    phoneNumbers,
    email,
    gstIn,
    ...rest
  } = parseQueryParams(searchParams);

  if (!shopId) {
    return NextResponse.json({ error: "Shop id not found" }, { status: 400 });
  }

  const where = {
    shopId,
    dataStatus: dataStatus || {
      not: "DRAFT",
    },
    Customer: {
      ...(customerName && {
        customerName: {
          contains: customerName,
          mode: "insensitive",
        },
      }),
      ...(phoneNumbers && {
        phoneNumbers: {
          contains: phoneNumbers.toString(),
          mode: "insensitive",
        },
      }),
      ...(email && {
        email: {
          contains: email,
          mode: "insensitive",
        },
      }),
      ...(gstIn && {
        gstIn: {
          contains: gstIn,
          mode: "insensitive",
        },
      }),
    },
  };

  console.log({ where });

  try {
    const stock = await (prisma as any).stock.findMany({
      where,
      include: {
        Bank: true,
        stockItems: {
          include: {
            product: true,
          },
        },
        Customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(stock, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
