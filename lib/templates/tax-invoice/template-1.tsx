"use client";
import { BillDetails, RecordType } from "@/lib/constants";
import { numberToWords } from "@/lib/utils-helper/calculation/numberToWord";
import { joinValues } from "@/lib/utils-helper/string/string";
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useTheme } from "next-themes";

const bankDetails = [
  {
    id: "Bank/bankName",
    field: "Bank Name",
  },
  {
    id: "Bank/accountNumber",
    field: "Account Number",
  },
  {
    id: "Bank/ifscCode",
    field: "IFSC Code",
  },
];

// Refactor EdgeCase to accept props
interface EdgeCaseProps {
  value: any;
  addOn?: string;
  style: any;
  theme?: any;
  field?: any;
}

interface KeyValue {
  value: any;
  field: string;
  style?: any;
  titleStyle?: any;
  valueStyle?: any;
  theme?: any;
  edgeCase?: any;
}

const getNestedValue = (obj: any, path: string, splitValue = "/") => {
  console.log({ obj, path });
  return path
    .split(splitValue || "/")
    .reduce((acc, part) => acc && acc[part], obj);
};

export const TemplateOne = ({ data, theme = "light", download }: any) => {
  console.log({ billDetailssss: data });
  console.log({ theme, download });

  const customerAdd = joinValues([
    data?.Customer?.address?.addressLine1,
    data?.Customer?.address?.addressLine2,
    data?.Customer?.address?.city,
  ]);

  const customerAddress = customerAdd
    ? customerAdd.concat(
        data?.Customer?.address?.zip
          ? `, India - ${data?.Customer?.address?.zip}`
          : ", India"
      )
    : "";

  const EdgeCaseIndicator = ({ value = "", indicatorStyle = {} }) => {
    if (!value) return null;
    if (value && !download)
      return (
        <View style={[styles(theme).edgeCaseIndicator, indicatorStyle]}>
          <Text style={[styles(theme).keyValueField, styles(theme).italic]}>
            ~~
          </Text>
          <Text style={[styles(theme).keyValueField, styles(theme).italic]}>
            {value}
          </Text>
          <Text style={[styles(theme).keyValueField, styles(theme).italic]}>
            ~~
          </Text>
        </View>
      );
    else return <div />;
  };
  const EdgeCase: React.FC<EdgeCaseProps> = ({
    field,
    value,
    addOn,
    style = {},
  }) => {
    // Your component logic here

    if (!value) return <EdgeCaseIndicator value={field} />;
    return (
      <Text style={style}>
        {value} {addOn}
      </Text>
    );
  };

  const KeyValue: React.FC<KeyValue> = ({
    value,
    field,
    edgeCase,
    style = {},
    titleStyle = {},
    valueStyle = {},
  }) => {
    console.log({ field, value });
    // Your component logic here

    if (!value)
      return (
        <EdgeCaseIndicator value={edgeCase || field} indicatorStyle={style} />
      );
    return (
      <View style={[styles(theme).keyValue, style]}>
        <Text style={[styles(theme).keyValueField, titleStyle]}>
          {field} :{" "}
        </Text>
        <Text style={[styles(theme).textXs, valueStyle]}>{value}</Text>
      </View>
    );
  };

  const tableHeadings = [
    { id: "sNo", label: "SNo", width: "27px" },
    { id: "description", label: "Description" },
    { id: "hsnSac", label: "HSN/SAC", width: "60px" },
    { id: "qty", label: "Qty", width: "80px" },
    { id: "rate", label: "Rate", width: "65px" },
    { id: "tax", label: "Tax", width: "35px" },
    { id: "amount", label: "Amount", width: "75px" },
  ];

  const getTableValues = (item: any, index: any) => {
    return {
      sNo: index + 1,
      description: item?.product?.printName,
      hsnSac: item?.product?.hsnCode,
      qty: item?.quantity + " " + item?.product?.unit,
      rate: item?.rate,
      tax: item?.gstSales,
      amount: item?.rate * item?.quantity,
    };
  };

  return (
    <View style={styles(theme).page}>
      <View>
        <Text style={styles(theme).shopName}>{data?.Shop?.name}</Text>
        <View style={{ ...styles(theme).shopDetails }}>
          <View style={styles(theme).wFull}>
            <EdgeCase
              value={data?.Shop?.address?.addressLine1}
              addOn=","
              style={styles(theme).textXs}
            />
            <EdgeCase
              value={data?.Shop?.address?.addressLine2}
              addOn=","
              style={styles(theme).textXs}
            />
            <EdgeCase
              field={"City"}
              value={data?.Shop?.address?.city}
              addOn=","
              style={styles(theme).textXs}
            />
            <EdgeCase
              field={"State"}
              value={data?.Shop?.address?.state}
              addOn=","
              style={styles(theme).textXs}
            />
            <EdgeCase
              value={`India - ${data?.Shop?.address?.zip}`}
              addOn="."
              style={styles(theme).textXs}
            />
            <KeyValue
              field={"State Code"}
              value={data?.shopStateCode}
              titleStyle={{ fontWeight: "bold" }}
              theme={theme}
            />
          </View>
          <View style={[styles(theme).wFull]}>
            <KeyValue
              field={"Telephone"}
              value={data?.Shop?.phoneNumbers}
              theme={theme}
              style={styles(theme).textContainer}
            />
            <KeyValue
              field={"Email"}
              value={data?.Shop?.email}
              style={styles(theme).textContainer}
            />
            <KeyValue
              field={"Website"}
              value={data?.Shop?.website}
              style={styles(theme).textContainer}
            />
          </View>
        </View>
        <View style={styles(theme).billTagLine}>
          <KeyValue
            field={"GSTIN"}
            value={data?.gstIn}
            style={styles(theme).textContainer}
          />
          <Text style={styles(theme).fontBold}>
            {(RecordType as any)[data?.type]}
          </Text>
          <Text style={{ fontSize: "10px" }}>Original for Recipient</Text>
        </View>
        <View style={styles(theme).customerAndBillDetailsSection}>
          <View style={styles(theme).customerSection}>
            <KeyValue
              field={"Name"}
              edgeCase="Customer Name"
              value={data?.Customer?.customerName}
            />
            <KeyValue
              field={"Phone"}
              edgeCase="Customer Phone Number"
              value={data?.Customer?.phoneNumbers}
            />
            <KeyValue
              field={"GSTIN"}
              edgeCase="Customer GSTIN"
              value={data?.Customer?.gstIn}
            />
            <KeyValue
              field={"Address"}
              edgeCase="Customer Address"
              value={customerAddress}
            />
            <KeyValue
              field={"State Code"}
              value={data?.customerStateCode}
              edgeCase={"Customer State Code"}
            />
          </View>
          <View style={styles(theme).billDetailsSection}>
            <KeyValue field={"Bill Number"} value={data?.billNumber} />
            <KeyValue field={"Date"} value={(data?.date).slice(0, 10)} />
            {data?.type === "TAX_INCVOICE" ? (
              <KeyValue
                field={"Due Date"}
                value={(data?.dueDate).slice(0, 10)}
              />
            ) : null}
            <KeyValue field={"Payment"} value={data?.paymentTerms} />
          </View>
        </View>
      </View>
      <View style={styles(theme).table}>
        <View style={styles(theme).tableRow}>
          {tableHeadings.map((item, index) => (
            <View
              key={index}
              style={{
                ...styles(theme).tableCol,
                ...(item?.width ? { width: item?.width } : { flex: 1 }),
              }}
            >
              <Text style={styles(theme).tableCellLeft}>{item?.label}</Text>
            </View>
          ))}
        </View>

        <View>
          {data?.items?.map((item: any, index: number) => {
            return (
              <View style={styles(theme).tableRow}>
                <View style={{ ...styles(theme).tableCol, width: "27px",borderLeft:'none' }}>
                  <Text style={styles(theme).tableCellLeft}>{index + 1}</Text>
                </View>
                <View style={{ ...styles(theme).tableCol, flex: 1 }}>
                  {" "}
                  <Text style={styles(theme).tableCellLeft}>
                    {item?.product?.printName}
                  </Text>
                </View>
                <View style={{ ...styles(theme).tableCol, width: "60px" }}>
                  <Text style={styles(theme).tableCellLeft}>
                  {item?.product?.hsnCode}
                  </Text>
                </View>
                <View style={{ ...styles(theme).tableCol, width: "80px" }}>
                  <Text style={styles(theme).tableCellLeft}>
                    {item?.cost || 0} {item?.product?.unit}
                  </Text>
                </View>
                <View style={{ ...styles(theme).tableCol, width: "65px" }}>
                  <Text style={styles(theme).tableCellRight}>
                    {(item?.cost)?.toFixed(2)}
                  </Text>
                </View>
                <View style={{ ...styles(theme).tableCol, width: "35px" }}>
                  <Text style={styles(theme).tableCellRight}>
                    {item?.product?.gstSales || 0} %
                  </Text>
                </View>
                <View
                  style={{
                    ...styles(theme).tableCol,
                    width: "75px",
                  }}
                >
                  <Text style={styles(theme).tableCellRight}>
                    {(item?.quantity * item?.cost).toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View>
        <View style={styles(theme).customerAndBillDetailsSection}>
          <View style={styles(theme).bankDetailsSection}>
            <Text
              style={{
                ...styles(theme).textXs,
                ...styles(theme).sectionHeader,
                borderTop: "0px",
              }}
            >
              Bank Details
            </Text>
            <View
              style={{
                paddingHorizontal: "2px",
                paddingVertical: "2px",
                minHeight: "60px",
              }}
            >
              {bankDetails.map((item, index) => {
                const value = getNestedValue(data, item.id);
                console.log({ itemsss: item, value });
                return <KeyValue field={item?.field} value={value} />;
              })}
            </View>

            <View>
              <Text
                style={{
                  ...styles(theme).textXs,
                  ...styles(theme).sectionHeader,
                }}
              >
                Total Taxable Amount in Words
              </Text>
              <Text
                style={{
                  ...styles(theme).textXs,
                  ...{ fontSize: "12px", padding: "4px" },
                }}
              >
                {numberToWords(data?.total || 0)} only
              </Text>
            </View>
          </View>

          <View style={styles(theme).amountDetailsSection}>
            {data?.cumulativeReport?.slice(1)?.map((item: any, index: any) => {
              console.log({ itemsss: item });
              return (
                <KeyValue
                  field={item?.label}
                  value={`${item?.symbol} ${item?.field}`}
                  style={styles(theme).amountSection}
                  valueStyle={styles(theme).amountValueSecondary}
                />
              );
            })}

            <KeyValue
              field={"NET AMOUNT"}
              value={`${data?.total}`}
              style={{ ...styles(theme).amountSection, borderBottom: "0px" }}
              titleStyle={{ fontSize: "16px" }}
              valueStyle={{
                ...styles(theme).amountValueSecondary,
                fontSize: "16px",
              }}
            />
          </View>
        </View>

        <View style={styles(theme).remarks}>
          <Text
            style={[
              styles(theme).remarksContainer,
              { borderRight: "1px solid #000" },
            ]}
          >
            E. & O. E. :{" "}
          </Text>
          <Text style={styles(theme).remarksContainer}>Remarks : </Text>
        </View>
        <View style={styles(theme).remarks}>
          <View style={styles(theme).leftSection}>
            <Text
              style={{
                ...styles(theme).sectionHeader,
                ...{ fontSize: "12px" },
              }}
            >
              Terms & Conditions
            </Text>
            <Text style={{ fontSize: "10px", padding: "1px" }}>
              1jfgdf fdjjgd gedjn
            </Text>
          </View>

          <View style={styles(theme).rightSection}>
            <View>
              <Text style={styles(theme).centerText}>
                Certified that the above information are true and correct
              </Text>
              <Text
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                For {data?.Shop?.name.toUpperCase()},
              </Text>
            </View>
            <View style={styles(theme).signatureSection}></View>
            <View>
              <Text style={styles(theme).rightAlignedText}>
                &#40; Authorised Signature &#41;
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const colors = {
  dark: {
    white: "black",
    black: "white",
  },
  light: {
    white: "white",
    black: "black",
  },
};

const getThemeColor = (theme: any, color: any) => {
  console.log({ theme, color });
  return (colors as any)?.[theme]?.[color] || color;
};

const styles = (theme: any) =>
  StyleSheet.create({
    keyValue: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "4px",
    },
    keyValueField: {
      fontWeight: "bold",
      fontStyle: "bold",
      color: "black",
      fontSize: "12px",
    },
    edgeCaseIndicator: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      // gap: "2px",
      opacity: 0.5,
    },
    edgeCaseIndicatorLine: {
      opacity: 0.5,
    },
    page: {
      border: "1.5px solid #000",
      flex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    textContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    shopName: {
      textAlign: "center",
      width: "100%",
      fontWeight: "bold",
      color: "black",
    },
    shopDetails: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "4px",
    },
    billTagLine: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #000",
      paddingHorizontal: "4px",
    },
    customerAndBillDetailsSection: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #000",
      borderBottom: "1px solid #000",
      width: "100%",
      // gap: "4px",
    },
    customerSection: {
      flex: 1,
      padding: "4px",
    },
    billDetailsSection: {
      flex: 1,
      padding: "4px",
      borderLeft: "1px solid #000",
    },
    amountSection: {
      borderBottom: "1px solid #000",
      justifyContent: "flex-end",
    },
    remarks: {
      display: "flex",
      flexDirection: "row",
    },
    remarksContainer: {
      width: "50%",
      padding: "4px",
      fontSize: "12px",
    },
    sectionHeader: {
      borderTop: "1px solid #000",
      borderBottom: "1px solid #000",
      textAlign: "center",
      padding: "1px",
    },
    bankDetailsSection: {
      width: "55%",
    },
    amountDetailsSection: {
      width: "45%",
      borderLeft: "1px solid #000",
    },
    // amountField: {
    //   fontSize: "14px",
    //   fontWeight: "bold",
    //   padding: "2px",
    //   textAlign: "right",
    // },
    amountValueSecondary: {
      fontWeight: "bold",
      borderLeft: "1px solid #000",
      width: "100px",
      padding: "2px",
      textAlign: "right",
    },
    signatureSection: {
      height: 48,
      borderTop: "0.5px solid #000",
      borderBottom: "0.5px solid #000",
    },

    // container: {
    //   display: "flex",
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    //   width: "100%",
    //   borderTopWidth: 1,
    //   borderColor: "#000",
    // },
    leftSection: {
      width: "50%",
    },
    rightSection: {
      width: "50%",
      borderLeft: "1px solid #000",
      borderTop: "1px solid #000",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    centerText: {
      fontSize: 10,
      textAlign: "center",
      marginVertical: 2,
    },
    italic: {
      fontStyle: "italic",
    },
    rightAlignedText: {
      fontSize: 10,
      textAlign: "right",
      padding: "4px",
    },
    border: {
      border: "1px solid #000",
    },
    p2: {
      padding: "2px",
    },
    textCenter: {
      textAlign: "center",
    },
    flex: {
      display: "flex",
      flexDirection: "row",
    },
    wFull: {
      width: "100%",
    },
    textXs: {
      fontSize: "12px",
      color: "black",
    },
    fontBold: {
      fontWeight: "bold",
    },
    borderY: {
      borderTop: "1px solid #000",
      borderBottom: "1px solid #000",
    },
    opacity50: {
      opacity: 0.5,
    },
    borderBottom: {
      borderBottom: "1px solid #000",
    },

    table: {
      display: "flex",
      flex: 1,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      textAlign: "left",
    },
    tableCellLeft: {
      fontSize: 11,
      paddingVertical: 2,
      paddingHorizontal: 3,
      textAlign: "left",
    },
    tableCellRight: {
      fontSize: 11,
      paddingVertical: 2,
      paddingHorizontal: 3,
      textAlign: "right",
    },
  });

export default TemplateOne;
