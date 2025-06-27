import  { readFileSync } from 'fs';
import { join } from 'path';

export class TestDataLoader {
  static load(fileName: string) {
    const filePath = join(process.cwd(), 'data', fileName);
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  static getUsers() {
    return this.load('users.json');
  }

  static getProducts() {
    return this.load('products.json');
  }
}
 