const state = {
  snackbar: false,
  message: null,
  color: 'success',
}

const actions = {

updateSnackbar({ commit }, value){
  state.snackbar = value;

},
 showMessage({ commit }, message){
   setTimeout(()=>{
     state.message = message;
     state.snackbar = true;
   },300);

 },
 closeMessage({ commit }){
   state.snackbar = false;
 },
}


const getters = {
  getMessage: state=> state.message,
  snackbar: state=> state.snackbar,
  messageColor: state=> state.color,
}


const messageBarModule = {
  state,
  getters,
  actions,
}

export default messageBarModule;
