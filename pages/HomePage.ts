import  { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly signupLoginBtn: Locator;
  readonly productsBtn: Locator;
  readonly cartBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginBtn = page.locator('a[href="/login"]');
    this.productsBtn = page.locator('a[href="/products"]');
    this.cartBtn = page.locator('a[href="/view_cart"]');
  }

  async clickSignupLogin() {
    await this.signupLoginBtn.click();
  }

  async clickProducts() {
    await this.productsBtn.click();
  }

  async clickCart() {
    await this.cartBtn.click();
  }
}
 