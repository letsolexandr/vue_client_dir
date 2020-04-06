import axios from "axios";

function parseChoices(options) {
    /**
     * Обробляє дані та записує дані у списки вибору "choices"
     * @param  {Object}
     */
    let keys = Object.keys(options)
    keys.forEach((key) => {
        if (options[key].choices) {
            this.choices[key] = options[key].choices
        }
    })
}

function parseFileFieldV1s(options) {
    /**
     * Обробляє дані та записує дані у списки вибору "choices"
     * @param  {Object}
     */
    if (!options) {
        return
    }

    let file_fields = []
    let keys = Object.keys(options)
    keys.forEach((key) => {
        if (options[key].type === "file upload") {
            file_fields.push(key)
        }
    })
    this.file_fields = file_fields

}

function loadOptions() {
    /**
     Завантажити дані для випадалок
     */
    console.log('saveChoices start')
    const self = this
    const promise = new Promise((resolve, reject) => {
        axios({
            url: self.base_url,
            method: 'OPTIONS',
        }).then((response) => {
            let options = response.data.actions.POST
            //debugger
            if (options) {
                self.parseChoices(options)
                if (self.parseFileFieldV1s) {
                    self.parseFileFieldV1s(options)
                }
            }
            resolve(options)
            console.log('saveChoices and')
        }).catch(console.error)
    })
    return promise
}

function getFromChoices(key, choice_name) {
    let choices = this.choices[choice_name]
    //console.log(key, choice_name)

    if (choices) {
        let choice = choices.find((item) => {
            return item.value === key
        })
        if (choice) {
            return choice.display_name
        } else {
            console.log('choice not exist')
        }
    } else {
        console.log(`choices "${choices}" not found`)
    }
}


function getChoices(key) {
    /**
     */
    //debugger
    if (!key) {
        throw '"key" is undefined or null'
    }
    if (this.choices && this.choices[key]) {
        let data = this.choices[key]
        return data
    }
}

function go_to(url, id) {
    this.$router.push(`${url}${id}`);
}


export {loadOptions, parseFileFieldV1s, parseChoices, getFromChoices, getChoices, go_to};


