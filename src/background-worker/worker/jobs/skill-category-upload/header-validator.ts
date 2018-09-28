export async function headerValidator(chunk: string[]) {
  if (
    chunk[0].toLowerCase() === 'cluster' &&
    chunk[1].toLowerCase() === 'category' &&
    chunk[2].toLowerCase() === 'sub-category'
  ) {
    return { successLog: 'HEADER VALIDATED' };
  }
  return { errLog: 'INVALID HEADER' };
}
