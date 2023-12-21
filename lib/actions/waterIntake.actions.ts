"use server";
import { connectToDB } from "../mongoose";
import WaterIntake from "../models/water.model";
import User from "../models/user.model";

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

export async function fetchDailyIntake(userId: string) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const intakeRecords = await WaterIntake.find({
      user: userId,
      date: { $gte: today }, // Fetch records from today onwards
    });

    console.log("Intake Records:", intakeRecords); // Log fetched records

    // Calculate total intake from fetched records
    const totalIntake = intakeRecords.reduce((total, record) => total + record.amount, 0);

    // Extract just the amounts from intake records
    const intakeAmounts = intakeRecords.map((record) => record.amount);

    return { intakeRecords: intakeAmounts, totalIntake };
  } catch (error: any) {
    throw new Error(`Failed to fetch daily water intake: ${error.message}`);
  }
}

export async function deleteWaterIntake({ deletedAmount, userId }: { deletedAmount: number, userId: string }) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find and delete the intake record matching the amount and user ID
    await WaterIntake.findOneAndDelete({
      user: userId,
      date: today,
      amount: deletedAmount,
    });

    console.log(`Intake record deleted: ${deletedAmount} ml`);
    // Additional logic or logging as needed

  } catch (error: any) {
    throw new Error(`Failed to delete water intake: ${error.message}`);
  }
}

