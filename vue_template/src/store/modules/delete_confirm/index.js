
const state = {
  confirm_del_message:null,
  id:null,
  delete_model:null,
  confirm_del_dialog:false,
}

const actions = {

  clearState({
    commit,
    state
  }, params) {

    Object.keys(state)
      .forEach(e => {
        state[e] = false;
      });
  },

  updateConfirmMessage({ commit },message){
    state.confirm_del_message = message;
  },

  openDeleteDialog({ commit,state }, params) {

    state.id = params.id;
    state.confirm_del_message = params.confirm_del_message;
    state.delete_model = params.module;
    this.dispatch('togleDeleteDialog');
  },

  togleDeleteDialog({ commit },) {
    state.confirm_del_dialog = !state.confirm_del_dialog;
  },

  confirmDelete({ commit,state }) {
    let module = state.delete_model;
    let message = state.confirm_del_message;
    this.dispatch('deleteObject', {id:state.id,
      module:module,
      confirm_del_message:message
     });
    this.dispatch('togleDeleteDialog');
    //this.dispatch('clearState');
  },
}


const getters = {
  confirm_del_dialog: state => state.confirm_del_dialog,
  confirm_del_message: state => state.confirm_del_message,
}


const deleteConfirmModule = {
  state,
  getters,
  actions,
}

export default deleteConfirmModule;
