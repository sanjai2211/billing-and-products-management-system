import { StateCodes } from "@/lib/constants"

export const getStateCode = (state : any) => {
    return StateCodes?.find((item:any)=>item?.label === state)
}