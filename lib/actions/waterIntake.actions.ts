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

    return totalIntake;
  } catch (error: any) {
    throw new Error(`Failed to fetch daily water intake: ${error.message}`);
  }
}