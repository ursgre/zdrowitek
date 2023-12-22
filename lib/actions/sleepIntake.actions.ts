"use server";
import { connectToDB } from "../mongoose";
import SleepIntake from "../models/sleep.model";

interface IntakeParams {
  amount: number;
  userId: string;
}

export async function addSleepIntake({ amount, userId }: IntakeParams) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    // Check if a sleep intake record already exists for the user and today's date
    const existingRecord = await SleepIntake.findOne({
      user: userId,
      date: today,
    });

    if (existingRecord) {
      throw new Error("Sleep intake already added for today");
    }

    // Create a new sleep intake record for the day if no record exists
    await SleepIntake.create({
      amount,
      user: userId,
      date: today, // Set the sleep intake record date to today
    });
  } catch (error: any) {
    throw new Error(`Failed to add sleep intake: ${error.message}`);
  }
}

export async function fetchLastSevenDaysSleep(userId: string) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Get date 6 days ago

    const sleepIntakeRecords = await SleepIntake.find({
      user: userId,
      date: { $gte: sevenDaysAgo, $lte: today }, // Fetch records from seven days ago up to today
    });

    // Extract just the amounts from sleep intake records
    const sleepIntakeAmounts = sleepIntakeRecords.map((record) => ({
      date: record.date,
      amount: record.amount,
    }));

    return sleepIntakeAmounts;
  } catch (error: any) {
    throw new Error(`Failed to fetch sleep intake for the last seven days: ${error.message}`);
  }
}

export async function deleteSleepIntake({ deletedAmount, userId }: { deletedAmount: number, userId: string }) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find and delete the sleep intake record matching the amount and user ID
    await SleepIntake.findOneAndDelete({
      user: userId,
      date: today,
      amount: deletedAmount,
    });

    console.log(`Sleep intake record deleted: ${deletedAmount} hours`);
    // Additional logic or logging as needed

  } catch (error: any) {
    throw new Error(`Failed to delete sleep intake: ${error.message}`);
  }
}
