import * as fs from 'fs';
import * as path from 'path';

export class Helper {
  static timeZone: number = -(new Date().getTimezoneOffset());
  static dump = (object: any, message: string = ''): void => {
    console.log(message, object);
  };
  static log = (object: any, message: string = ''): void => {
    const content = this.getClearDateNow() + ' # ' + message + JSON.stringify(object) + '\r\n';

    this.dump(object, message);
    this.appendToFile('log', content);
  };
  static writeToFile = (fileName: string, content: string): void => {
    fs.writeFile(path.resolve(`./${fileName}.txt`), content, error => {
      if (error) {
        throw error;
      }
    });
  };
  static appendToFile = (fileName: string, content: string): void => {
    fs.appendFile(path.resolve(`./${fileName}.txt`), content + '\r\n', error => {
      if (error) {
        throw error;
      }
    });
  };
  static getClearDate = (date: string): string => {
    return date
      .replace('"', '')
      .replace(/T/, ' ')
      .replace(/\..+|\+.+/, '');
  };
  static getDateNow = (): string => {
    const timestamp = Date.now() + Helper.timeZone * 60 * 1000;
    return new Date(timestamp).toISOString();
  };
  static getClearDateNow = (): string => {
    return this.getClearDate(this.getDateNow());
  };
}