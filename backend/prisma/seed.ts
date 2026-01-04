import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  await prisma.level.createMany({
    data: [
      { name: 'New here', slug: 'new_here' },
      { name: 'I know things', slug: 'i_know_things' },
      { name: 'Pro', slug: 'pro_level' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded levels!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
