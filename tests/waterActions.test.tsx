import request from 'supertest';
import express from 'express';
import { addWaterIntake, fetchDailyIntake, deleteWaterIntake } from '../lib/actions/waterIntake.actions'; 
import { connectToDB } from '../lib/mongoose';
import mongoose from 'mongoose';


const app: express.Application = express();
app.use(express.json());

beforeAll(async () => {
 
  await connectToDB('mongodb://localhost:8000/testdb'); 
});

afterAll(async () => {
  
  await mongoose.connection.close();
});

describe('Water Intake API', () => {
  let userId: string;

  beforeAll(async () => {
    userId = 'testUserId';
  });

  it('should add water intake', async () => {
    const response = await request(app)
      .post('/add-water-intake')
      .send({ amount: 500, userId });

    expect(response.status).toBe(200);
    
  });

  it('should fetch daily water intake', async () => {
    
    await addWaterIntake({ amount: 500, userId });

    const response = await request(app).get(`/fetch-daily-intake/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('intakeRecords');
    expect(response.body).toHaveProperty('totalIntake');
   
  });

  it('should delete water intake', async () => {
    
    await addWaterIntake({ amount: 500, userId });

    const response = await request(app)
      .delete('/delete-water-intake')
      .send({ deletedAmount: 500, userId });

    expect(response.status).toBe(200);
    
  });
});
