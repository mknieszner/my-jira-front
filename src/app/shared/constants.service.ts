export class ConstantsService {
  public shortcuts = new Map();

  constructor(){
    this.shortcuts.set('COMMON_TABLE_ENVIRONMENT', "C");
    this.shortcuts.set('SEPARATE_TABLE_ENVIRONMENT', "S");
  }

  getShortcut(environment): string{
    return this.shortcuts.get(environment);
  }
}
