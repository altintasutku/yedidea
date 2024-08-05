"use server";

import { eq } from "drizzle-orm";
import { join } from "path";
import mime from "mime";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { personelTable } from "@/lib/schema/personel";
import { v4 as uuidv4 } from "uuid";
import { del, put } from "@vercel/blob";

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

  const profilePhotoID = uuidv4();
  const profilePhoto = await put(profilePhotoID, photo, {
    access: "public",
  });

  const fileID = uuidv4();
  const userFile = await put(fileID, file, {
    access: "public",
  });

  // Save to database
  await db.insert(personelTable).values({
    name,
    phone,
    age,
    sector,
    gender,
    city,
    district,
    photo: profilePhoto.url,
    files: userFile.url,
    createdBy: session.user.id,
  });

  revalidatePath("/personel");
  return {
    message: "Personel başarıyla oluşturuldu",
    status: "success",
  };
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

  await del(item.photo);
  await del(item.files);

  const profilePhotoID = uuidv4();
  const profilePhoto = await put(profilePhotoID, photo, {
    access: "public",
  });

  const fileID = uuidv4();
  const userFile = await put(fileID, file, {
    access: "public",
  });

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
      photo: profilePhoto.url,
      files: userFile.url,
      createdBy: session.user.id,
    })
    .returning();

  revalidatePath("/personel");
  return {
    message: "Personel başarıyla oluşturuldu",
    status: "success",
  };
}

export async function deletePersonel(
  items: (typeof personelTable.$inferSelect)[],
) {
  try {
    items.forEach(async (item) => {
      await db
        .delete(personelTable)
        .where(eq(personelTable.id, item.id))
        .returning();
      await del(item.photo);
      await del(item.files);
    });

    revalidatePath("/personel");
  } catch (e) {
    console.error(e);
  }
}

export async function updateDates(payload: {
  dates: Date[];
  personelID: string;
}): Promise<FormResponse> {
  const session = await getAuthSession();

  if (!session) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  await db
    .update(personelTable)
    .set({
      dates: payload.dates,
    })
    .where(eq(personelTable.id, payload.personelID));

  revalidatePath("/personel");

  return {
    message: "Personel başarıyla guncellendi",
    status: "success",
  };
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
