export const getColorByName = (name: string) => {
  const reversedName = name.split("").reverse().join("");

  let hashCode = 0;
  for (let i = 0; i < reversedName.length; i++) {
    hashCode = reversedName.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }

  let color = "#";
  for (let i = 0; i < 10; i++) {
    let value = (hashCode >> (i * 6)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }

  return String(color).substring(0, 7);
};
