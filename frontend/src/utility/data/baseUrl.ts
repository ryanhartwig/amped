import { getEnv } from "../helpers/getEnv";

export const baseUrl = getEnv<string>('https://amped.herokuapp.com/api', 'http://192.168.2.27:8000/api');