# Brain Agriculture

## Requisitos

- Node.js v20.9.0
- npm v10.2.4

## Instalação

- Inicie a instância do banco, cria a base de dados com o nome brain_agriculture (se quiser alterar lembre-se de alterar no arquivo de conexão também) e configure a conexão no arquivo `.env`;

- Instale as dependências:

  - Rodar `npm install`

- Para que o prisma crie as tabelas dentro do banco utilize o comando:
    - Rodar `npm run migrate:reset`

- Caso deseje criar alguns registros no banco utilize o comando:
    - `npm run seed`;

- Para rodar o projeto em ambiente de desenvolvimento, utilize o comando:

    - `npm run dev`
- Para chamar as apis, importe a collection do postman localizada na raiz do projeto. Além das chamadas, contém exemplos de resposta das apis.

## Testes

- Rode o script criados no package.json `npm run test` 