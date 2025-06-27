import  { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/ApiClient';
import { TestDataLoader } from '../../utils/TestDataLoader';
import { allure } from 'allure-playwright';

test.describe('Products API Tests', () => {
  let apiClient: ApiClient;
  const products = TestDataLoader.getProducts();

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    await allure.epic('API Testing');
    await allure.feature('Products API');
  });

  test('Get all products', async () => {
    await allure.story('Retrieve Products');
    const response = await apiClient.get('/products');
    
    await allure.step('Verify response status', async () => {
      expect(response.status).toBe(200);
    });

    await allure.step('Verify products data', async () => {
      expect(Array.isArray(response.data)).toBeTruthy();
      expect(response.data.length).toBeGreaterThan(0);
    });
  });

  test('Get single product', async () => {
    await allure.story('Retrieve Single Product');
    const response = await apiClient.get('/products/1');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('price');
  });

  test('Get products by category', async () => {
    await allure.story('Filter by Category');
    const response = await apiClient.get('/products/category/electronics');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBeTruthy();
    response.data.forEach((product: any) => {
      expect(product.category).toBe('electronics');
    });
  });
});
 