"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createPatient(formData: FormData) {
  // 1. Extract data from the form
  const name = formData.get("name") as string;
  const age = parseInt(formData.get("age") as string);
  const gender = formData.get("gender") as string;
  const diagnosis = formData.get("diagnosis") as string;
  const status = formData.get("status") as string;

  // 2. Save to Supabase
  await prisma.patient.create({
    data: {
      name,
      age,
      gender,
      diagnosis,
      status,
    },
  });

  // 3. Refresh the page data so the new patient shows up instantly
  revalidatePath("/dashboard/patients");
}