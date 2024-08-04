export const calculateTotalNewStockValue = (data : any) => {
    let amount = 0.00
    data?.map((item:any)=>amount += item?.quantity * item?.cost)
    return amount

}