import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

type Role = 'OWNER' | 'ADMIN'  // pakai union string

const prisma = new PrismaClient()

async function upsertAdmin(username: string, password: string, role: Role) {
  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.admin.upsert({
    where: { username },
    update: { passwordHash, role, isActive: true, updatedAt: new Date() },
    create: { username, passwordHash, role, isActive: true },
  })
  console.log(`✓ ensured ${role} "${username}"`)
}

async function main() {
  await upsertAdmin('raka20', 'raka20', 'OWNER') // owner
  await upsertAdmin('admin',  'raka20', 'ADMIN') // admin
  console.log('✔ seed complete')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
