"use server";

import { eq } from "drizzle-orm";
import { join } from "path";
import { stat, mkdir, writeFile, rm } from "fs/promises";
import mime from "mime";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { personelTable } from "@/lib/schema";
import { getAuthSession } from "@/lib/auth";
import exp from "constants";

export async function createPersonel(
  prevState: any,
  formData: FormData,
): Promise<FormResponse> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const age = formData.get("age") as string;
  const sector = formData.get("sector") as string;
  const file = formData.get("files") as File;
  const gender = formData.get("gender") as string;

  const session = await getAuthSession();

  if (!session) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e,
      );
      return {
        message: "Dosya yüklenirken hata oluştu",
        status: "error",
      };
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      "",
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Save to database
    await db.insert(personelTable).values({
      name,
      phone,
      age,
      sector,
      gender,
      files: fileUrl,
      createdBy: session.user.id,
    });

    revalidatePath("/personel");
    return {
      message: "WPS başarıyla oluşturuldu",
      status: "success",
    };
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return {
      message: "Dosya yüklenirken hata oluştu",
      status: "error",
    };
  }
}

export async function deletePersonel(
  items: (typeof personelTable.$inferSelect)[],
) {
  try {
    items.forEach(async (item) => {
      await db.delete(personelTable).where(eq(personelTable.id, item.id));
    });
    // remove files
    const publicDir = join(process.cwd(), "public");
    items.forEach(async (item) => {
      if (!item.files) return;
      const filePath = join(publicDir, item.files);
      await rm(filePath);
    });

    revalidatePath("/personel");
  } catch (e) {
    console.error(e);
  }
}
