const routes = [{
    name: "login",
    path: "/login",
    components: {
        default: () => import("@/layouts/Login")
    }
},
    {
        name: "main",
        path: "/main",
        components: {
            default: () => import("@/layouts/MainLayout"),

        },
        meta: {
            requiresAuth: false,
            //requires_permissions: 'view_coreorganization',
            breadcrumb: 'Домівка'
        },
        children: [
            {
                name: "chart",
                path: "",
                components: {
                    content: () => import("@/components/dashboards/Main")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Дашборд',
                    requires_permission: 'view_dashboard',
                }
            },
            {
                name: "user",
                path: "user",
                components: {
                    content: () => import("@/components/admin/user/UserDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Користувачі',
                    requires_permission: 'view_coreuser',
                }
            },
            {
                name: "group",
                path: "group",
                components: {
                    content: () => import("@/components/admin/group/GroupDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Групи',
                    requires_permission: 'view_group',
                }
            },
            {
                name: "permissions",
                path: "permissions",
                components: {
                    content: () => import("../components/admin/permissions/PermissionDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Дозволи',
                    requires_permission: 'view_permission',
                }
            },
            {
                name: "organization",
                path: "organization",
                components: {
                    content: () => import("@/components/admin/organization/OrganizationDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Організації',
                    requires_permission: 'view_coreorganization',
                }
            },
            {
                name: "mainactivity",
                path: "mainactivity",
                components: {
                    content: () => import("@/components/dict_register/main_activity/MainActivityDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Вид діяльності',
                    requires_permission: 'view_mainactivity',
                }
            },
            {
                name: "product",
                path: "product",
                components: {
                    content: () => import("@/components/dict_register/product/ProductDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Послуги',
                    requires_permission: 'view_product',
                }
            },
            {
                name: "subscription",
                path: "subscription",
                components: {
                    content: () => import("@/components/dict_register/subscription/SubscriptionDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Типи абонплат',
                    requires_permission: 'view_product',
                }
            },
            {
                name: "property_type",
                path: "property_type",
                components: {
                    content: () => import("@/components/dict_register/property_type/PropertyTypeDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Тип власності',
                    requires_permission: 'view_propertytype',
                }
            },
            {
                name: "organization_type",
                path: "organization_type",
                components: {
                    content: () => import("@/components/dict_register/organization_type/OrganizationTypeDataTable")
                },
                meta: {
                    requiresAuth: true,
                    breadcrumb: 'Тип організації',
                    requires_permission: 'view_organizationtype',
                }
            },
            {
                name: "template_document",
                path: "template_document",
                components: {
                    content: () => import("@/components/dict_register/template_document/TemplateDocumentTypeDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_templatedocument',
                    breadcrumb: 'Шаблони документів'
                }
            },
            {
                name: "contracts",
                path: "contracts",
                components: {
                    content: () => import("@/components/contract/contract/ContractDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_contract',
                    breadcrumb: 'Договори'
                },

                children: [
                    {
                        name: "id",
                        path: ":id",
                        components: {
                            item: () => import("@/components/contract/contract/card/ContractCard"),
                        },
                        meta: {
                            requiresAuth: true,
                            requires_permission: 'view_contract',
                            breadcrumb: 'Договір'
                        }
                    }
                ]
            },

            {
                name: "register_accurual",
                path: "register_accurual",
                components: {
                    content: () => import("@/components/contract/register_accurual/RegisterAccrualDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_registeraccrual',
                    breadcrumb: 'Нарахування'
                }
            },
            {
                name: "register_payment",
                path: "register_payment",
                components: {
                    content: () => import("@/components/contract/register_payment/RegisterPaymentDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_registerpayment',
                    breadcrumb: 'Платежі'
                }
            },
            {
                name: "register_import_payment",
                path: "register_import_payment",
                components: {
                    content: () => import("@/components/contract/import_payment/RegisterImportPaymentDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_importpayment',
                    breadcrumb: 'Платежі'
                }
            },
            {
                name: "register_act",
                path: "register_act",
                components: {
                    content: () => import("../components/contract/register_act/RegisterActDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_registeract',
                    breadcrumb: 'Акти'
                }
            },
            {
                name: "sed_statement",
                path: "sed_statement",
                components: {
                    content: () => import("@/components/statement/sed_statement/SEDStatementDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_sedstatement',
                    breadcrumb: 'Зявки на підключення до СЕВ ОВВ'
                },

                children: [
                    {
                        name: "sed_statement__id",
                        path: ":id",
                        components: {
                            item: () => import("@/components/statement/sed_statement/SEDStatementCard"),
                        },
                        meta: {
                            requiresAuth: true,
                            requires_permission: 'view_sedstatement',
                            breadcrumb: 'Заявка'
                        }
                    }
                ]
            },
            {
                name: "sed_statement_new",
                path: "sed_statement_new",
                components: {
                    content: () => import("@/components/statement/sed_statement/SEDStatementDataTable1")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_sedstatement',
                    breadcrumb: 'Зявки на підключення до СЕВ ОВВ (Нові)'
                }
            },
            {
                name: "sed_statement_7",
                path: "sed_statement_7",
                components: {
                    content: () => import("@/components/statement/sed_statement/SEDStatementDataTable7")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_sedstatement',
                    breadcrumb: 'Зявки на підключення до СЕВ ОВВ (Прострочені)'
                }
            },
            {
                name: "sed_statement_tech_new",
                path: "sed_statement_tech_new",
                components: {
                    content: () => import("@/components/statement/sed_statement/SEDStatementDataTableTech")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_sedstatement',
                    breadcrumb: 'Зявки на підключення до СЕВ ОВВ (Нові)'
                }
            },
            {
                name: "sed_statement_tech_complete",
                path: "sed_statement_tech_complete",
                components: {
                    content: () => import("@/components/statement/sed_statement/SEDStatementDataTableTechComplete")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_sedstatement',
                    breadcrumb: 'Зявки на підключення до СЕВ ОВВ (Виконані)'
                }
            },
            {
                name: "sed_statementconnectioncnap",
                path: "sed_statementconnectioncnap",
                components: {
                    content: () => import("@/components/statement/statement_connection_cnap/StatementConnectionCNAPDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_sedstatement_tech',
                    breadcrumb: 'Заявки на підключення до Системи ЦНАП'
                }
            },
            {
                name: "crm_tasks",
                path: "crm_tasks",
                components: {
                    content: () => import("../components/crm/tasks/TasksDataTable")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_task',
                    breadcrumb: 'Задачі'
                },
                children: [
                    {
                        name: "task__id",
                        path: ":id",
                        components: {
                            item: () => import("../components/crm/tasks/TaskCard"),
                        },
                        meta: {
                            requiresAuth: true,
                            requires_permission: 'view_task',
                            breadcrumb: 'Задача'
                        }
                    }
                ]
            },
            {
                name: "convert1c",
                path: "convert1c",
                components: {
                    content: () => import("../components/tools/ClientBankConvert1C")
                },
                meta: {
                    requiresAuth: true,
                    requires_permission: 'view_tools',
                    breadcrumb: 'Конвертація 1с'
                }
            }
        ]
    }
]

export default routes;