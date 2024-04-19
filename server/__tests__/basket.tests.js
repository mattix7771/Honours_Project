import express from 'express';
import supertest from 'supertest';
import router from '../routes/basketRoutes.js';

const app = express();
app.use(express.json());
app.use(router);

describe('Basket API endpoints', () => {

  it('should add an item to the basket', async () => {
    const newItem = { name: 'Test Product', price: 10, image: 'test.jpg' };
    const newItem2 = { name: 'Test Product2', price: 20, image: 'test2.jpg' };
    const response = await supertest(app).post('/addToBasket').send(newItem);
    await supertest(app).post('/addToBasket').send(newItem2);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.basket).toHaveLength(1);
  });

  it('should get the basket items', async () => {
    const response = await supertest(app).get('/getBasket');
    expect(response.status).toBe(200);
    expect(response.body.basket).toBeDefined();
    expect(response.body.basket).toHaveLength(2);
  });

  it('should remove an item from the basket', async () => {
    const itemToRemove = { name: 'Test Product' };
    const response = await supertest(app).post('/removeFromBasket').send(itemToRemove);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.basket).toHaveLength(1);
  });

  it('should remove all items from the basket', async () => {
    const response = await supertest(app).post('/removeAll');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.basket).toHaveLength(0);
  });

  it('should handle invalid data when adding an item to the basket', async () => {
    const invalidItem = { price: 10, image: 'test.jpg' };
    const response = await supertest(app).post('/addToBasket').send(invalidItem);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid product data');
  });

  it('should handle removing a non-existing item from the basket', async () => {
    const itemToRemove = { name: 'Non-existing Product' };
    const response = await supertest(app).post('/removeFromBasket').send(itemToRemove);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.basket).toHaveLength(0);
  });
});
