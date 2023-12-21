"use server"
import { connectToDB } from "../mongoose";
import CalorieIntake from "../models/calorie.model";

// ... (other existing imports and code)

interface CalorieParams {
  calories: number;
  userId: string;
}

export async function addCalorieIntake({ calories, userId }: CalorieParams) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    // Create a new calorie intake record for the day
    await CalorieIntake.create({
      calories,
      user: userId,
      date: today, // Set the intake record date to today
    });
  } catch (error: any) {
    throw new Error(`Failed to add calorie intake: ${error.message}`);
  }
}

export async function fetchDailyCalorieIntake(userId: string) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const intakeRecords = await CalorieIntake.find({
      user: userId,
      date: { $gte: today }, // Fetch records from today onwards
    });

    console.log("Calorie Intake Records:", intakeRecords); // Log fetched records

    // Calculate total calorie intake from fetched records
    const totalCalories = intakeRecords.reduce((total, record) => total + record.calories, 0);

    // Extract just the calorie amounts from intake records
    const calorieAmounts = intakeRecords.map((record) => record.calories);

    return { calorieRecords: calorieAmounts, totalCalories };
  } catch (error: any) {
    throw new Error(`Failed to fetch daily calorie intake: ${error.message}`);
  }
}

export async function deleteCalorieIntake({ deletedCalories, userId }: { deletedCalories: number, userId: string }) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find and delete the calorie intake record matching the calories and user ID
    await CalorieIntake.findOneAndDelete({
      user: userId,
      date: today,
      calories: deletedCalories,
    });

    console.log(`Calorie intake record deleted: ${deletedCalories} calories`);
    // Additional logic or logging as needed

  } catch (error: any) {
    throw new Error(`Failed to delete calorie intake: ${error.message}`);
  }
}