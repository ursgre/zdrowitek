"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import { addWaterIntake } from "@/lib/actions/waterIntake.actions"; // Import the addWaterIntake function

function AddWaterIntake({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);

  const handleAddIntake = async () => {
    try {
      await addWaterIntake({ amount, userId });
      // Optionally, perform additional actions after adding intake
      // Example: Display success message, update UI, etc.
    } catch (error) {
      console.error("Error adding water intake:", error);
      // Handle error scenarios
    }
  };

  return (
    <div>
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