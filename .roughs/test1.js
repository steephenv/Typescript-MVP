setInterval(() => {
  console.log('reporting from test1.js');
}, 700);

setTimeout(() => {
  console.log('complete');
  process.exit(1);
}, 5000);
