import SET_MODERATOR_MENU from '../../actions/menu/set_moderator_menu'

export default () => {
    return {
        type: SET_MODERATOR_MENU,
        menuItems: [
            {
                text: 'Панель управления',
                icon: 'edit',
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