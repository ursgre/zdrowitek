"use server";
import { connectToDB } from "../mongoose";
import WaterIntake from "../models/water.model";

export async function addWaterIntake({ amount, userId }: { amount: number, userId: string }) {
  try {
      connectToDB();

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of the day

      // Create a new intake record for the day
      await WaterIntake.create({
          amount,
          user: userId,
          date: today, // Set the intake record date to today
      });
  } catch (error: any) {
      throw new Error(`Failed to add water intake: ${error.message}`);
  }
}