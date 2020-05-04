import express from 'express';
import 'reflect-metadata';
import './database';

const app = express();

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333');
});
