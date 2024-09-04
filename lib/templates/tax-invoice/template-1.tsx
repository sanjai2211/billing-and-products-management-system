import { numberToWords } from "@/lib/utils-helper/calculation/numberToWord";
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";


const customerDetails = [
  {
    id: "Customer/customerName",
    field: "Name",
  },
  {
    id: "Customer/customerName",
    field: "Address",
  },
  {
    id: "Customer/phoneNumbers",
    field: "Phone",
  },
  {
    id: "Customer/gstIn",
    field: "GSTIn",
  },
];

const bankDetails = [
  {
    id: "billNumber",
    field: "Payment",
  },
  {
    id: "billNumber",
    field: "Bill Number",
  },
  {
    id: "date",
    field: "Date",
  },
];

const otherDetails = [
  {
    id: "paymentTerms",
    field: "Payment",
  },
  {
    id: "billNumber",
    field: "Bill Number",
  },
  {
    id: "date",
    field: "Date",
  },
];

const getNestedValue = (obj: any, path: string) => {
  return path.split("/").reduce((acc, part) => acc && acc[part], obj);
};

export const TemplateOne = ({ data }: any) => {
  console.log({billDetailssss: data})
  return(
    <View style={styles.border}>
    <Text style={styles.shopName}>{data.Shop.name}</Text>
     <View style={{...styles.flex, ...styles.justifyBetween, ...styles.wFull}}>
      <View style={styles.wFull}>
        <Text style={styles.textXs}>
          {data.Shop.address.addressLine1},
        </Text>
        <Text style={styles.textXs}>
          {data.Shop.address.addressLine2},
        </Text>
        <Text style={styles.textXs}>{data.Shop.address.city},</Text>
        <Text style={styles.textXs}>{data.Shop.address.state},</Text>
        <Text style={styles.textXs}>
          India - {data.Shop.address.zip}
        </Text>
      </View>
      <View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={styles.textXs}>Telephone:</Text>
          <Text style={styles.textXs}>{data.Shop.phoneNumbers}</Text>
        </View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={styles.textXs}>Email:</Text>
          <Text style={styles.textXs}>{data.Shop.email}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textXs}>Website:</Text>
          <Text style={styles.textXs}>
            {data.Shop.website || "N/A"}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.billTagLine}>
      <View style={{...styles.flex, ...styles.gap1}}>
        <Text style={{...styles.fontBold, ...styles.textXs}}>GSTIN:</Text>
        <Text style={styles.textXs}>
          {data.gstIn || "GST123456789"}
        </Text>
      </View>
      <Text style={styles.fontBold}>{data.type}</Text>
      <Text style={styles.textXs}>Original for Recipient</Text>
    </View>
    <View style={styles.customerAndBillDetailsSection}>
      <View>
        {customerDetails.map((item, index) => {
          const value = getNestedValue(data, item.id);
          if (!value) return null;
          return (
            <View>
              <View style={styles.flex}>
                <Text style={{...styles.fontBold, ...styles.textXs}}>
                  {item.field}:
                </Text>
                <Text style={styles.textXs}>{value}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View>
        {otherDetails.map((item, index) => {
          const value = getNestedValue(data, item.id);
          if (!value) return null;
          return (
            <View>
              <View style={styles.flex}>
                <Text style={{...styles.fontBold, ...styles.textXs}}>
                  {item.field}:
                </Text>
                <Text style={styles.textXs}>{value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>S.No</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Description</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>HSN/SAC</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Qty</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Rate</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Tax</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
      </View>

      <View>
        {data.items.map((item: any, index: number) => {
          return (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {item.product.printName}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product.hsnCode}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.cost.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {item.quantity.toFixed(2)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {(item.quantity * item.cost).toFixed(2)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCol}></View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Total</Text>
        </View>
        <View style={styles.tableCol}></View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>154</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>5656</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>455</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{(5648).toFixed(2)}</Text>
        </View>
      </View>
    </View>
    <View style={styles.customerAndBillDetailsSection}>
      <View style={styles.bankDetailsSection}>
        <Text style={{...styles.textXs, ...styles.sectionHeader}}>
          Bank Details
        </Text>
        <View style={{paddingHorizontal : '2px',paddingVertical : '6px'}}>
          {bankDetails.map((item, index) => {
            const value = getNestedValue(data, item.id);
            if (!value) return null;
            return (
              <View>
                <View style={styles.flex}>
                  <Text style={{...styles.fontBold, ...styles.textXs}}>
                    {item.field}:
                  </Text>
                  <Text style={styles.textXs}>{value}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View>
          <Text style={{...styles.textXs, ...styles.sectionHeader}}>
            Total Taxable Amount in Words
          </Text>
          <Text style={{...styles.textXs,...{padding : '2px'}}}>
            {numberToWords(234543)} only
          </Text>
        </View>
      </View>

      <View style={styles.amountDetailsSection}>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={styles.amountField}>Total Taxable Amount:</Text>
          <Text style={styles.amountValueSecondary}>49765.00</Text>
        </View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={{...styles.amountField, ...{ opacity: 0.5 }}}>
            Total IGST
          </Text>
          <Text style={{...styles.amountValueSecondary, ...{ opacity: 0.5 }}}>
            49765.00
          </Text>
        </View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={{...styles.amountField, ...{ opacity: 0.5 }}}>
            Total IGST
          </Text>
          <Text style={{...styles.amountValueSecondary, ...{ opacity: 0.5 }}}>
            49765.00
          </Text>
        </View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={{...styles.amountField, ...{ opacity: 0.5 }}}>
            Total IGST
          </Text>
          <Text style={{...styles.amountValueSecondary, ...{ opacity: 0.5 }}}>
            49765.00
          </Text>
        </View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={styles.amountField}>Total GST Amount:</Text>
          <Text style={styles.amountValueSecondary}>49765.00</Text>
        </View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={styles.amountField}>Round Off:</Text>
          <Text style={styles.amountValueSecondary}>- 40</Text>
        </View>
        <View style={{...styles.textContainer, ...styles.amountSection}}>
          <Text style={styles.amountField}>Net Amount:</Text>
          <Text style={styles.amountValueSecondary}>225687</Text>
        </View>
      </View>
    </View>

    <View style={styles.remarks}>
      <View style={styles.sectionContainer}>
        <Text style={styles.textXs}>E. & O. E. :</Text>
        <Text style={styles.textXs}>dfcsjakfhhksjfse</Text>{" "}
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.textXs}>Remarks :</Text>
        <Text style={styles.textXs}>cds,jdfsfs fjsjf </Text>{" "}
      </View>
    </View>
    <View style={styles.remarks}>
      <View style={styles.leftSection}>
        <Text style={{...styles.sectionHeader, ...{fontSize : '12px'}}}>Terms & Conditions</Text>
        <Text style={{fontSize : '10px'}}>1jfgdf fdjjgd gedjn</Text>
      </View>

      <View style={styles.rightSection}>
        <View>
          <Text style={styles.centerText}>
            Certified that the above information are true and correct
          </Text>
          <Text style={{fontSize : '12px', fontWeight : 'bold',textAlign : 'center'}}>
            For {data.Shop.name.toUpperCase()},
          </Text>
        </View>
        <View style={styles.signatureSection}></View>
        <View>
          <Text style={styles.rightAlignedText}>
            &#40; Authorised Signature &#41;
          </Text>
        </View>
      </View>
    </View> 
  </View>
);
}

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  shopName: {
    textAlign: "center",
    padding: "2px",
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  amountSection: {
    border: "0.5px solid #000",
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    padding: "2px",
  },
  remarks: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    borderTop: "1px solid #000",
  },
 
  sectionHeader: {
    borderTop: "0.5px solid #000",
    borderBottom: "0.5px solid #000",
    
    textAlign: "center",
    padding: "1px",
  },
  customerAndBillDetailsSection: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #000",
  },
  bankDetailsSection : {
    flex : '2',
  },
  amountDetailsSection : {
    flex : '1.25'
  },
  amountField: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px",
    textAlign: "right",
  },
  amountValueSecondary: {
    fontSize: "14px",
    fontWeight: "bold",
    borderLeft: "1px solid #000",
    width: "80px",
    padding: "2px",
    textAlign: "right",
  },
  signatureSection: {
    height: 48,

    borderTop: "0.5px solid #000",
    borderBottom: "0.5px solid #000",
  },

  billTagLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #000",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#000",
  },
  leftSection: {
    width: "50%",
  },
  rightSection: {
    width: "50%",
    borderLeft: "1px solid #000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  centerText: {
    fontSize: 10,
    textAlign: "center",
    marginVertical: 2,
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
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  wFull: {
    width: "100%",
  },
  textXs: {
    fontSize: "14px",
  },
  fontBold: {
    fontWeight: "bold",
  },
  borderY: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
  },
  divide: {
    borderLeft: "1px solid #000",
  },
  spaceY1: {
    marginBottom: "4px",
  },
  opacity50: {
    opacity: 0.5,
  },
  gap1: {
    gap: "4px",
  },
  w40: {
    width: "40%",
  },
  borderBottom: {
    borderBottom: "1px solid #000",
  },
  px2: {
    paddingHorizontal: "2px",
  },
  py2: {
    paddingVertical: "2px",
  },
  h12: {
    height: "48px",
  },
  contentEditable: {
    borderBottom: "1px dashed #000",
    flexGrow: 1,
  },

  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 2,
    textAlign: "center",
  },
  tableCol: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 2,
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    padding: 2,
    textAlign: "center",
  },
});

export default TemplateOne;
