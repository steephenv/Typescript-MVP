export type WorkerTask = (
  file: string,
) => Promise<{ successLog: string[]; errLog: string[] }>;
