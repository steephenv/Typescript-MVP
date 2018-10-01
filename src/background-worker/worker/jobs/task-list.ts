interface ITasks {
  [key: string]: string;
}

export abstract class Tasks implements ITasks {
  [key: string]: string;

  // function names
  public static CAT_TEST = 'CAT_TEST';
  public static SKILL_CATEGORY_CSV = 'SKILL_CATEGORY_CSV';
}
