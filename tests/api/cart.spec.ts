import  { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/ApiClient';
import { allure } from 'allure-playwright';

test.describe('Cart API Tests', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    await allure.epic('API Testing');
    await allure.feature('Cart API');
  });

  test('Create new cart', async () => {
    await allure.story('Cart Creation');
    const cartData = {
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      products: [{ productId: 1, quantity: 2 }]
    };

    const response = await apiClient.post('/carts', cartData);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
  });

  test('Get user carts', async () => {
    await allure.story('Retrieve User Carts');
    const response = await apiClient.get('/carts/user/1');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBeTruthy();
  });

  test('Update cart', async () => {
    await allure.story('Cart Update');
    const updateData = {
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      products: [{ productId: 1, quantity: 5 }]
    };

    const response = await apiClient.put('/carts/1', updateData);
    expect(response.status).toBe(200);
  });

  test('Delete cart', async () => {
    await allure.story('Cart Deletion');
    const response = await apiClient.delete('/carts/1');
    expect(response.status).toBe(200);
  });
});
 