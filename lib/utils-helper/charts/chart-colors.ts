import { getValueFromObjectByPath } from "../data/get-values-with-object";

const getRandomColor = (alpha = 1) => {
  const getRandomInt = () => Math.floor(Math.random() * 256);
  const r = getRandomInt();
  const g = getRandomInt();
  const b = getRandomInt();
  return `rgba(${r},${g},${b},${alpha})`;
};

export const generateColors = (
  numColors: number,
  notAllowedColors: string[] = []
): string[] => {
  const colors = new Set<string>();

  while (colors.size < numColors) {
    const newColor = getRandomColor();

    // Ensure the generated color is not in the notAllowedColors array and it's unique
    if (!notAllowedColors.includes(newColor)) {
      colors.add(newColor);
    }
  }

  return Array.from(colors);
};

export const modifyOpacity = (colors: string[], opacity: number): string[] => {
  console.log({colorrrr : colors})
  return colors?.map((color) => {
    console.log({color})
    const rgba = color?.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d?.?\d*)?\)/
    );

    if (rgba) {
      const [, r, g, b] = rgba;
      return `rgba(${r},${g},${b},${opacity})`;
    }

    return color;
  });
};

export const attachColors = (data: any, colors: any) => {
  return data?.map((item: any, index: any) => {
    return {
      ...item,
      color: colors[index],
    };
  });
};

export const attachColorsByPath = (data: any, colors: any, path: any) => {
  const pathParts = path?.split("/");

  return data?.map((item: any, index: any) => {
    console.log({pathhhh : path,path,item})
    const identity = getValueFromObjectByPath(item, pathParts);
    return colors[identity];
  });
};
