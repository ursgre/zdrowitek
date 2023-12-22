"use client";
// Existing imports...
import * as React from "react";
import { useState, useEffect } from "react";
import { fetchLastSevenDaysSleep, addSleepIntake, deleteSleepIntake } from "@/lib/actions/sleepIntake.actions";

function AddSleepIntake({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);
  const [lastSevenDaysIntake, setLastSevenDaysIntake] = useState<any[]>([]); // State to store last seven days' intake
  const [averageSleep, setAverageSleep] = useState<number | null>(null); // State to store average sleep

  useEffect(() => {
    fetchLastSevenDaysIntake();
  }, [userId]);

  useEffect(() => {
    calculateAverageSleep();
  }, [lastSevenDaysIntake]);

  const fetchLastSevenDaysIntake = async () => {
    try {
      const intakeForLastSevenDays = await fetchLastSevenDaysSleep(userId);
      setLastSevenDaysIntake(intakeForLastSevenDays);
    } catch (error) {
      console.error("Error fetching sleep intake for the last seven days:", error);
      // Error handling
    }
  };

  const calculateAverageSleep = () => {
    const totalSleep = lastSevenDaysIntake.reduce((total, intake) => total + intake.amount, 0);
    const average = totalSleep / lastSevenDaysIntake.length || 0;
    setAverageSleep(average);
  };

  const handleAddIntake = async () => {
    try {
      if (!isNaN(amount) && amount > 0) {
        const lastSevenDaysIntake = await fetchLastSevenDaysSleep(userId);

        if (lastSevenDaysIntake.length > 0) {
          alert("Sleep intake already added for today or in the last seven days. You cannot add more than once in a day.");
        } else {
          await addSleepIntake({ amount, userId });
          await fetchLastSevenDaysIntake();
          setAmount(0);
        }
      } else {
        console.error("Invalid input for sleep intake");
        // Handle invalid input scenarios
      }
    } catch (error) {
      console.error("Error adding sleep intake:", error);
      // Handle error scenarios
    }
  };

  const handleDeleteIntake = async (index: number) => {
    try {
      await deleteSleepIntake({ deletedAmount: lastSevenDaysIntake[index].amount, userId });
      await fetchLastSevenDaysIntake();
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
        placeholder="Enter sleep duration (in hours)"
        className="inputField"
      />
      <button className="bg-sky-500 text-white px-4 py-2 rounded addButton" onClick={handleAddIntake}>
        Add Sleep Duration
      </button>
      <ul className="white-text intakeList">
        {lastSevenDaysIntake.map((intake, index) => (
          <li key={index} className="intakeListItem">
            {`${new Date(intake.date).toDateString()}: ${intake.amount} hours`}
            <button
              className="bg-red-500 text-white px-2 ml-2 rounded deleteButton"
              onClick={() => handleDeleteIntake(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="averageSleep text-white">
        {averageSleep !== null ? (
          <p>
            Average sleep for the last 7 days: {averageSleep.toFixed(2)} hours
          </p>
        ) : (
          <p>No data available for calculating average sleep</p>
        )}
      </div>
    </div>
  );
}

export default AddSleepIntake;
