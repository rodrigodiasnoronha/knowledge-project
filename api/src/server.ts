import { App } from './app';

const { server } = new App();


const port = process.env.APP_PORT || 3333;
server.listen(port, () => console.log(`server running port ${port}`));