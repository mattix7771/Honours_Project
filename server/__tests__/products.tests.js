import express from 'express';
import supertest from 'supertest';
import router from '../routes/productRoutes.js';
import { getAllProducts, getAllFromTable, getProductsByTitle, getSpecificProduct } from '../database.js';

const app = express();
app.use(express.json());
app.use(router);

// Mock database functions
jest.mock('../database.js', () => ({
  getAllProducts: jest.fn(),
  getAllFromTable: jest.fn(),
  getProductsByTitle: jest.fn(),
  getSpecificProduct: jest.fn(),
}));

describe('Product API endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all products', async () => {
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    getAllProducts.mockResolvedValue(products);

    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });

  it('should get all products by category', async () => {
    const category = 'phones';
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    getAllFromTable.mockResolvedValue(products);

    const response = await supertest(app).get(`/category/${category}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });

  it('should get products by title', async () => {
    const titles = ['Product 1', 'Product 2'];
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    getProductsByTitle.mockImplementation((title) => {
      return products.find((product) => product.name === title);
    });

    const response = await supertest(app).get(`/${titles.join(',')}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });

  it('should get specific products', async () => {
    
    // Mock data
    const productType = 'phones';
    const productFilter = 'price';
    const direction = 'ASC';
    const limit = '5';
    
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    getSpecificProduct.mockResolvedValue(products);

    const response = await supertest(app).get(`/getSpecificProduct/${productType}/${productFilter}/${direction}/${limit}/false`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });
});
