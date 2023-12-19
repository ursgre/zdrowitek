"use server";
import { connectToDB } from "../mongoose";
import WaterIntake from "../models/water.model";

export async function addWaterIntake({ amount, userId }: { amount: number, userId: string }) {
    try {
      connectToDB();
  
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of the day
  
      const existingIntake = await WaterIntake.findOne({
        user: userId,
        date: { $gte: today }, // Find records for the current day
      });
  
      if (existingIntake) {
        // Update existing intake for the day
        existingIntake.amount += amount;
        await existingIntake.save();
      } else {
        // Create a new intake record for the day
        await WaterIntake.create({
          amount,
          user: userId,
        });
      }
    } catch (error: any) {
      throw new Error(`Failed to add water intake: ${error.message}`);
    }
  }

