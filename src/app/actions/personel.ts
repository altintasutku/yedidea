"use server";

import { eq } from "drizzle-orm";
import { join } from "path";
import { stat, mkdir, writeFile, rm } from "fs/promises";
import mime from "mime";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { personelTable } from "@/lib/schema/personel";

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
  const photo = formData.get("photo") as File;
  const city = formData.get("city") as string;
  const district = formData.get("district") as string;

  const session = await getAuthSession();

  if (!session) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  const relativeUploadDir = `/uploads/${getToday()}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await checkDir(uploadDir);
  } catch (error) {
    return {
      message: "Dosya yüklenirken hata oluştu",
      status: "error",
    };
  }

  try {
    const filename = await saveFile(file, uploadDir);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    const ppFilename = await saveFile(
      photo,
      uploadDir,
      `pp-${session.user.id}`,
    );
    const ppFileUrl = `${relativeUploadDir}/${ppFilename}`;

    // Save to database
    await db.insert(personelTable).values({
      name,
      phone,
      age,
      sector,
      gender,
      city,
      district,
      photo: ppFileUrl,
      files: fileUrl,
      createdBy: session.user.id,
    });

    revalidatePath("/personel");
    return {
      message: "Personel başarıyla oluşturuldu",
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

export async function updatePersonel(
  prevState: any,
  formData: FormData,
): Promise<FormResponse> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const age = formData.get("age") as string;
  const sector = formData.get("sector") as string;
  const file = formData.get("files") as File;
  const gender = formData.get("gender") as string;
  const photo = formData.get("photo") as File;
  const city = formData.get("city") as string;
  const district = formData.get("district") as string;
  const id = formData.get("id") as string;

  const session = await getAuthSession();

  if (!session) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  const item = await db.query.personelTable.findFirst({
    where: eq(personelTable.id, id),
  });

  if (!item) {
    return {
      message: "Personel bulunamadı",
      status: "error",
    };
  }

  const relativeUploadDir = `/uploads/${getToday()}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await checkDir(uploadDir);
  } catch (error) {
    return {
      message: "Dosya yüklenirken hata oluştu",
      status: "error",
    };
  }

  try {
    const publicDir = join(process.cwd(), "public");
    if (file.name && item.files) {
      console.log(file.name)
      const filePath = join(publicDir, item.files);
      await rm(filePath);
    }
    if (photo.name && item.photo) {
      const filePath = join(publicDir, item.photo);
      await rm(filePath);
    }

    let fileUrl = ""
    console.log(file)
    if (file.name) {
      const filename = await saveFile(file, uploadDir);
      fileUrl = `${relativeUploadDir}/${filename}`;
    }else {
      fileUrl = item.files
    }

    let ppFileUrl = ""
    if (photo.name) {
      const ppFilename = await saveFile(photo, uploadDir, `pp-${session.user.id}`);
      ppFileUrl = `${relativeUploadDir}/${ppFilename}`;
    }else {
      ppFileUrl = item.photo
    }

    // Save to database
    const personel = await db
      .update(personelTable)
      .set({
        id: item.id,
        name,
        phone,
        age,
        sector,
        gender,
        city,
        district,
        photo: ppFileUrl,
        files: fileUrl,
        createdBy: session.user.id,
      })
      .returning();
    console.log(personel);

    revalidatePath("/personel");
    return {
      message: "Personel başarıyla oluşturuldu",
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
      if (item.files) {
        const filePath = join(publicDir, item.files);
        await rm(filePath);
      }
      if (item.photo) {
        const filePath = join(publicDir, item.photo);
        await rm(filePath);
      }
    });

    revalidatePath("/personel");
  } catch (e) {
    console.error(e);
  }
}

async function saveFile(file: File, uploadDir: string, filename?: string) {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  filename = `${(filename || file.name).replace(
    /\.[^/.]+$/,
    "",
  )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  //@ts-ignore
  await writeFile(`${uploadDir}/${filename}`, buffer);
  return filename;
}

function getToday() {
  return new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
}

async function checkDir(uploadDir: string) {
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
      throw new Error("Dosya yüklenirken hata oluştu");
    }
  }
}
