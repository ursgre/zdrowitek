"use client"
import React, { useState, useEffect } from "react";
import { addWaterIntake, fetchIntakeRecordsForToday } from "@/lib/actions/waterIntake.actions";

function AddWaterIntake({ userId }) {
  const [intakeRecords, setIntakeRecords] = useState([]);

  useEffect(() => {
    fetchIntake();
  }, [userId]);

  const fetchIntake = async () => {
    try {
      const records = await fetchIntakeRecordsForToday(userId);
      setIntakeRecords(records);
    } catch (error) {
      console.error("Error fetching daily intake:", error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <p className="text-white">Intake records for today:</p>
      <ul>
        {intakeRecords.map((record) => (
          <li key={record._id}>
            {record.amount} ml - {new Date(record.date).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddWaterIntake;
