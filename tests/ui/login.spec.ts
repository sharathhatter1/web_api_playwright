import  { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { TestDataLoader } from '../../utils/TestDataLoader';
import { allure } from 'allure-playwright';

test.describe('Login Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  const users = TestDataLoader.getUsers();

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await allure.epic('Authentication');
    await allure.feature('User Login');
  });

  test('Valid user login', async ({ page }) => {
    await allure.story('Successful Login');
    await allure.step('Navigate to home page', async () => {
      await homePage.goto('/');
    });

    await allure.step('Click signup/login button', async () => {
      await homePage.clickSignupLogin();
    });

    await allure.step('Enter valid credentials', async () => {
      await loginPage.login(users.validUser.email, users.validUser.password);
    });

    await allure.step('Verify successful login', async () => {
      await expect(page.locator('text=Logged in as')).toBeVisible();
    });
  });

  test('Invalid user login', async ({ page }) => {
    await allure.story('Failed Login');
    await homePage.goto('/');
    await homePage.clickSignupLogin();
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);
    await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
  });
});
 