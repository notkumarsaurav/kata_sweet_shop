import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SweetService } from '../services/sweetService.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const service = new SweetService();

describe('SweetService', () => {

  // Clean the database before each test
  beforeEach(async () => {
    await prisma.sweet.deleteMany({});
  });

  // Clean the database after each test
  afterEach(async () => {
    await prisma.sweet.deleteMany({});
  });

  it('should add a sweet and be able to retrieve it', async () => {
    const sweetData = { name: 'Test Sweet', category: 'Test', price: 10, quantity: 100 };
    const addedSweet = await service.addSweet(sweetData);
    
    expect(addedSweet).toHaveProperty('id');
    expect(addedSweet.name).toBe('Test Sweet');
  });

  it('should delete an existing sweet', async () => {
    const sweet = await service.addSweet({ name: 'Deletable', category: 'Test', price: 10, quantity: 10 });
    const result = await service.deleteSweet(sweet.id);

    expect(result).toBe(true);
    const found = await service.getSweetById(sweet.id);
    expect(found).toBeNull();
  });

  it('should update an existing sweet', async () => {
    const sweet = await service.addSweet({ name: 'Updatable', category: 'Test', price: 50, quantity: 10 });
    const updated = await service.updateSweet(sweet.id, { price: 60 });
    
    expect(updated.price).toBe(60);
  });
  
  it('should purchase a sweet, reducing its quantity', async () => {
    const sweet = await service.addSweet({ name: 'Purchasable', category: 'Test', price: 10, quantity: 20 });
    const purchased = await service.purchaseSweet(sweet.id, 5);

    expect(purchased.quantity).toBe(15);
  });

  // Note: The sortSweets method was removed when we refactored to Prisma,
  // as sorting is now handled by Prisma queries directly.
  // So those tests are removed. You can add more specific search tests if needed.
});