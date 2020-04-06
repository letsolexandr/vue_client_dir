import axios from 'axios';

getObject({ commit,store }, id){
    //debugger;
    axios.get(`${this.base_url}${id}/`)
        .then((response) => {
               console.log(response);
               state.form = response.data;
               state.dialog = !state.dialog;
        })
        .catch(error => {
          let error_data = error.response.data;

        })
  }

  export {getObject};
