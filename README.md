<!-- TITTLE -->
<h1> === API TICKETING === </h1>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

About this project, I am building a web service for a cinema ticket booking system, 
where the user will be able to select a film based on the show schedule and location, 
after that the user can choose the seat to be occupied while watching and make payments in several ways such as: 
* Ovoo
* Gopay
* Dana
* and much more..

before getting a movie ticket.

### Built with

To build a project that I created requires several dependencies / packages, such as:
* [NodeJS](https://nodejs.org)
* [ExpressJS](https://expressjs.com)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [compression](https://www.npmjs.com/package/compression)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [helmet](https://www.npmjs.com/package/helmet)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [morgan](https://www.npmjs.com/package/morgan)
* [multer](https://www.npmjs.com/package/multer)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [redis](https://www.npmjs.com/package/redis)
* [uuid](https://www.npmjs.com/package/uuid)
* [xss-clean](https://www.npmjs.com/package/xss-clean)

## Postman Documentation 

- Just click on this [link](https://documenter.getpostman.com/view/14847832/UUy3A6tf) to see our docs

## Database MySQL

- Just click on this [link](https://github.com/fajriputra/backend-tiketinaja/blob/main/ticketing.sql) to see our database

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/fajriputra/backend-tiketinaja.git
   ```
2. Install all packages on this project with the command below 
   ```sh
   npm install
   ```
3. And you can configuration environment `.env`
   ```sh
   DB_HOST = "YOUR HOST",
   DB_USER = "YOUR USER DB",
   DB_PASS = "YOUR PASSWORD DB",
   DB_NAME = "YOUR NAME DATABASE",
   PORT = "RUNNING PORT",
   SECRETKEY = "YOUR KEY"
   SENDERMAIL = "YOUR MAIL"
   PASSMAIL = "YOUR PASS MAIL"
   ACTIVATION_TOKEN_SECRET = "YOUR TOKEN KEY"
   MIDTRANS_PRODUCTION = "PROD/DEV"
   MIDTRANS_CLIENTKEY = "YOUR KEY"
   MIDTRANS_SERVERKEY = "YOUR KEY"
   REDIS_HOSTNAME = "YOUR HOST"
   REDIS_PORT = "YOUR PORT"
   REDIS_PASSWORD = "YOUR PASSWORD"
   ```
5. Then, you can running this project with the command below 
   ```
   npm run dev
   ```
   
<!-- CONTACT -->
## Contact

AL FAJRI PUTRA PRATAMA 
- Instagram : [@fjri.p](https://instagram.com/fjri.p)
- Linkedin : [NodeJS](https://www.linkedin.com/in/fajriputra)

PROJECT LINK [here](https://backend-fajri.fwebdev2.xyz)
