// Dependencies
import { Wuun } from 'wuun';

const wuun = new Wuun(__dirname + '/logs');

export default (log: any, message: string, data?: any) => wuun.rainlog(log, message, data);
