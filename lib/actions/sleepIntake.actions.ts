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

    // Create a new sleep intake record for the day
    await SleepIntake.create({
      amount,
      user: userId,
      date: today, // Set the sleep intake record date to today
    });
  } catch (error: any) {
    throw new Error(`Failed to add sleep intake: ${error.message}`);
  }
}

export async function fetchDailySleep(userId: string) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const sleepIntakeRecords = await SleepIntake.find({
      user: userId,
      date: { $gte: today }, // Fetch records from today onwards
    });

    console.log("Sleep Intake Records:", sleepIntakeRecords); // Log fetched records

    // Calculate total sleep intake from fetched records
    const totalSleepIntake = sleepIntakeRecords.reduce((total, record) => total + record.amount, 0);

    // Extract just the amounts from sleep intake records
    const sleepIntakeAmounts = sleepIntakeRecords.map((record) => record.amount);

    return { intakeRecords: sleepIntakeAmounts, totalIntake: totalSleepIntake };
  } catch (error: any) {
    throw new Error(`Failed to fetch daily sleep intake: ${error.message}`);
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
