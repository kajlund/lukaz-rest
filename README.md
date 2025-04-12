# LuKaz REST Backend

This project represents knowledge gained about building REST APIs using Express and MongoDB with Mongoose ODM library.

I also use it as a tool for managing many kinds of personal data like training activities, proverbs, resources (links to developer libs and tools) etc.

Instead of Nodemon the `--watch` flag for restarting the server in development mode is used (Node.js v18+)

The server loads different environment variables depending on environment using the `--env-file` flag.

### Dependencies

- [Express.js v4](https://expressjs.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Pino](https://getpino.io/#/) logging
- [pino-http](https://github.com/pinojs/pino-http#readme)
### Development Dependencies

- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/) code formatter
- [pino-pretty](https://github.com/pinojs/pino-pretty#readme)
