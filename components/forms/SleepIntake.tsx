"use client";
// Existing imports
import * as React from "react";
import { useState, useEffect } from "react";
import { fetchLastSevenDaysSleep, addSleepIntake, deleteSleepIntake } from "@/lib/actions/sleepIntake.actions";

// ... (other existing imports)

function AddSleepIntake({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);
  const [lastSevenDaysIntake, setLastSevenDaysIntake] = useState<any[]>([]); // State to store last seven days' intake

  useEffect(() => {
    fetchLastSevenDaysIntake();
  }, [userId]);

  const fetchLastSevenDaysIntake = async () => {
    try {
      const intakeForLastSevenDays = await fetchLastSevenDaysSleep(userId);
      setLastSevenDaysIntake(intakeForLastSevenDays);
    } catch (error) {
      console.error("Error fetching sleep intake for the last seven days:", error);
      // Handle error scenarios
    }
  };

  const handleAddIntake = async () => {
    try {
      if (!isNaN(amount) && amount > 0) {
        // Fetch existing sleep intake to check if already added for the last seven days
        const lastSevenDaysIntake = await fetchLastSevenDaysSleep(userId);

        if (lastSevenDaysIntake.length > 0) {
          // If sleep intake already exists for the last seven days, show an alert
          alert("Sleep intake already added for today or in the last seven days. You cannot add more than once in a day.");
        } else {
          // If no sleep intake for the last seven days, proceed with adding intake
          await addSleepIntake({ amount, userId });
          // Fetch and update displayed sleep intake after adding intake
          await fetchLastSevenDaysIntake();
          setAmount(0); // Reset input after adding intake
        }
      } else {
        console.error("Invalid input for sleep intake");
        // Handle invalid input scenarios (non-numeric or negative values)
      }
    } catch (error) {
      console.error("Error adding sleep intake:", error);
      // Handle error scenarios
    }
  };

  const handleDeleteIntake = async (index: number) => {
    try {
      // Your delete sleep intake logic goes here based on the index or intake object
      // Ensure correct handling of deletion and UI update
    } catch (error) {
      console.error("Error deleting sleep intake:", error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <input
        type="number"
        value={!isNaN(amount) ? amount : ''}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Enter amount of sleep (in hours)"
        className="inputField"
      />
      <button className="bg-sky-500 text-white px-4 py-2 rounded addButton" onClick={handleAddIntake}>
        Add Sleep Intake
      </button>
      {/* Displaying last seven days' sleep intake amounts */}
      <ul className="white-text intakeList">
        {lastSevenDaysIntake.map((intake, index) => (
          <li key={index} className="intakeListItem">
            {`${intake.date.toDateString()}: ${intake.amount} hours`}
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

export default AddSleepIntake;

