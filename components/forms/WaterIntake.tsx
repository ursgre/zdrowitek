"use client"
// Existing imports
import * as React from "react";
import { useState, useEffect } from "react";
import { addWaterIntake, fetchDailyIntake, deleteWaterIntake } from "@/lib/actions/waterIntake.actions";

// ... (other existing imports)

function AddWaterIntake({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);
  const [dailyIntake, setDailyIntake] = useState(0);
  const [intakeList, setIntakeList] = useState<number[]>([]); // State to store all intake amounts for the day

  useEffect(() => {
    fetchIntake();
  }, [userId]);

  const fetchIntake = async () => {
    try {
      const intake = await fetchDailyIntake(userId);
      console.log("Intake fetched:", intake); // Log the fetched intake value
      setDailyIntake(intake.totalIntake);
      setIntakeList(intake.intakeRecords); // Update intake list with amounts for the day
    } catch (error) {
      console.error("Error fetching daily intake:", error);
      // Handle error scenarios
    }
  };

  const handleAddIntake = async () => {
    try {
      if (!isNaN(amount) && amount > 0) {
        await addWaterIntake({ amount, userId });
        
        // Fetch and update displayed intake after adding intake
        await fetchIntake();
        
        setAmount(0); // Reset input after adding intake
      } else {
        console.error("Invalid input for water intake");
        // Handle invalid input scenarios (non-numeric or negative values)
      }
    } catch (error) {
      console.error("Error adding water intake:", error);
      // Handle error scenarios
    }
  };

  const handleDeleteIntake = async (index: number) => {
    try {
      const deletedAmount = intakeList[index];
      const updatedIntakeList = [...intakeList];
      updatedIntakeList.splice(index, 1);
      setIntakeList(updatedIntakeList);

      // Perform deletion logic from the backend using an API call
      await deleteWaterIntake({ deletedAmount, userId });
    } catch (error) {
      console.error("Error deleting water intake:", error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <input
        type="number"
        value={!isNaN(amount) ? amount : ''}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Enter amount of water (in ml)"
        className="inputField"
      />
      <button className="bg-sky-500 text-white px-4 py-2 rounded addButton" onClick={handleAddIntake}>
        Add Water Intake
      </button>
      <p className="text-white intakeText">
        Added water intake for today: {dailyIntake} ml
      </p>
      {/* Displaying all intake amounts for the day */}
      <ul className="white-text intakeList">
        {intakeList.map((intake, index) => (
          <li key={index} className="intakeListItem">
            {intake} ml
            <button
              className="bg-red-500 text-white px-2 ml-2 rounded deleteButton"
              onClick={() => handleDeleteIntake(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default AddWaterIntake;
