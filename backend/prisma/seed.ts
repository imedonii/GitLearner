import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Import your lessons array
import { lessons } from './lessons-data'; // adjust path if needed

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  // 1️⃣ Seed Levels
  const levelsData = [
    { name: 'New here', slug: 'new_here' },
    { name: 'I know things', slug: 'i_know_things' },
    { name: 'Pro', slug: 'pro_level' },
  ];

  await prisma.level.createMany({
    data: levelsData,
    skipDuplicates: true,
  });

  console.log('✅ Seeded levels!');

  // 2️⃣ Fetch Levels to get IDs
  const levels = await prisma.level.findMany();

  // Helper to get levelId by slug
  const getLevelId = (slug: string) => {
    const level = levels.find((l) => l.slug === slug);
    if (!level) throw new Error(`Level with slug "${slug}" not found`);
    return level.id;
  };

  // 3️⃣ Seed Leasons from lessons array
  for (const lesson of lessons) {
    // Assign levelId based on some logic, e.g. beginner → 'new_here', intermediate → 'i_know_things', pro → 'pro_level'
    // Here we'll map by index as an example
    let levelSlug = 'new_here';
    if (lesson.id === 'branch' || lesson.id === 'checkout')
      levelSlug = 'i_know_things';
    if (lesson.id === 'rebase' || lesson.id === 'merge')
      levelSlug = 'pro_level';

    await prisma.leasons.upsert({
      where: { slug: lesson.id }, // use your `slug` column
      update: {},
      create: {
        slug: lesson.id,
        title: lesson.title,
        description: lesson.description,
        explanation: lesson.explanation,
        exampleCommand: lesson.exampleCommand,
        hint: lesson.hint,
        objective: lesson.objective,
        levelId: getLevelId(levelSlug),
      },
    });
  }

  console.log('✅ Seeded lessons!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
