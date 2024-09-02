import { getStockReportsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { StockReportsScreen } from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts({ params, searchParams }: any) {
//   const session = (await accessPage()) as any;
const session ={
      name: null,
      email: 'sanjaikumar2211e@gmail.com',
      image: undefined,
      userId: '6690a9ed05505c07ea6036eb',
      shopId: '669110d805505c07ea603856'
    }
  
  const queryParams = new URLSearchParams(searchParams);
  // const data = await getStockReportsByShopId(session?.shopId, queryParams);
  const data ={
    "reports": [
        {
            "cost": 50,
            "quantity": 24,
            "product": {
                "Product": {
                    "id": "669771af5a102591dbb41ff5",
                    "code": "230003",
                    "productName": "Product 3 Product ",
                    "printName": "Product 3 Product 3 ",
                    "category": "TOOLS_HARDWARE",
                    "unit": "PIECE",
                    "group": "Clinto",
                    "brand": "Clinto",
                    "cost": "56",
                    "mrp": "56",
                    "purchaseRate": "56",
                    "salesRate": "56",
                    "gstPurchase": "12",
                    "gstSales": "12",
                    "igstPurchase": "12",
                    "igstSales": "12",
                    "hsnCode": "0834",
                    "openStock": 116,
                    "stockValue": "8979",
                    "status": "AVAILABLE",
                    "createdAt": "2024-07-17T07:24:31.273Z",
                    "updatedAt": "2024-09-05T09:19:07.207Z",
                    "shopId": "669110d805505c07ea603856"
                }
            },
            "Stock": {
                "id": "66b224f22ef50d731c40bfdf",
                "stockCode": "300003",
                "shopId": "669110d805505c07ea603856",
                "bankId": null,
                "customerId": "66ab4d3b2e47532f1f5e9eb4",
                "createdAt": "2024-08-06T13:28:18.755Z",
                "updatedAt": "2024-08-06T13:28:51.254Z",
                "dataStatus": "COMPLETED",
                "Customer": {
                    "address": {
                        "addressLine1": null,
                        "addressLine2": null,
                        "city": null,
                        "state": null,
                        "zip": null
                    },
                    "id": "66ab4d3b2e47532f1f5e9eb4",
                    "customerName": "Akshith",
                    "printName": "Akshith",
                    "email": "akshith@gmail.com",
                    "faxNumber": null,
                    "phoneNumbers": "9994951597",
                    "customerType": "SUPPLIER",
                    "shopId": "669110d805505c07ea603856",
                    "gstIn": "GSTIN100008",
                    "bankId": null,
                    "createdAt": "2024-08-01T08:54:17.781Z",
                    "updatedAt": "2024-08-02T07:37:50.736Z"
                }
            }
        },
        {
            "cost": 12,
            "quantity": 20,
            "product": {
                "Product": {
                    "id": "669771ec5a102591dbb41ff7",
                    "code": "230004",
                    "productName": "Product 4",
                    "printName": "Product 4",
                    "category": "MACHINARIES",
                    "unit": "PIECE",
                    "group": "Derino",
                    "brand": "Derino",
                    "cost": "12",
                    "mrp": "12",
                    "purchaseRate": "12",
                    "salesRate": "12",
                    "gstPurchase": "8",
                    "gstSales": "8",
                    "igstPurchase": "8",
                    "igstSales": "8",
                    "hsnCode": "4563",
                    "openStock": 150,
                    "stockValue": "5689",
                    "status": "AVAILABLE",
                    "createdAt": "2024-07-17T07:25:32.732Z",
                    "updatedAt": "2024-09-05T14:35:16.229Z",
                    "shopId": "669110d805505c07ea603856"
                }
            },
            "Stock": {
                "id": "66b224f22ef50d731c40bfdf",
                "stockCode": "300003",
                "shopId": "669110d805505c07ea603856",
                "bankId": null,
                "customerId": "66ab4d3b2e47532f1f5e9eb4",
                "createdAt": "2024-08-06T13:28:18.755Z",
                "updatedAt": "2024-08-06T13:28:51.254Z",
                "dataStatus": "COMPLETED",
                "Customer": {
                    "address": {
                        "addressLine1": null,
                        "addressLine2": null,
                        "city": null,
                        "state": null,
                        "zip": null
                    },
                    "id": "66ab4d3b2e47532f1f5e9eb4",
                    "customerName": "Akshith",
                    "printName": "Akshith",
                    "email": "akshith@gmail.com",
                    "faxNumber": null,
                    "phoneNumbers": "9994951597",
                    "customerType": "SUPPLIER",
                    "shopId": "669110d805505c07ea603856",
                    "gstIn": "GSTIN100008",
                    "bankId": null,
                    "createdAt": "2024-08-01T08:54:17.781Z",
                    "updatedAt": "2024-08-02T07:37:50.736Z"
                }
            }
        },
        {
            "cost": 23,
            "quantity": 10,
            "product": {
                "Product": {
                    "id": "669771045a102591dbb41feb",
                    "code": "230001",
                    "productName": "Product 1",
                    "printName": "Product 1",
                    "category": "MACHINARIES",
                    "unit": "BOX",
                    "group": "Brila",
                    "brand": "Brila",
                    "cost": "23",
                    "mrp": "23",
                    "purchaseRate": "23",
                    "salesRate": "23",
                    "gstPurchase": "12",
                    "gstSales": "12",
                    "igstPurchase": "12",
                    "igstSales": "12",
                    "hsnCode": "8484",
                    "openStock": 129,
                    "stockValue": "2356",
                    "status": "AVAILABLE",
                    "createdAt": "2024-07-17T07:21:39.774Z",
                    "updatedAt": "2024-08-06T13:30:20.091Z",
                    "shopId": "669110d805505c07ea603856"
                }
            },
            "Stock": {
                "id": "66b224f22ef50d731c40bfdf",
                "stockCode": "300003",
                "shopId": "669110d805505c07ea603856",
                "bankId": null,
                "customerId": "66ab4d3b2e47532f1f5e9eb4",
                "createdAt": "2024-08-06T13:28:18.755Z",
                "updatedAt": "2024-08-06T13:28:51.254Z",
                "dataStatus": "COMPLETED",
                "Customer": {
                    "address": {
                        "addressLine1": null,
                        "addressLine2": null,
                        "city": null,
                        "state": null,
                        "zip": null
                    },
                    "id": "66ab4d3b2e47532f1f5e9eb4",
                    "customerName": "Akshith",
                    "printName": "Akshith",
                    "email": "akshith@gmail.com",
                    "faxNumber": null,
                    "phoneNumbers": "9994951597",
                    "customerType": "SUPPLIER",
                    "shopId": "669110d805505c07ea603856",
                    "gstIn": "GSTIN100008",
                    "bankId": null,
                    "createdAt": "2024-08-01T08:54:17.781Z",
                    "updatedAt": "2024-08-02T07:37:50.736Z"
                }
            }
        },
        {
            "cost": 25,
            "quantity": 12,
            "product": {
                "Product": {
                    "id": "669771af5a102591dbb41ff5",
                    "code": "230003",
                    "productName": "Product 3 Product ",
                    "printName": "Product 3 Product 3 ",
                    "category": "TOOLS_HARDWARE",
                    "unit": "PIECE",
                    "group": "Clinto",
                    "brand": "Clinto",
                    "cost": "56",
                    "mrp": "56",
                    "purchaseRate": "56",
                    "salesRate": "56",
                    "gstPurchase": "12",
                    "gstSales": "12",
                    "igstPurchase": "12",
                    "igstSales": "12",
                    "hsnCode": "0834",
                    "openStock": 116,
                    "stockValue": "8979",
                    "status": "AVAILABLE",
                    "createdAt": "2024-07-17T07:24:31.273Z",
                    "updatedAt": "2024-09-05T09:19:07.207Z",
                    "shopId": "669110d805505c07ea603856"
                }
            },
            "Stock": {
                "id": "66b225bf2ef50d731c40bff7",
                "stockCode": "300009",
                "shopId": "669110d805505c07ea603856",
                "bankId": null,
                "customerId": "66ab4d3b2e47532f1f5e9eb4",
                "createdAt": "2024-08-06T13:31:43.338Z",
                "updatedAt": "2024-08-06T13:32:19.735Z",
                "dataStatus": "COMPLETED",
                "Customer": {
                    "address": {
                        "addressLine1": null,
                        "addressLine2": null,
                        "city": null,
                        "state": null,
                        "zip": null
                    },
                    "id": "66ab4d3b2e47532f1f5e9eb4",
                    "customerName": "Akshith",
                    "printName": "Akshith",
                    "email": "akshith@gmail.com",
                    "faxNumber": null,
                    "phoneNumbers": "9994951597",
                    "customerType": "SUPPLIER",
                    "shopId": "669110d805505c07ea603856",
                    "gstIn": "GSTIN100008",
                    "bankId": null,
                    "createdAt": "2024-08-01T08:54:17.781Z",
                    "updatedAt": "2024-08-02T07:37:50.736Z"
                }
            }
        },
        {
            "cost": 4,
            "quantity": 41,
            "product": {
                "Product": {
                    "id": "669771625a102591dbb41ff1",
                    "code": "230002",
                    "productName": "Product 2",
                    "printName": "Product 2",
                    "category": "ELECTRONICS",
                    "unit": "PIECE",
                    "group": "Advait",
                    "brand": "Advait",
                    "cost": "56",
                    "mrp": "56",
                    "purchaseRate": "56",
                    "salesRate": "56",
                    "gstPurchase": "5",
                    "gstSales": "5",
                    "igstPurchase": "89",
                    "igstSales": "89",
                    "hsnCode": "9696",
                    "openStock": 83,
                    "stockValue": "5689",
                    "status": "COMING_SOON",
                    "createdAt": "2024-07-17T07:23:12.617Z",
                    "updatedAt": "2024-09-10T17:51:40.047Z",
                    "shopId": "669110d805505c07ea603856"
                }
            },
            "Stock": {
                "id": "66b225bf2ef50d731c40bff7",
                "stockCode": "300009",
                "shopId": "669110d805505c07ea603856",
                "bankId": null,
                "customerId": "66ab4d3b2e47532f1f5e9eb4",
                "createdAt": "2024-08-06T13:31:43.338Z",
                "updatedAt": "2024-08-06T13:32:19.735Z",
                "dataStatus": "COMPLETED",
                "Customer": {
                    "address": {
                        "addressLine1": null,
                        "addressLine2": null,
                        "city": null,
                        "state": null,
                        "zip": null
                    },
                    "id": "66ab4d3b2e47532f1f5e9eb4",
                    "customerName": "Akshith",
                    "printName": "Akshith",
                    "email": "akshith@gmail.com",
                    "faxNumber": null,
                    "phoneNumbers": "9994951597",
                    "customerType": "SUPPLIER",
                    "shopId": "669110d805505c07ea603856",
                    "gstIn": "GSTIN100008",
                    "bankId": null,
                    "createdAt": "2024-08-01T08:54:17.781Z",
                    "updatedAt": "2024-08-02T07:37:50.736Z"
                }
            }
        }
    ]
}
  const {reports,details} = data

  return <StockReportsScreen reports={reports} details={details} session={session} />;
}
