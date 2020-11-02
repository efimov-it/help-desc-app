import SET_ADMIN_MENU from '../../actions/menu/set_admin_menu'

export default () => {
    return {
        type: SET_ADMIN_MENU,
        menuItems: [
            {
                text: 'Панель управления',
                icon: 'dashboard',
                event: {
                    type: "url",
                    url: "/control-panel/"
                }
            },
            {
                text: 'Мои заявки',
                icon: 'assignment',
                event: {
                    type: "url",
                    url: "/control-panel/applications/"
                }
            },
            {
                text: 'Архив',
                icon: 'assignment_turned_in',
                event: {
                    type: "url",
                    url: "/control-panel/archive/"
                }
            },
            {
                text: 'Пользователи',
                icon: 'people',
                event: {
                    type: "url",
                    url: "/control-panel/users/"
                }
            },
            // {
            //     text: 'Настройки',
            //     icon: 'settings',
            //     event: {
            //         type: "url",
            //         url: "/control-panel/settings/"
            //     }
            // },
        ]
    }
}