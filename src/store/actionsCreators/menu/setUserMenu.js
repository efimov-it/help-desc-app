import SET_USER_MENU from '../../actions/menu/set_user_menu'

export default () => {
    return {
        type: SET_USER_MENU,
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
                text: 'Настройки',
                icon: 'settings',
                event: {
                    type: "url",
                    url: "/control-panel/settings/"
                }
            },
        ]
    }
}