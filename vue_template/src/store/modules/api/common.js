function show_message_in_snackbar(message, store) {
    //debugger
    store.state.info_dialog.messageBar.open({message})
}

export {show_message_in_snackbar};