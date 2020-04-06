const state = {
    drawer: null,
    map_input: null,
    items: [{
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Адмін',
        model: false,
        requires_permission: 'view_coreorganization',

        children: [{
            icon: 'mdi-account-group',
            text: 'Організації',
            url: "/main/organization",
            requires_permission: 'view_coreorganization',

        },
            {
                icon: 'mdi-account',
                text: 'Користувачі',
                url: "/main/user",
                requires_permission: 'view_coreuser'
            },
            {
                icon: 'mdi-account-multiple',
                text: 'Групи',
                url: "/main/group",
                requires_permission: 'view_group'
            },
            {
                icon: 'mdi-security',
                text: 'Дозволи',
                url: "/main/permissions",
                requires_permission: 'view_permission'
            }
        ]
    },
        {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Довідники',
            model: false,
            requires_permission: 'view_coreuser',
            children: [
                {
                    icon: 'mdi-notebook-multiple',
                    text: 'Довідник типів послуг',
                    url: "/main/product",
                    requires_permission: 'view_product',
                },
                {
                    icon: 'mdi-notebook-multiple',
                    text: 'Довідник типів абонплат',
                    url: "/main/subscription",
                    requires_permission: 'view_subscription',
                },

                {
                    icon: 'mdi-notebook-multiple',
                    text: 'Довідник видів основної діяльності',
                    url: "/main/mainactivity",
                    requires_permission: 'view_mainactivity',
                },
                {
                    icon: 'mdi-notebook-multiple',
                    text: 'Довідник типів власності',
                    url: "/main/property_type",
                    requires_permission: 'view_propertytype',
                },
                {
                    icon: 'mdi-notebook-multiple',
                    text: 'Довідник типів організацій',
                    url: "/main/organization_type",
                    requires_permission: 'view_organizationtype',
                },
                {
                    icon: 'mdi-notebook-multiple',
                    text: 'Довідник шаблнів документів',
                    url: "/main/template_document",
                    requires_permission: 'view_templatedocument',
                },
            ]
        },
        {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Договори',
            model: false,
            requires_permission: 'view_contract',
            children: [
                {
                    icon: 'mdi-file-document-box-multiple-outline',
                    text: 'Договори',
                    url: "/main/contracts",
                    requires_permission: 'view_contract',
                },
                {
                    icon: 'mdi-file-table-outline',
                    text: 'Нарахування',
                    url: "/main/register_accurual",
                    requires_permission: 'view_registeraccrual',
                },
                {
                    icon: 'mdi-file-table-outline',
                    text: 'Платежі',
                    url: "/main/register_payment",
                    requires_permission: 'view_registerpayment',
                }, {
                    icon: 'mdi-file-table-outline',
                    text: 'Імпорт платежів',
                    url: "/main/register_import_payment",
                    requires_permission: 'view_importpayment',
                },
                {
                    icon: 'keyboard_arrow_up',
                    'icon-alt': 'keyboard_arrow_down',
                    text: 'Акти',
                    //url: "/main/register_act",
                    model: false,
                    requires_permission: 'view_registeract',
                    children: [
                        {
                            icon: 'mdi-file-document-edit',
                            text: 'Акти дійсних договорів',
                            url: "/main/register_act",
                            requires_permission: 'view_registeract',
                        },
                    ]
                },

            ]
        },
        {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Заявки (Маркетинг)',
            model: false,
            requires_permission: 'add_sedstatement',
            children: [
                {
                    icon: 'mdi-file-document',
                    text: 'Нові заявки на підключення до СЕВСЕД',
                    url: "/main/sed_statement_new",
                    requires_permission: 'view_sedstatement',
                },
                {
                    icon: 'mdi-file-document',
                    text: 'Прострочені заявки на підключення до СЕВСЕД',
                    url: "/main/sed_statement_7",
                    requires_permission: 'view_sedstatement',
                },
                {
                    icon: 'mdi-file-document',
                    text: 'Заявки на підключення до СЕВСЕД',
                    url: "/main/sed_statement",
                    requires_permission: 'view_sedstatement',
                },

            ]
        },
        {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Заявки (Тех)',
            model: false,
            requires_permission: 'view_sedstatement_tech',
            children: [
                {
                    icon: 'mdi-file-document',
                    text: 'Нові заявки на підключення до СЕВСЕД',
                    url: "/main/sed_statement_tech_new",
                    requires_permission: 'view_sedstatement',
                },
                {
                    icon: 'mdi-file-document',
                    text: 'Виконані заявки на підключення до СЕВСЕД',
                    url: "/main/sed_statement_tech_complete",
                    requires_permission: 'view_sedstatement',
                },
                {
                    icon: 'mdi-file-delimited',
                    text: 'Заявки на підключення до Системи ЦНАП',
                    url: "/main/sed_statementconnectioncnap",
                    requires_permission: 'view_sedstatement_tech',
                }
            ]
        },
        {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'CRM',
            model: false,
            requires_permission: 'view_tasks',
            children: [
                {
                    icon: 'mdi-file-document',
                    text: 'Задачі',
                    url: "/main/crm_tasks",
                    requires_permission: 'view_tasks',
                },
            ]
        },
        {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Інструменти',
            model: false,
            requires_permission: 'view_tools',
            children: [
                {
                    icon: 'mdi-file-document',
                    text: 'Конвертація 1с',
                    url: "/main/convert1c",
                    requires_permission: 'view_tools',
                },
            ]
        }

    ]
}

const getters = {
    items: state => state.items
}

const menuModule = {
    state,
    getters
}

export default menuModule;
