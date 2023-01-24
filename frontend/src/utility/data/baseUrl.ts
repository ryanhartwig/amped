import { getEnv } from "../helpers/getEnv";

export const baseUrl = getEnv<string>('https://amped.herokuapp.com/api', 'http://localhost:8000/api');