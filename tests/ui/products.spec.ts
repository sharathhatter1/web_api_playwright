import  { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductsPage } from '../../pages/ProductsPage';
import { TestDataLoader } from '../../utils/TestDataLoader';
import { allure } from 'allure-playwright';

test.describe('Products Tests', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  const products = TestDataLoader.getProducts();

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    await allure.epic('Product Management');
    await allure.feature('Product Search');
  });

  test('Search for products', async ({ page }) => {
    await allure.story('Product Search');
    await homePage.goto('/');
    await homePage.clickProducts();
    
    for (const term of products.searchTerms) {
      await allure.step(`Search for ${term}`, async () => {
        await productsPage.searchProduct(term);
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
      });
    }
  });

  test('Add product to cart', async ({ page }) => {
    await allure.story('Add to Cart');
    await homePage.goto('/products');
    await productsPage.addFirstProductToCart();
    await expect(page.locator('text=Added!')).toBeVisible();
  });
});
 