import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseQueryParams } from "@/lib/utils-helper/api/parseQueryParams";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const { productId, customerId, type, ...rest } =
    parseQueryParams(searchParams);
  let where: any = {};
  let selectItem: any = {};

  if (!productId && !customerId) {
    return NextResponse.json([], { status: 200 });
  }

  if ((productId && customerId) || productId) {
    where = {
      ...where,
      product: {
        productSnapId: productId,
      },
      Stock: {
        dataStatus: "COMPLETED",
      },
    };
    selectItem = {
      ...selectItem,
      cost: true,
      quantity: true,
      Stock: {
        include: {
          Customer: true,
        },
      },
    };
  } else {
    where = {
      ...where,
      Stock: {
        customerId,
        dataStatus: "COMPLETED",
      },
    };
    selectItem = {
      ...selectItem,
      cost: true,
      quantity: true,
      product: {
        select : {
          Product:true
        }
      },
      Stock: {
        include: {
          Customer: true,
        },
      },
    };
  }

  try {
    const reports = await (prisma as any).stockItem.findMany({
      where,
      select: selectItem,
    });

    let details = [];

    if (productId) {
      details = await (prisma as any).product.findUnique({
        where: {
          id: productId,
        },
      });
    } else {
      details = await (prisma as any).customer.findUnique({
        where: {
          id: customerId,
        },
      });
    }

    if (!reports) {
      return NextResponse.json({ error: "Reports not found" }, { status: 404 });
    }

    return NextResponse.json({ reports, details }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
