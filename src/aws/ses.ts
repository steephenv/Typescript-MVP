import AWS from './base';

export const ses = new AWS.SES({
  apiVersion: '2010-12-01',
});
