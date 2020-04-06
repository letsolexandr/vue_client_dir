
import axios from 'axios';


axios.defaults.headers.common['Authorization'] = (() =>{
  const token = localStorage.getItem('token') || '';
  const autorization =`Token ${token}`;
  return autorization;
})();
export default axios;
