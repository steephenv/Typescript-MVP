const { fork, spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');

const app = path.join(__dirname, '../dist/src/bin/www.js');
const appCwd = path.join(__dirname, '../dist/src/');
const testCwd = path.join(__dirname, '../.roughs/'); // root

const server = createServerAndTestIt();

function createServerAndTestIt() {
  agentLog('*** CREATING TEST SYSTEM ***');
  agentLog('... creating server');

  const serverChild = fork(app, {
    cwd: appCwd,
    stdio: 'inherit',
    env: { NODE_APP_INSTANCE: 'test' },
  });

  serverChild.on('exit', (code, sig) => {
    serverLog(`exited with code ${code} and sig ${sig}.`);
  });
  serverChild.on('error', err => {
    serverLog(`error event with arg`, err);
  });
  serverChild.on('close', err => {
    serverLog(`close event with arg`, err);
    agentLog('server terminated');
    agentExitLog(
      process.exitCode === 0
        ? chalk.green('Exited with code 0')
        : chalk.red(`ERR> Exited with code ${process.exitCode}`),
    );
  });
  serverChild.on('message', msg => {
    serverLog(`message event with arg`, msg);
    if (typeof msg === 'object' && msg.msg === 'ready') {
      agentLog('>>> server reported ready. Starting tests');
      startTests();
    }
  });

  serverLog('PID: ' + serverChild.pid);
  return serverChild;
}

function startTests() {
  let testExitCode = 0; // default

  const testAgent = spawn('npm', ['run', 'test-core'], {
    cwd: testCwd,
    NODE_APP_INSTANCE: 'test',
    stdio: 'inherit',
  });

  testAgent.on('exit', (code, sig) => {
    testLog(`exited with code ${code} and sig ${sig}.`);
    testExitCode = code;
  });
  testAgent.on('error', err => {
    testLog(`error event with arg`, err);
  });
  testAgent.on('close', err => {
    testLog(`close event with arg`, err);
    // when test is over, exit the server
    process.exitCode = testExitCode;
    agentLog('test finished. asking server to terminate..');
    server.send({ msg: 'terminate', statusCode: testExitCode });
  });
  testAgent.on('message', msg => {
    testLog(`message event with arg`, msg);
  });

  testLog('PID: ' + testAgent.pid);
}

function serverLog(msg) {
  console.log(chalk.yellow('[SERVER       > ] ') + chalk.grey(msg));
}
function testLog(msg) {
  console.log(chalk.yellow('[TEST         > ] ') + chalk.grey(msg));
}
function agentLog(msg) {
  console.log(chalk.yellow('[TEST_AGENT   > ] ') + chalk.grey(msg));
}
function agentExitLog(msg) {
  console.log(chalk.yellow('[TEST_AGENT   > ] ') + msg);
}
