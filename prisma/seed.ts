import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const atividades = ['Correr', 'Piquenique', 'Praia'];

  for (const atividade of atividades) {
    await prisma.atividadeDisponivel.upsert({
      where: { nome: atividade },
      update: {},
      create: { nome: atividade },
    });
  }

  console.log('✅ Atividades semeadas: ' + atividades.join(', '));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });