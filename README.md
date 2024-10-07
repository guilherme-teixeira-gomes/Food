# Whatsall

## Installation and Usage (Linux Ubuntu - Development)

Create Mysql Database using docker:
_Note_: change MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER and MYSQL_ROOT_PASSWORD.

```bash
docker run --name whaticketdb -e MYSQL_ROOT_PASSWORD=strongpassword -e MYSQL_DATABASE=whaticket -e MYSQL_USER=whaticket -e MYSQL_PASSWORD=whaticket --restart always -p 3306:3306 -d mariadb:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_bin

# Or run using `docker-compose` as below
# Before copy .env.example to .env first and set the variables in the file.
docker-compose up -d mysql

# To administer this mysql database easily using phpmyadmin. 
# It will run by default on port 9000, but can be changed in .env using `PMA_PORT`
docker-compose -f docker-compose.phpmyadmin.yaml up -d
```

Install puppeteer dependencies:

```bash
sudo apt-get install -y libxshmfence-dev libgbm-dev wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils
```

Clone this repo

```bash
git clone https://github.com/canove/whaticket/ whaticket
```

Go to backend folder and create .env file:

```bash
cp .env.example .env
nano .env
```

Fill `.env` file with environment variables:

```bash
NODE_ENV=DEVELOPMENT      #it helps on debugging
BACKEND_URL=http://localhost
FRONTEND_URL=http://localhost:3000
PROXY_PORT=8080
PORT=8080

DB_HOST=127.0.0.1   #DB host IP, usually localhost
DB_DIALECT=mysql
DB_USER=whaticket
DB_PASS=whaticket
DB_NAME=whaticket

JWT_SECRET=3123123213123
JWT_REFRESH_SECRET=75756756756
```

Install backend dependencies, build app, run migrations and seeds:

```bash
npm install
npm run build
npx sequelize db:migrate
npx sequelize db:seed:all
```

Start backend:

```bash
npm start
```

Open a second terminal, go to frontend folder and create .env file:

```bash
nano .env
REACT_APP_BACKEND_URL = http://localhost:8080/ # Your previous configured backend app URL.
```

Start frontend app:

```bash
npm start
```

- Go to http://your_server_ip:3000/signup
- Create an user and login with it.
- On the sidebard, go to _Connections_ page and create your first WhatsApp connection.
- Wait for QR CODE button to appear, click it and read qr code.
- Done. Every message received by your synced WhatsApp number will appear in Tickets List.

## Basic production deployment

### Using Ubuntu 20.04 VPS

Seguem abaixo algumas instruções de como realizar a configuração customizadas da versão Whatsall. Para facilitar o processo de instalação, criamos um setup automatizado utilizando container docker.

1 - Antes de começar você precisa instalar o docker e o docker-compose:

* Docker: https://docs.docker.com/engine/install/ubuntu/
* Docker compose: https://docs.docker.com/compose/install/

2 - Faça uma cópia do arquivo .env.example com o nome .env

3 - Alimente as variáveis de ambiente

|Variável | Descrição | Exemplo
|:-:|:-:|:-:|
VOLUMES | Pasta que espelhará conteúdo dos container | ../whatsall1
MARIADB_DATABASE | Nome do banco de dados | whatsall
MARIADB_USER | Nome do usuário | whatsall
MARIADB_PASS | Senha do usuário | whatsall
MARIADB_PORT | Porta do exposta pelo mysql | 3306
CHROME_PORT | Porta do exposta pelo serviço do chrome | 3000
BACKEND_PORT | Porta do exposta pelo serviço do backend | 8080
FRONTEND_PORT | Porta do exposta pelo serviço do backend | 3333

4 - O setup do .env do frontend e backend continuam os mesmos, apenas uma pequena diferença ocorrerá no DB_HOST do backend, que receberá o mesmo valor do nome do serviço do docker, no caso mariadb. Ele reconhece o host a partir do link definido do docker-compose.yml. Veja o exemplo abaixo:

```bash
# backend .env
NODE_ENV=development
BACKEND_URL=http://192.168.1.101
FRONTEND_URL=http://192.168.1.101:3499
PROXY_PORT=8099
PORT=8099

DB_DIALECT=
DB_HOST=mariadb
DB_USER=whatsall
DB_PASS=whatsall
DB_NAME=whatsall

# Valor esperado ws://chrome:3000 (porta definida pra o serviço do chrome)
CHROME_URI=

JWT_SECRET=123456
JWT_REFRESH_SECRET=123456

# Credenciais de email para notificar desconexao 
EMAIL=
CREDENTIALS=

```

5 - Por fim, para subir os container basta executar o comando na raiz do projeto:

```bash
docker-compose up -d
docker-compose exec backend npx sequelize db:migrate #executa as migrations
```

6 - Também criamos um arquivo para facilitar o processo inicial de deploy, para utilizá-lo basta executar o seguinte comando:

```bash
chmod +x ./deploy.sh # EXECUTAR ESSE COMANDO APENAS UMA VEZ PARA LIBERAR A PERMISSÃO DE EXECUÇÃO
./deploy.sh #script
#!/bin/bash
#git pull
#docker-compose up -d --build
#sleep 5
#docker-compose exec backend npx sequelize db:migrate
```

7 - Para utilizar os seeders, basta executar o comando abaixo dentro do serviçco do backend:

```bash
docker-compose exec backend npx sequelize db:seed:all
```

8 - Para atualizar o sistema:

```bash
git pull
docker-compose up -d --build backend frontend # atenção, apenas esses dois serviços devem ser buildados novamente
docker image prune # remove imagens ociosas
```
