# 🛍️ Product System - Guia de Instalação
---

## ✅ Requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (recomendado versão 18 ou superior)
- [Docker e Docker Compose](https://www.docker.com/products/docker-desktop) (opcional, mas recomendado)
- Um terminal (Terminal, Prompt de Comando, PowerShell, etc.)

---

## Clonar o Projeto

Abra o terminal e execute o comando abaixo para clonar o projeto:

```bash
git clone https://github.com/ishidadecol/Product-System.git
```
Isso fará o download dos arquivos do projeto para o seu computador.

## Configurar Variáveis de Ambiente
Navegue até a pasta da API Express:

```bash
cd Product-System/express-api
```
Copie o arquivo .env.example para criar seu próprio .env:

```bash
cp .env.example .env
```

Abra o arquivo .env no seu editor de código (ex: VSCode) e verifique os valores.
Você pode deixar a maioria como está, se for usar o Docker.

## Instalar Dependências do Backend
Ainda dentro da pasta express-api, execute:

```bash
npm install
```

Isso instalará todas as dependências necessárias para o backend.

## Rodar a Aplicação com Docker (Recomendado)
Essa é a forma mais fácil de rodar o app.
O Docker vai configurar automaticamente o banco de dados MySQL e conectar tudo para você.

Na pasta express-api, execute:

```bash
docker compose up --build
```
Aguarde até que todos os serviços estejam rodando.

📝 Se você não for usar o Docker, será necessário configurar um banco de dados MySQL manualmente e atualizar o seu arquivo .env de acordo.

## Rodar as Migrações
Este passo cria as tabelas necessárias no banco de dados:

```bash
npm run migrate
```

## Rodar o Seeder
Este comando irá inserir alguns dados de demonstração, incluindo 5 produtos e 1 usuário administrador para login:

```bash
npm run seed
```

## Rodar o Frontend (Aplicação Next.js)
Agora vamos iniciar o frontend.

Primeiro, vá até a pasta do frontend:

```bash
cd ../nextapp
```

Instale as dependências:

```bash
npm install
```
E então rode o servidor de desenvolvimento:

```bash
npm run dev
```

🧪 Credenciais de Demonstração
Assim que a aplicação estiver rodando, abra o navegador e acesse:

http://localhost:3000

Use as seguintes credenciais para fazer login:

Email: admin@b4you.dev

Senha: 123456

✅ Tudo Pronto!
Você agora deve ter tanto o backend quanto o frontend rodando localmente. 🎉
