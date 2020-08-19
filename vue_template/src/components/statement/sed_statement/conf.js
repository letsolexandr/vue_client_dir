import {domen, root} from "./config";


export default {
    data() {
        return {
            namespace: 'statement',
            module_name: 'sev_ovv_statement',
            domen: domen,
            root: root,
            base_url: `${domen}/private-statement/private-sed-statement/`,
        }
    }
}