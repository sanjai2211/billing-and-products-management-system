// bill-template.js
import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  heading: {
    backgroundColor: "#f44336", // Red background
    padding: 10,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  billNumber: {
    fontSize: 24,
    textAlign: "center",
  },
});

const BillTemplate = ({ data }: any) => {
  console.log({data})
  return (
    <View style={styles.page}>
      <View style={styles.heading}>
        <Text>Bill Document</Text>
      </View>
      <Text style={styles.billNumber}>{data.billNumber}</Text>
    </View>
  );
};

export { BillTemplate };
