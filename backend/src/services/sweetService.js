// In backend/src/services/sweetService.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class SweetService {
  async getAllSweets() {
    return await prisma.sweet.findMany();
  }

  async getSweetById(id) {
    return await prisma.sweet.findUnique({
      where: { id: id },
    });
  }

  async addSweet(sweetData) {
    return await prisma.sweet.create({
      data: sweetData,
    });
  }

  async updateSweet(id, updateData) {
    return await prisma.sweet.update({
      where: { id: id },
      data: updateData,
    });
  }

  async deleteSweet(id) {
    await prisma.sweet.delete({
      where: { id: id },
    });
    return true; // Indicate success
  }

  async purchaseSweet(id, quantity) {
    const sweet = await this.getSweetById(id);
    if (!sweet || sweet.quantity < quantity) {
      throw new Error("Sweet not found or insufficient stock");
    }
    return await prisma.sweet.update({
      where: { id: id },
      data: { quantity: sweet.quantity - quantity },
    });
  }

  async restockSweet(id, quantity) {
    return await prisma.sweet.update({
      where: { id: id },
      data: { quantity: { increment: quantity } }, // A more efficient way to restock
    });
  }

  async searchSweets({ name, category, minPrice, maxPrice }) {
    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (category) where.category = { equals: category };
    if (minPrice) where.price = { ...where.price, gte: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice) };

    return await prisma.sweet.findMany({ where });
  }
}