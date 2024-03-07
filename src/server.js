import app from './app';

const port = 3001;
app.listen(port, () => {
  console.log();
  console.log(`CTRL + Click -> http://localhost:${port}`);
});
