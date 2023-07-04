// import { PrismaClient, UserRole } from '@prisma/client';

// const prisma = new PrismaClient();

// async function seedRoles() {
//   const roles = Object.values(UserRole);

//   for (const role of roles) {
//     await prisma.role.create({
//       data: {
//         name: role,
//       },
//     });

//     console.log(`Perfil do tipo ${role} criado com sucesso!. 🌱`);
//   }
// }

// seedRoles()
//   .then(() => {
//     prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
