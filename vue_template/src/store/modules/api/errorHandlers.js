function handle_http_error(router, error, self, object = null) {
    debugger
    var message
    if (error.response) {
        message = error.response.data
    } else {
        message = error.message
    }
    if (error.response && [401].indexOf(error.response.status) !== -1) {
        debugger
        customError(self.state, 'Токен авторизації не дійсний', 'Не вдалося завантажити дані з сервера')
        object.$router.push('/login')
        return

    }
    if (error.response && [403].indexOf(error.response.status) !== -1) {
        debugger
        customError(self.state, 'У вас недостатньо прав', 'У Вас недостатньо прав для виконання даної операції')
         return

    }
    if (error.response && [500, 404].indexOf(error.response.status) !== -1) {
        self.state.info_dialog.infoDialog.open({title: error.name, message: message})
        return
    }
    if (message) {
        self.state.info_dialog.infoDialog.open({title: error.name, message: message})
        return
    }
}

function customError(state, error, message) {
    //debugger
    state.info_dialog.infoDialog.open({title: error, message: message})
}

export {handle_http_error, customError};