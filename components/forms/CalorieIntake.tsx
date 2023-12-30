"use client"
// Existing imports
import * as React from "react";
import { useState, useEffect } from "react";
import {
    addCalorieIntake,
    fetchDailyCalorieIntake,
    deleteCalorieIntake,
  } from "@/lib/actions/calorieIntake.actions";


// ... (existing imports)

function AddCalorieIntake({ userId }: { userId: string }) {
    const [calories, setCalories] = useState(0);
    const [dailyCalories, setDailyCalories] = useState(0);
    const [calorieList, setCalorieList] = useState<number[]>([]);
  
    useEffect(() => {
      fetchCalorieIntake();
    }, [userId]);
  
    const fetchCalorieIntake = async () => {
      try {
        const calorieData = await fetchDailyCalorieIntake(userId);
        console.log("Calorie Intake fetched:", calorieData);
        setDailyCalories(calorieData.totalCalories);
        setCalorieList(calorieData.calorieRecords);
      } catch (error) {
        console.error("Error fetching daily calorie intake:", error);
        // Handle error scenarios
      }
    };
  
    const handleAddCalorieIntake = async () => {
      try {
        if (!isNaN(calories) && calories > 0) {
          await addCalorieIntake({ calories, userId });
  
          // Fetch and update displayed intake after adding intake
          await fetchCalorieIntake();
  
          setCalories(0); // Reset input after adding intake
        } else {
          console.error("Invalid input for calorie intake");
          // Handle invalid input scenarios (non-numeric or negative values)
        }
      } catch (error) {
        console.error("Error adding calorie intake:", error);
        // Handle error scenarios
      }
    };
  
    const handleDeleteCalorieIntake = async (index: number) => {
      try {
        const deletedCalories = calorieList[index];
        const updatedCalorieList = [...calorieList];
        updatedCalorieList.splice(index, 1);
        setCalorieList(updatedCalorieList);
  
        // Perform deletion logic from the backend using an API call
        await deleteCalorieIntake({ deletedCalories, userId });
  
        // Fetch and update displayed intake after deleting intake
        await fetchCalorieIntake();
      } catch (error) {
        console.error("Error deleting calorie intake:", error);
        // Handle error scenarios
      }
    };
  
    return (
      <div>
        <input
          type="number"
          value={!isNaN(calories) ? calories : ''}
          onChange={(e) => setCalories(parseInt(e.target.value))}
          placeholder="Enter calorie intake"
          className="inputField"
        />
        <button className="bg-sky-500 text-white px-4 py-2 rounded addButton" onClick={handleAddCalorieIntake}>
          Add Calorie Intake
        </button>
        <p className="text-white intakeText">
          Added calorie intake for today: {dailyCalories} kcal
        </p>
        <ul className="white-text intakeList">
          {calorieList.map((calorie, index) => (
            <li key={index} className="intakeListItem">
              {calorie} kcal
              <button
                className="bg-red-500 text-white px-2 ml-2 rounded deleteButton"
                onClick={() => handleDeleteCalorieIntake(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default AddCalorieIntake;
  