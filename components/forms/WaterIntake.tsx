"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import { addWaterIntake, fetchDailyIntake } from "@/lib/actions/waterIntake.actions";

function AddWaterIntake({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);
  const [dailyIntake, setDailyIntake] = useState(0);

  useEffect(() => {
    fetchIntake();
  }, [userId]);

  const fetchIntake = async () => {
    try {
      const intake = await fetchDailyIntake(userId);
      console.log("Intake fetched:", intake); // Log the fetched intake value
      setDailyIntake(intake);
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

  return (
    <div>
      <p className="text-white">Added water intake for today: {dailyIntake} ml</p>
      <input
        type="number"
        value={!isNaN(amount) ? amount : ''}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Enter amount of water (in ml)"
      />
      <button className="bg-sky-500 text-white px-4 py-2 rounded" onClick={handleAddIntake}>
        Add Water Intake
      </button>
    </div>
  );
}

export default AddWaterIntake;
