// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const errorMessages = [
    { code: '100001', text: 'Certificado digital inválido' },
    { code: '100002', text: 'Evento duplicado' },
    { code: '100003', text: 'Layout incompatível com a versão atual' },
    { code: '100004', text: 'CPF do responsável inválido' },
    { code: '100005', text: 'CNPJ não autorizado para envio' },
    { code: '100006', text: 'Falha de conexão com o Web Service' },
    { code: '100007', text: 'Evento fora do prazo legal' },
    { code: '100008', text: 'Número de recibo inválido' },
    { code: '100009', text: 'Erro interno no servidor do governo' },
    { code: '100010', text: 'Assinatura digital corrompida' },
];

function getRandomErrorCode() {
    return faker.helpers.arrayElement(errorMessages).code;
}

function getSuggestionText(code: string): string {
    return errorMessages.find(e => e.code === code)?.text || 'Erro desconhecido';
}

async function main() {
    console.log('Seeding data...');

    for (let i = 0; i < 500; i++) {
        const errorCode = faker.string.numeric({ length: 6 });
        const suggestion = await prisma.suggestion.create({
            data: {
                errorCode,
                text: getSuggestionText(errorCode) + ' - ' + faker.lorem.sentence(),
            },
        });

        const numberOfEvaluations = faker.number.int({ min: 1, max: 3 });
        for (let j = 0; j < numberOfEvaluations; j++) {
            await prisma.evaluation.create({
                data: {
                    suggestionId: suggestion.id,
                    errorCode: suggestion.errorCode,
                    clientCode: faker.string.numeric({ length: 6 }),
                    evaluation: faker.datatype.boolean(),
                    comment: faker.lorem.sentences({ min: 1, max: 2 }),
                },
            });
        }
    }

    console.log('Seed completed');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
