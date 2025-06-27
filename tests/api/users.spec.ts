import  { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/ApiClient';
import { allure } from 'allure-playwright';

test.describe('Users API Tests', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    await allure.epic('API Testing');
    await allure.feature('Users API');
  });

  test('Get all users', async () => {
    await allure.story('Retrieve All Users');
    const response = await apiClient.get('/users');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBeTruthy();
    expect(response.data.length).toBeGreaterThan(0);
    
    response.data.forEach((user: any) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('username');
    });
  });

  test('Get single user', async () => {
    await allure.story('Retrieve Single User');
    const response = await apiClient.get('/users/1');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data).toHaveProperty('username');
    expect(response.data).toHaveProperty('email');
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('address');
  });

  test('Create new user', async () => {
    await allure.story('User Creation');
    const userData = {
      email: 'john@gmail.com',
      username: 'johnd',
      password: 'm38rmF$',
      name: {
        firstname: 'John',
        lastname: 'Doe'
      },
      address: {
        city: 'kilcoole',
        street: '7835 new road',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496'
        }
      },
      phone: '1-570-236-7033'
    };

    const response = await apiClient.post('/users', userData);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
  });

  test('Update user', async () => {
    await allure.story('User Update');
    const updateData = {
      email: 'john.updated@gmail.com',
      username: 'johnd_updated',
      password: 'newpassword',
      name: {
        firstname: 'John',
        lastname: 'Updated'
      }
    };

    const response = await apiClient.put('/users/1', updateData);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
  });

  test('Delete user', async () => {
    await allure.story('User Deletion');
    const response = await apiClient.delete('/users/1');
    expect(response.status).toBe(200);
  });
});
 