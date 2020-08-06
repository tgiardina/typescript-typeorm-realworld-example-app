import initApp from './app';

(async () => {
  const app = await initApp();
  app.listen(process.env.PORT, function() {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
})()
