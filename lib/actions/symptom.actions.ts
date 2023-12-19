"use server";
import { connectToDB } from "../mongoose";
import Symptom from '../models/symptom.model'; 
import User from "../models/user.model";

export const getAllSymptoms = async (userId: string) => {
  try {
    connectToDB();

    const currentDate = new Date().toISOString().split('T')[0];
    const allSymptoms = await Symptom.find({ creator: userId });
    const allTodaySymptoms = await Symptom.find({ creator: userId, date: currentDate });

    return { content: allSymptoms, todayContent: allTodaySymptoms };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addSymptom = async (userId: string, name: string, description: string) => {
  try {
    connectToDB();

    const currentDate = new Date().toISOString().split('T')[0];
    const newSymptom = new Symptom({ name, description, creator: userId, date: currentDate });
    await newSymptom.save();

    return { content: newSymptom };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteSymptom = async (id: string) => {
  try {
    connectToDB();

    const deletedSymptom = await Symptom.findByIdAndDelete(id);
    if (!deletedSymptom) {
      throw new Error('Symptom not found');
    }
    return { message: 'Symptom deleted successfully' };
  } catch (error: any) {
    throw new Error(error.message);
  }
};