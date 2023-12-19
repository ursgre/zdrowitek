"use server";
import { connectToDB } from "../mongoose";
import WaterIntake from "../models/water.model";

interface IntakeParams {
  amount: number;
  userId: string;
}

export async function addWaterIntake({ amount, userId }: IntakeParams) {
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

export async function fetchDailyIntake(userId: string, date: Date) {
  try {
    connectToDB();

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const intake = await WaterIntake.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    return intake.length > 0 ? intake[0].totalAmount : 0;
  } catch (error: any) {
    throw new Error(`Failed to fetch daily water intake: ${error.message}`);
  }
}