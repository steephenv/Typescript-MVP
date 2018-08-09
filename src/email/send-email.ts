import { get as getConfig } from 'config';
import { render } from 'ejs';

import { ses } from '../aws/ses';
import { AppEmailTemplates } from './app-templates';
import { EmailSignatures } from './signatures';
import { EmailTemplates } from './templates';

class MailOptions {
  public toAddresses: string[];
  public subject: string;
  public fields: any;
  public template: string;
  public bccAddresses?: string[];
  public fromName?: string;
  public fromEmail?: string;
}

export const sendEmail = (mailOptions: MailOptions) => {
  // email config
  const params = {
    Destination: {
      ToAddresses: mailOptions.toAddresses,
      BccAddresses: mailOptions.bccAddresses,
    },
    Message: {
      Body: {
        Html: {
          Data: render(mailOptions.template, mailOptions.fields),
        },
      },
      Subject: { Data: mailOptions.subject },
    },
    Source: `${mailOptions.fromName ||
      'Miwago Services'} ${mailOptions.fromEmail ||
      `<${getConfig('mails.defaultFrom')}>`}` /* required */,
  };
  if (getConfig('mails.enable')) {
    return ses.sendEmail(params).promise();
  }

  return new Promise(resolve => resolve());
};

export { AppEmailTemplates, EmailTemplates, EmailSignatures };

/**
 * un-comment below function for quick testing sendEmail()
 */

// sendEmail({
//   toAddresses: ['lakshmipriya.m@cubettech.com'],
//   subject: 'Verification Code',
//   template: EmailTemplates.SAMPLE,
//   fields: { code: 5474 },
// })
//   .then(data => {
//     console.log('mailed', data); // tslint:disable-line
//   })
//   .catch(err => console.log('ERR', err)); // tslint:disable-line

/**
 * ORIGINAL PARAMS:
 */

// const params = {
// 	Destination: {
// 		/* required */
// 		BccAddresses: [
// 			// 'STRING_VALUE',
// 			/* more items */
// 		],
// 		CcAddresses: [
// 			// 'STRING_VALUE',
// 			/* more items */
// 		],
// 		ToAddresses: [
// 			// 'STRING_VALUE',
// 			/* more items */
// 		],
// 	},
// 	Message: {
// 		/* required */
// 		Body: {
// 			/* required */
// 			Html: {
// 				Data: '' /* required */,
// 				// Charset: 'STRING_VALUE',
// 			},
// 			// Text: {
// 			// 	Data: 'STRING_VALUE' /* required */,
// 			// 	Charset: 'STRING_VALUE',
// 			// },
// 		},
// 		Subject: {
// 			/* required */
// 			Data: 'Default subject' /* required */,
// 			// Charset: 'STRING_VALUE',
// 		},
// 	},
// 	Source: 'no_reply@aumet.me' /* required */,
// 	ConfigurationSetName: 'STRING_VALUE',
// 	ReplyToAddresses: [
// 		'STRING_VALUE',
// 		/* more items */
// 	],
// 	ReturnPath: 'STRING_VALUE',
// 	ReturnPathArn: 'STRING_VALUE',
// 	SourceArn: 'STRING_VALUE',
// 	Tags: [
// 		{
// 			Name: 'STRING_VALUE' /* required */,
// 			Value: 'STRING_VALUE' /* required */,
// 		},
// 		/* more items */
// 	],
// };
