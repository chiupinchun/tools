export const download = (src: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  link.click();
};
