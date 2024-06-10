import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z.string().regex(/^[0-9]+$/, { message: "Mobile must be a number" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  birthDate: z.string().min(1, { message: "Birth Date is required" }),
  resume: z
    .string()
    .min(1, { message: "Resume is required" })
    .refine(
      (dataUrl: string) => {
        const blob = dataURLtoBlob(dataUrl);
        return blob.type === "application/pdf";
      },
      { message: "Resume must be a PDF" }
    ),
});

function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export const validationSchema = z.object({
  forms: z.array(formSchema),
});
