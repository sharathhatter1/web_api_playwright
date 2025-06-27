import  { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/ApiClient';
import { allure } from 'allure-playwright';

test.describe('Categories API Tests', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    await allure.epic('API Testing');
    await allure.feature('Categories API');
  });

  test('Get all categories', async () => {
    await allure.story('Retrieve Categories');
    const response = await apiClient.get('/products/categories');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBeTruthy();
    expect(response.data.length).toBeGreaterThan(0);
    
    const expectedCategories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
    expectedCategories.forEach(category => {
      expect(response.data).toContain(category);
    });
  });

  test('Get products by each category', async () => {
    await allure.story('Products by Category');
    const categoriesResponse = await apiClient.get('/products/categories');
    const categories = categoriesResponse.data;

    for (const category of categories) {
      await allure.step(`Testing category: ${category}`, async () => {
        const response = await apiClient.get(`/products/category/${category}`);
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBeTruthy();
        expect(response.data.length).toBeGreaterThan(0);
        
        response.data.forEach((product: any) => {
          expect(product.category).toBe(category);
        });
      });
    }
  });
});
 