import  { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductsPage } from '../../pages/ProductsPage';
import { LoginPage } from '../../pages/LoginPage';
import { ApiClient } from '../../api/ApiClient';
import { TestDataLoader } from '../../utils/TestDataLoader';
import { allure } from 'allure-playwright';

test.describe('E2E Shopping Flow Tests', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let loginPage: LoginPage;
  let apiClient: ApiClient;
  const users = TestDataLoader.getUsers();
  const products = TestDataLoader.getProducts();

  test.beforeEach(async ({ page, request }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    loginPage = new LoginPage(page);
    apiClient = new ApiClient(request);
    await allure.epic('E2E Testing');
    await allure.feature('Complete Shopping Flow');
  });

  test('Complete shopping journey with API validation', async ({ page }) => {
    await allure.story('Full Shopping Experience');
    
    // Step 1: Verify products exist via API
    await allure.step('Verify products availability via API', async () => {
      const apiResponse = await apiClient.get('/products');
      expect(apiResponse.status).toBe(200);
      expect(apiResponse.data.length).toBeGreaterThan(0);
    });

    // Step 2: Navigate to website and login
    await allure.step('Navigate to website and login', async () => {
      await homePage.goto('/');
      await homePage.clickSignupLogin();
      await loginPage.login(users.validUser.email, users.validUser.password);
      await expect(page.locator('text=Logged in as')).toBeVisible();
    });

    // Step 3: Browse products
    await allure.step('Browse and search products', async () => {
      await homePage.clickProducts();
      await productsPage.searchProduct(products.searchTerms[0]);
      const productCount = await productsPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });

    // Step 4: Add product to cart
    await allure.step('Add product to cart', async () => {
      await productsPage.addFirstProductToCart();
      await expect(page.locator('text=Added!')).toBeVisible();
    });

    // Step 5: Verify cart via API (simulate backend validation)
    await allure.step('Validate cart data via API', async () => {
      const cartResponse = await apiClient.get('/carts/user/1');
      expect(cartResponse.status).toBe(200);
      expect(Array.isArray(cartResponse.data)).toBeTruthy();
    });
  });

  test('Product search with API cross-validation', async ({ page }) => {
    await allure.story('Search Validation');
    
    // Get product categories from API
    const categoriesResponse = await apiClient.get('/products/categories');
    const categories = categoriesResponse.data;
    
    await homePage.goto('/products');
    
    // Test search for each category available in API
    for (const category of categories.slice(0, 2)) { // Test first 2 categories
      await allure.step(`Search and validate ${category} products`, async () => {
        // API validation
        const apiProducts = await apiClient.get(`/products/category/${category}`);
        expect(apiProducts.status).toBe(200);
        expect(apiProducts.data.length).toBeGreaterThan(0);
        
        // UI search
        await productsPage.searchProduct(category);
        const uiProductCount = await productsPage.getProductCount();
        
        // Cross-validation (UI should show results when API has products)
        if (apiProducts.data.length > 0) {
          expect(uiProductCount).toBeGreaterThan(0);
        }
      });
    }
  });

  test('User authentication flow with API token validation', async ({ page, request }) => {
    await allure.story('Authentication Validation');
    
    // Step 1: Authenticate via API
    await allure.step('Authenticate user via API', async () => {
      const loginData = {
        username: 'mor_2314',
        password: '83r5^_'
      };
      
      const authResponse = await apiClient.post('/auth/login', loginData);
      expect(authResponse.status).toBe(200);
      expect(authResponse.data).toHaveProperty('token');
      
      // Store token for further API calls
      const token = authResponse.data.token;
      expect(token).toBeTruthy();
    });

    // Step 2: Login via UI
    await allure.step('Login via UI', async () => {
      await homePage.goto('/');
      await homePage.clickSignupLogin();
      await loginPage.login(users.validUser.email, users.validUser.password);
      await expect(page.locator('text=Logged in as')).toBeVisible();
    });

    // Step 3: Validate user data consistency
    await allure.step('Validate user data via API', async () => {
      const userResponse = await apiClient.get('/users/1');
      expect(userResponse.status).toBe(200);
      expect(userResponse.data).toHaveProperty('username');
      expect(userResponse.data).toHaveProperty('email');
    });
  });
});
 