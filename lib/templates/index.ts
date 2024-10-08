import { BillTemplate } from "./bill-template";

import { CreatePDFDocument } from "./create-pdf-document";
import { TemplateList } from "./template-lists";

const replaceTemplatePlaceholders = (template: any, data: any) => {
  return template?.replace(
    /\{\{(.*?)\}\}/g,
    (_: any, key: any) => data[key.trim()]
  );
};

export { replaceTemplatePlaceholders, BillTemplate, CreatePDFDocument,TemplateList };
