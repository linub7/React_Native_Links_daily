import axios from 'axios';
import { API } from '../config';
/**
 * I'm using localhosttunnel => lt --port <server-port>
 * and it's providing a url to me, and replace that url as API in config.js file
 */

const client = axios.create({
  baseURL: `${API}/api/v1`,
});

export default client;
