import  { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/ApiClient';
import { allure } from 'allure-playwright';

test.describe('Authentication API Tests', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    await allure.epic('API Testing');
    await allure.feature('Authentication API');
  });

  test('User login', async () => {
    await allure.story('User Authentication');
    const loginData = {
      username: 'mor_2314',
      password: '83r5^_'
    };

    const response = await apiClient.post('/auth/login', loginData);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    expect(typeof response.data.token).toBe('string');
    expect(response.data.token.length).toBeGreaterThan(0);
  });

  test('Invalid login credentials', async () => {
    await allure.story('Invalid Authentication');
    const invalidLoginData = {
      username: 'invalid_user',
      password: 'wrong_password'
    };

    const response = await apiClient.post('/auth/login', invalidLoginData);
    
    expect(response.status).toBe(401);
  });
});
 