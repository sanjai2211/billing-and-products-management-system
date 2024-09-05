import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseQueryParams } from "@/lib/utils-helper/api/parseQueryParams";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const { id, billNumber, name, phoneNumbers, email, gstIn,dataStatus, ...rest } =
    parseQueryParams(searchParams);

  if (!id) {
    return NextResponse.json({ error: "Shop id not found" }, { status: 400 });
  }

  const where = {
    shopId: id,
    dataStatus: dataStatus || {
      not: "DRAFT",
    },
    ...(billNumber && {
      billNumber: {
        contains: billNumber,
        mode: "insensitive",
      },
    }),
    ...rest,
    Customer: {
      ...(name && {
        name: {
          contains: name,
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
    const bill = await (prisma as any).bill.findMany({
      where,
      include: {
        Bank: true,
        items: {
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

    return NextResponse.json(bill, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
