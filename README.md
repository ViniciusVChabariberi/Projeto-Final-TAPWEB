````markdown
# ⚽ Bolão da Rodada - Full Stack Project

Este projeto é uma aplicação móvel para gerenciamento de bolões de futebol, desenvolvida como Trabalho de Conclusão da disciplina de **Técnicas Avançadas de Programação**. O sistema utiliza uma arquitetura de microsserviços distribuída para garantir integridade administrativa e performance para o usuário final.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído integrando dois ecossistemas de Back-end distintos, conforme requisitos da disciplina:

* **Front-end Mobile:** React Native (Expo) + TypeScript.
* **Front-end Web Site:** React (Vite) + TypeScript.
* **Back-end (Cliente):** Node.js + Express (Focado em I/O e leitura rápida).
* **Back-end (Admin):** Kotlin + Ktor (Focado em Regras de Negócio e Apuração).
* **Banco de Dados:** Firebase Firestore (NoSQL).

---

## 📂 Estrutura do Projeto (Monorepo)

O repositório está organizado em três pastas principais:

* `/app-frontend` - Código fonte do aplicativo móvel (React Native).
* `/web-frontend` - Código fonte do web site (React).
* `/service-node` - API REST (Node.js) para autenticação e consumo de dados pelo app.
* `/service-kotlin` - API REST (Kotlin) para cadastro de partidas e apuração de resultados.

---

## 🛠️ Pré-requisitos

Para executar este projeto localmente, você precisará ter instalado:

* [Node.js](https://nodejs.org/) (v18 ou superior).
* [JDK](https://www.oracle.com/java/technologies/downloads/) (Java Development Kit - versão 17 ou superior para rodar o Kotlin).
* [IntelliJ IDEA](https://www.jetbrains.com/idea/) (Recomendado para o serviço Kotlin) ou Android Studio.
* [Git](https://git-scm.com/).
* **Dispositivo Móvel** (Android/iOS) ou Emulador configurado.

---

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar o ambiente:

### 1. Clonar o Repositório
```bash
git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
cd NOME-DO-REPO
````

### 2\. Configurar Dependências

**Front-end:**

```bash
cd app-frontend
npm install
```

**Back-end Node:**

```bash
cd ../service-node
npm install
```

**Back-end Kotlin:**
Abra a pasta `/service-kotlin` no IntelliJ IDEA e aguarde a sincronização automática do Gradle.

### 3\. Configurar Chaves de Acesso (Firebase)

Para que os servidores conectem ao banco de dados, é necessário o arquivo de credenciais (`serviceAccountKey.json`).

> *Nota de Segurança: Este arquivo contém segredos e não está versionado no GitHub. Insira o arquivo `serviceAccountKey.json` fornecido pela equipe na raiz das pastas `/service-node` e `/service-kotlin`.*

-----

## ▶️ Como Executar

O sistema requer que os dois back-ends e o front-end estejam rodando simultaneamente. Abra 3 terminais separados.

### Passo 1: Iniciar o Back-end Admin (Kotlin)

1.  Abra o projeto `/service-kotlin` no IntelliJ.
2.  Localize e execute a classe `Application.kt` (botão Play).
3.  O servidor iniciará em: `http://0.0.0.0:8080`.

### Passo 2: Iniciar o Back-end Usuário (Node.js)

1.  No terminal, navegue até `/service-node`.
2.  Execute:

<!-- end list -->

```bash
node index.js
```

3.  O servidor iniciará em: `http://localhost:3000`.

### Passo 3: Iniciar o Aplicativo (Mobile)

**Configuração de IP:**
Antes de rodar, verifique a `BASE_URL` no arquivo `app-frontend/services/api.ts` e ajuste conforme seu ambiente:

  * **Emulador Android:** `http://10.0.2.2:3000`
  * **Dispositivo Físico (USB):** `http://localhost:3000` (Requer `adb reverse`)
  * **Dispositivo Físico (Wi-Fi/Ngrok):** `http://SEU_IP_LOCAL:3000` ou URL do Ngrok.

**Rodando o App:**

```bash
cd app-frontend
npx expo start --android
```

> **Dica para USB (Android):** Se estiver usando dispositivo físico via USB, execute no terminal antes de abrir o app:
>
> ```bash
> adb reverse tcp:3000 tcp:3000
> adb reverse tcp:8080 tcp:8080
> ```

-----

## 📡 Endpoints da API

Abaixo, as principais rotas disponíveis para teste (via Postman ou Insomnia):

### 🟢 API Usuário (Node.js - Porta 3000)

  * `POST /register` - Criar nova conta.
  * `POST /login` - Autenticar usuário.
  * `GET /partidas` - Listar jogos da rodada.
  * `GET /palpites/:userId` - Listar palpites de um usuário.
  * `POST /palpite` - Registrar novo palpite.
  * `GET /ranking` - Ver classificação geral.

### 🔴 API Admin (Kotlin - Porta 8080)

  * `POST /admin/partidas` - Cadastrar nova partida.
      * *Exemplo Body:* `{ "timeA": "Grêmio", "timeB": "Inter", "data": "28/11" }`
  * `PUT /admin/partidas/{id}` - Editar partida.
  * `DELETE /admin/partidas/{id}` - Remover partida.
  * `POST /admin/resultado` - Inserir resultado e **disparar apuração automática**.
      * *Exemplo Body:* `{ "partidaId": "ID_DA_PARTIDA", "placarA": 2, "placarB": 1 }`

-----

## 👥 Integrantes do Grupo

  * **Guilherme Felix Barreto**
  * **Henrique de Moraes Rodrigues**
  * **Miguel Gustavo de Sousa Campos**
  * **Victor Hugo Navarro Taveira**
  * **Vinicius Valero Chabariberi**

-----

© 2025 Bolão da Rodada Project.

```
```
