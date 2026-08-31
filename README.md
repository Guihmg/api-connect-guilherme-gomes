# API Connect

API REST desenvolvida como MVP para gerenciamento de usuários. O projeto permite cadastrar, listar, consultar, atualizar e remover registros por meio de endpoints HTTP com entrada e saída em JSON.

## Objetivo

Disponibilizar uma base back-end simples, modular e previsível para consumo por uma aplicação front-end. A API aplica separação de responsabilidades, validação de dados, persistência em arquivo JSON e códigos de status HTTP adequados.

## Funcionalidades

- Cadastro de usuários.
- Listagem geral de usuários.
- Busca individual por ID.
- Atualização parcial de nome ou e-mail.
- Exclusão de usuários.
- Validação de nome e e-mail.
- Impedimento de e-mails duplicados.
- Respostas JSON padronizadas.
- Tratamento centralizado de erros.

## Tecnologias

- Node.js 24 LTS.
- Express 5.
- Nodemon 3 para desenvolvimento.
- Módulos nativos `fs` e `path` para persistência local.

## Estrutura do projeto

```text
api-connect/
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── src/
    ├── server.js
    ├── controllers/
    │   └── userController.js
    ├── data/
    │   ├── userRepository.js
    │   └── users.json
    ├── middlewares/
    │   ├── errorHandler.js
    │   └── validateUser.js
    └── routes/
        └── userRoutes.js
```

## Pré-requisitos

- Node.js 24 LTS ou versão compatível.
- npm.
- Git, caso o projeto seja clonado do GitHub.

## Instalação e execução

Clone o repositório e acesse a pasta:

```bash
git clone https://github.com/SEU-USUARIO/api-connect.git
cd api-connect
```

Instale as dependências:

```bash
npm install
```

Execute em modo de desenvolvimento:

```bash
npm run dev
```

Ou execute normalmente:

```bash
npm start
```

O servidor ficará disponível em:

```text
http://localhost:3000
```

## Endpoints

| Método | Endpoint | Finalidade | Sucesso |
|---|---|---|---|
| `GET` | `/` | Verificar o funcionamento da API | `200` |
| `GET` | `/usuarios` | Listar todos os usuários | `200` |
| `GET` | `/usuarios/:id` | Buscar um usuário por ID | `200` |
| `POST` | `/usuarios` | Cadastrar um usuário | `201` |
| `PATCH` | `/usuarios/:id` | Atualizar parcialmente um usuário | `200` |
| `DELETE` | `/usuarios/:id` | Remover um usuário | `204` |

## Exemplos de requisições

### Cadastrar usuário

```http
POST /usuarios
Content-Type: application/json
```

```json
{
  "nome": "Mariana Costa",
  "email": "mariana.costa@example.com"
}
```

Resposta de sucesso:

```json
{
  "data": {
    "id": 3,
    "nome": "Mariana Costa",
    "email": "mariana.costa@example.com"
  },
  "error": null
}
```

### Listar usuários

```http
GET /usuarios
```

### Buscar usuário por ID

```http
GET /usuarios/1
```

### Atualizar usuário

```http
PATCH /usuarios/1
Content-Type: application/json
```

```json
{
  "nome": "Ana Souza Atualizada"
}
```

### Excluir usuário

```http
DELETE /usuarios/1
```

Uma exclusão bem-sucedida retorna o status `204 No Content`.

## Validações e erros

Os campos `nome` e `email` são obrigatórios no cadastro. O nome deve possuir pelo menos dois caracteres e o e-mail deve apresentar um formato válido. E-mails duplicados retornam `409 Conflict`.

Exemplo de erro de validação:

```json
{
  "data": null,
  "error": {
    "codigo": "DADOS_OBRIGATORIOS",
    "mensagem": "Os campos nome e email são obrigatórios"
  }
}
```

Principais códigos utilizados:

- `200 OK`: consulta ou atualização concluída.
- `201 Created`: usuário cadastrado.
- `204 No Content`: usuário removido.
- `400 Bad Request`: dados ou ID inválidos.
- `404 Not Found`: usuário ou rota não encontrada.
- `409 Conflict`: e-mail já cadastrado.
- `500 Internal Server Error`: falha inesperada.

## Testes realizados

Foram verificados os seguintes cenários:

1. Cadastro válido com retorno `201`.
2. Cadastro sem e-mail com retorno `400`.
3. Listagem geral com retorno `200`.
4. Busca por ID inexistente com retorno `404`.

## Persistência

Os dados são persistidos no arquivo `src/data/users.json`. Essa estratégia é adequada ao objetivo didático e ao escopo de MVP, podendo ser substituída futuramente por um banco de dados.

## Licença

Este projeto está disponibilizado sob a licença MIT.
