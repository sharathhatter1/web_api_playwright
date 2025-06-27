import  { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly productItems: Locator;
  readonly addToCartBtns: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.productItems = page.locator('.product-image-wrapper');
    this.addToCartBtns = page.locator('.add-to-cart');
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchBtn.click();
  }

  async addFirstProductToCart() {
    await this.addToCartBtns.first().click();
  }

  async getProductCount() {
    return await this.productItems.count();
  }
}
 