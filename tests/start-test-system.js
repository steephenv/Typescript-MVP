'use strict';

const { fork, spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');

const app = path.join(__dirname, '../dist/src/bin/www.js');
const appCwd = path.join(__dirname, '../dist/src/');
const testCwd = path.join(__dirname, '../.roughs/'); // root

agentLog(`============ENVS==========`);
agentLog(`NODE_ENV: ${process.env.NODE_ENV}`);
agentLog(`NODE_APP_INSTANCE: ${process.env.NODE_APP_INSTANCE}`);
agentLog(`CWD: ${process.env.CWD}`);
agentLog(`==========================`);

let jestExitCode = null;
let serverExitCode = null;

const server = createServerAndTestIt();

function createServerAndTestIt() {
  agentLog('*** CREATING TEST SYSTEM ***');
  agentLog('... creating server');

  const serverChild = fork(app, {
    cwd: appCwd,
    stdio: 'inherit',
    env: { NODE_APP_INSTANCE: 'test', NODE_ENV: process.env.NODE_ENV },
  });

  serverChild.on('exit', (code, sig) => {
    serverLog(`exited with code ${code} and sig ${sig}.`);
    serverExitCode = code;
  });
  serverChild.on('error', err => {
    serverLog(`error event with arg`, err);
    console.log(err);
    serverExitCode = 1;
  });
  serverChild.on('close', err => {
    serverLog(`close event with arg`, err);
    agentLog('server terminated');
    process.exitCode = +(jestExitCode || serverExitCode);

    agentExitLog(
      serverExitCode === 0
        ? chalk.green('✓ SERVER Exited with code 0')
        : chalk.red(`❌ SERVER ERR> Exited with code ${serverExitCode}`),
    );
    agentExitLog(
      jestExitCode === 0
        ? chalk.green('✓ JEST Exited with code 0')
        : chalk.red(`❌ JEST ERR> Exited with code ${jestExitCode}`),
    );
    agentExitLog(
      process.exitCode === 0
        ? chalk.green('✓ Exited with code 0')
        : chalk.red(`❌ ERR> Exited with code ${process.exitCode}`),
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
    stdio: 'inherit',
    // env: {
    //   NODE_APP_INSTANCE: 'test',
    //   NODE_ENV: process.env.NODE_ENV,
    // },
  });

  testAgent.on('exit', (code, sig) => {
    testLog(`exited with code ${code} and sig ${sig}.`);
    jestExitCode = code;
  });
  testAgent.on('error', err => {
    testLog(`error event with arg`, err);
    console.log(err);
    jestExitCode = 1;
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
