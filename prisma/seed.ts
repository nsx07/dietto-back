import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seedSpeciality = async () => {
  if ((await prisma.specialty.count()) > 0) return;

  await prisma.specialty.createMany({
    data: [
      { name: 'Educação alimentar e nutricional' },
      { name: 'Educação alimentar e nutricional' },
      {
        name: 'Gestão de políticas públicas e programas em alimentação e nutrição',
      },
      {
        name: 'Gestão de políticas públicas e programas em alimentação e nutrição',
      },
      { name: 'Nutrição clínica' },
      { name: 'Nutrição clínica' },
      { name: 'Nutrição clínica em cardiologia' },
      { name: 'Nutrição clínica em cardiologia' },
      { name: 'Nutrição clínica em cuidados paliativos' },
      { name: 'Nutrição clínica em cuidados paliativos' },
      { name: 'Nutrição clínica em endocrinologia e metabologia' },
      { name: 'Nutrição clínica em endocrinologia e metabologia' },
      { name: 'Nutrição clínica em gastroenterologia' },
      { name: 'Nutrição clínica em gastroenterologia' },
      { name: 'Nutrição clínica em gerontologia ' },
      { name: 'Nutrição clínica em nefrologia' },
      { name: 'Nutrição clínica em nefrologia' },
      { name: 'Nutrição clínica em oncologia' },
      { name: 'Nutrição clínica em oncologia' },
      { name: 'Nutrição clínica em terapia intensiva ' },
      { name: 'Nutrição de precisão' },
      { name: 'Nutrição de precisão' },
      { name: 'Nutrição e alimentos funcionais' },
      { name: 'Nutrição e alimentos funcionais' },
      { name: 'Nutrição e fitoterapia' },
      { name: 'Nutrição e fitoterapia' },
      { name: 'Nutrição em alimentação coletiva' },
      { name: 'Nutrição em alimentação coletiva' },
      { name: 'Nutrição em alimentação coletiva hospitalar' },
      { name: 'Nutrição em alimentação coletiva hospitalar' },
      { name: 'Nutrição em alimentação escolar' },
      { name: 'Nutrição em alimentação escolar' },
      { name: 'Nutrição em atenção primária e saúde da família e comunidade' },
      { name: 'Nutrição em atenção primária e saúde da família e comunidade' },
      { name: 'Nutrição em esportes e exercício físico' },
      { name: 'Nutrição em esportes e exercício físico' },
      { name: 'Nutrição em estética' },
      { name: 'Nutrição em estética' },
      { name: 'Nutrição em marketing' },
      { name: 'Nutrição em marketing' },
      { name: 'Nutrição em saúde coletiva' },
      { name: 'Nutrição em saúde coletiva' },
      { name: 'Nutrição em saúde da mulher' },
      { name: 'Nutrição em saúde da mulher' },
      { name: 'Nutrição em saúde de povos e comunidades tradicionais' },
      { name: 'Nutrição em saúde de povos e comunidades tradicionais' },
      { name: 'Nutrição em saúde indígena' },
      { name: 'Nutrição em saúde indígena' },
      { name: 'Nutrição em saúde mental' },
      { name: 'Nutrição em saúde mental' },
      { name: 'Nutrição em transtornos alimentares' },
      { name: 'Nutrição em transtornos alimentares' },
      { name: 'Nutrição em vegetarianismo e veganismo' },
      { name: 'Nutrição em vegetarianismo e veganismo' },
      { name: 'Nutrição materno-infantil' },
      { name: 'Nutrição materno-infantil' },
      { name: 'Nutrição na produção de refeições comerciais' },
      { name: 'Nutrição na produção de refeições comerciais' },
      { name: 'Nutrição na produção da tecnologia de alimentos e bebidas' },
      { name: 'Nutrição na produção da tecnologia de alimentos e bebidas' },
      { name: 'Qualidade e segurança dos alimentos' },
      { name: 'Qualidade e segurança dos alimentos' },
      { name: 'Segurança alimentar e nutricional' },
      { name: 'Segurança alimentar e nutricional' },
      { name: 'Terapia de nutrição enteral e parenteral.' },
    ],
  });

  console.log('Specialty seed created');
};

async function seed() {
  await seedSpeciality();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
