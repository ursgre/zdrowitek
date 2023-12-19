"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import { addWaterIntake, fetchDailyIntake } from "@/lib/actions/waterIntake.actions"; // Import the addWaterIntake and fetchDailyIntake functions

function AddWaterIntake({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);
  const [dailyIntake, setDailyIntake] = useState(0);

  useEffect(() => {
    const today = new Date();
    fetchDailyWaterIntake(today);
  }, [userId, dailyIntake]); // Add userId and dailyIntake to the dependency array
  
  const fetchDailyWaterIntake = async (date: Date) => {
    try {
      const intake = await fetchDailyIntake(userId, date);
      console.log("Intake fetched:", intake); // Log the intake value received
      setDailyIntake(intake);
    } catch (error: any) {
      console.error("Error fetching daily water intake:", error);
      // Handle error scenarios
    }
  };
  
  const handleAddIntake = async () => {
    try {
      await addWaterIntake({ amount, userId });
      const today = new Date();
      fetchDailyWaterIntake(today);
      setAmount(0); // Reset input after adding intake
    } catch (error) {
      console.error("Error adding water intake:", error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <p className="text-white ">Amount of water drank today: {dailyIntake} ml</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Enter amount of water (in ml)"
      />
      <button className="bg-sky-500 text-white px-4 py-2 rounded" onClick={handleAddIntake}>Add Water Intake</button>
    </div>
  );
}

export default AddWaterIntake;