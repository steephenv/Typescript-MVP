import { CronJob } from 'cron';

import { dayCheck } from './exports/profile-completion-check';

export class CronJobs {
  private jobs = [
    {
      cronTime: '0 0 0 * * *', // Everyday at 12 AM
      onTick: dayCheck,
    },
    // {
    //   cronTime: '0 23 12 * * *', // Everyday at 1 AM
    //   onTick: () => {
    //     return new Promise(res => {
    //       console.log('crrr'); // tslint:disable-line:no-console
    //       res();
    //     });
    //   },
    // },
    // {
    //   cronTime: '0 0 2 * * *', // Everyday at 2 AM
    //   onTick: fillYourProfile,
    // },
    // {
    //   cronTime: '0 0 3 * * *', // Everyday at 3 AM
    //   onTick: clearExportedFiles,
    // },
  ];

  public start(callback: () => void): void {
    this.createCronJobs();
    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  private createCronJobs(): void {
    this.jobs.forEach(job => {
      const newJob = new CronJob(job.cronTime, job.onTick);
      newJob.start();
    });
  }
}

// const cronJ = new CronJobs();
// cronJ.start(() => console.log('sdfds'));
