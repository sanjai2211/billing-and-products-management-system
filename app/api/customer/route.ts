import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseQueryParams } from "@/lib/utils-helper/api/parseQueryParams";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  console.log(searchParams)

  const { id, customerName, phoneNumbers, email, gstIn, ...rest } =
    parseQueryParams(searchParams);
console.log({rest})
  if (!id) {
    return NextResponse.json({ error: "Shop id not found" }, { status: 400 });
  }

  const where = {
    shopId: id,
    ...(rest && rest),
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
    ...(rest.customerType && {
      customerType: {
        in: Array.isArray(rest.customerType)
          ? rest.customerType
          : [rest.customerType],
      },
    }),
  };

  console.log({ where :where.customerType});

  try {
    const customer = await (prisma as any).customer.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
