import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseQueryParams } from "@/lib/utils-helper/api/parseQueryParams";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  console.log(searchParams);

  const { id, status, ...rest } = parseQueryParams(searchParams);

  if (!id) {
    return NextResponse.json({ error: "Shop id not found" }, { status: 400 });
  }

  console.log({ rest });

  const formattedRest = Object.entries(rest).reduce(
    (acc: any, [key, value]: any) => {
      acc[key] = {
        contains: value,
        mode: "insensitive",
      };
      return acc;
    },
    {}
  );

  const where = {
    shopId: id,

    status: status || {
      not: "DRAFT",
    },

    ...(formattedRest && formattedRest),
  };

  console.log({ where, formattedRest });

  try {
    const customer = await (prisma as any).product.findMany({
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
