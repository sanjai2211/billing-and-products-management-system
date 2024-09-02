import { modifyOpacity } from "./chart-colors";

const getLineGraphData = ({ colors }: any) => {
  return {
    pointRadius: 5,
    pointBorderColor: colors,
    pointHoverRadius: 6,
  };
};

export const generateGraphData = (
  data: any,
  colors: string[],
  type = "bar",
  options = {}
) => {
  const borderColor = type === "bar" ? colors : "rgba(255, 255, 255, 0.4)";

  const getExtraData = (index: any) => {
    let data = {};
    switch (type) {
      case "line":
        data = getLineGraphData({ colors });
        break;
      default:
        break;
    }
    return data;
  };

  return data?.map((item: any, index: number) => {
    const modifiedColor = modifyOpacity(colors, 0.35);
    return {
      data: item,
      backgroundColor: modifiedColor,
      borderColor,
      borderWidth: 1,
      ...options,
      ...getExtraData(index),
    };
  });
};
