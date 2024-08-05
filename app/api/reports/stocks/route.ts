import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseQueryParams } from "@/lib/utils-helper/api/parseQueryParams";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const { productId, type, ...rest } = parseQueryParams(searchParams);
  let where: any = {};
  let selectItem: any = {};

  const product = await (prisma as any).productSnapshot.findMany({
    where: {
      productSnapId: productId,
    },
  });

  console.log({ prrrr: product });

  if (type === "customers") {
    where = {
      ...where,
      Stock: {
        customerId: productId,
      },
    };

    selectItem = {
      ...selectItem,
      cost: true,
      quantity: true,
      //   date: true,
      include: {
        Stock: {
          slect: {
            Customer: true,
          },
        },
        // Product: true,
      },
    };
  } else {
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
      //   date: true,
        Stock: {
          include : {
            Customer : true
          }
        },
        // Product: true,
      }
  }


  // if (!productid ) {
  //   return NextResponse.json({ error: "Bill productid  not found" }, { status: 400 });
  // }

  try {
    const reports = await (prisma as any).stockItem.findMany({
      where,
      select: selectItem,
    });

    if (!reports) {
      return NextResponse.json({ error: "Reports not found" }, { status: 404 });
    }

    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
