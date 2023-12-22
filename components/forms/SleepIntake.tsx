"use client";
// Existing imports
import * as React from "react";
import { useState, useEffect } from "react";
import { addSleepIntake, deleteSleepIntake, fetchDailySleep } from "@/lib/actions/sleepIntake.actions";

// ... (other existing imports)

function AddSleepIntake({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);
  const [sleepList, setSleepList] = useState<number[]>([]); // State to store all sleep intake amounts for the day

  useEffect(() => {
    fetchSleepIntake();
  }, [userId]);

  const fetchSleepIntake = async () => {
    try {
      const sleepIntake = await fetchDailySleep(userId);
      console.log("Sleep Intake fetched:", sleepIntake); // Log the fetched sleep intake value
      setSleepList(sleepIntake.intakeRecords); // Update sleep intake list with amounts for the day
    } catch (error) {
      console.error("Error fetching daily sleep intake:", error);
      // Handle error scenarios
    }
  };

  const handleAddIntake = async () => {
    try {
      if (!isNaN(amount) && amount > 0) {
        // Fetch existing sleep intake to check if already added for today
        const sleepIntake = await fetchDailySleep(userId);

        if (sleepIntake.intakeRecords.length > 0) {
          // If sleep intake already exists for today, show an alert
          alert("Sleep intake already added for today. You cannot add more than once in a day.");
        } else {
          // If no sleep intake for today, proceed with adding intake
          await addSleepIntake({ amount, userId });
          // Fetch and update displayed sleep intake after adding intake
          await fetchSleepIntake();
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
      const deletedAmount = sleepList[index];
      const updatedSleepList = [...sleepList];
      updatedSleepList.splice(index, 1);
      setSleepList(updatedSleepList);

      // Perform deletion logic from the backend using an API call
      await deleteSleepIntake({ deletedAmount, userId });

      // Fetch and update displayed sleep intake after deleting intake
      await fetchSleepIntake();
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
      {/* Displaying all sleep intake amounts for the day */}
      <ul className="white-text intakeList">
        {sleepList.map((intake, index) => (
          <li key={index} className="intakeListItem">
            {intake} hours
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
