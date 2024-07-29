export const createDownloadUrl = ({ blob, fileName }: any) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link); 
  link.click(); 
  document.body.removeChild(link); 
  URL.revokeObjectURL(link.href); 
};
