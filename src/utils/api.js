import { getItem } from './token'

export const fetchWithToken = (url, options = {}) => {
  const authToken = getItem( 'eccom-token' );
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${ authToken }`
  };
  
  return fetch( url, options );
}
