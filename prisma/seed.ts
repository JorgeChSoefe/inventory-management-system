import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create warehouses
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: 'Main Warehouse',
      location: 'Downtown Business District'
    }
  })

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: 'Secondary Warehouse',
      location: 'Industrial Zone'
    }
  })

  console.log('✅ Warehouses created')

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop Dell XPS 15',
      description: 'High-performance laptop with 16GB RAM, Intel i7 processor',
      category: 'Electronics',
      barcode: '1234567890123'
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Wireless Mouse Logitech MX Master',
      description: 'Ergonomic wireless mouse with precision tracking',
      category: 'Accessories',
      barcode: '9876543210987'
    }
  })

  const product3 = await prisma.product.create({
    data: {
      name: 'USB-C Cable 2m',
      description: 'High-speed charging and data transfer cable',
      category: 'Accessories',
      barcode: '5555555555555'
    }
  })

  console.log('✅ Products created')

  // Create initial inventory
  await prisma.inventory.createMany({
    data: [
      { productId: product1.id, warehouseId: warehouse1.id, quantity: 50 },
      { productId: product2.id, warehouseId: warehouse1.id, quantity: 100 },
      { productId: product3.id, warehouseId: warehouse2.id, quantity: 200 }
    ]
  })

  console.log('✅ Initial inventory created')

  // Create some sample movements
  await prisma.movement.createMany({
    data: [
      {
        type: 'ENTRY',
        quantity: 50,
        productId: product1.id,
        warehouseId: warehouse1.id,
        notes: 'Initial stock'
      },
      {
        type: 'ENTRY',
        quantity: 100,
        productId: product2.id,
        warehouseId: warehouse1.id,
        notes: 'Initial stock'
      },
      {
        type: 'ENTRY',
        quantity: 200,
        productId: product3.id,
        warehouseId: warehouse2.id,
        notes: 'Initial stock'
      }
    ]
  })

  console.log('✅ Sample movements created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
