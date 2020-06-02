import Api from './Api';

const { server } = new Api();

const port = process.env.PORT || 3333;
server.listen(port, () => console.log(`server running port ${port}`));
