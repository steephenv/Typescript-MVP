import * as path from 'path';

const userHome = '';
const envDir = `${process.env.NODE_ENV}-${process.env.NODE_APP_INSTANCE}`;
const fileName = 'userId';

const pathToFile = path.join(userHome, envDir, fileName);
