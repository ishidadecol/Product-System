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

## Rodar a Aplicação com Docker (Recomendado)
Essa é a forma mais fácil de rodar o app.
O Docker vai configurar automaticamente o banco de dados MySQL e conectar tudo para você.

Na pasta express-api, execute:

```bash
docker compose up -d --build
```
Aguarde até que todos os serviços estejam rodando.

📝 Se você não for usar o Docker, será necessário configurar um banco de dados MySQL manualmente e atualizar o seu arquivo .env torcando o host para localhost.

## Rodar as Migrações
Este passo cria as tabelas necessárias no banco de dados:

```bash
docker exec -it express-api-container npm run migrate                   
```

## Rodar o Seeder
Este comando irá inserir alguns dados de demonstração, incluindo 5 produtos e 1 usuário administrador para login:

```bash
docker exec -it express-api-container npm run seed                   
```

🧪 Credenciais de Demonstração
 abra o navegador e acesse:

http://localhost:3000

Use as seguintes credenciais para fazer login:

Email: admin@b4you.dev

Senha: 123456

✅ Tudo Pronto!
Você agora deve ter tanto o backend quanto o frontend rodando localmente. 🎉
