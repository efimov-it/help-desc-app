import SET_MODERATOR_MENU from '../../actions/menu/set_moderator_menu'

export default () => {
    return {
        type: SET_MODERATOR_MENU,
        menuItems: [
            {
                text: 'Панель управления',
                icon: 'edit',
                event: () => {
                    alert('Подача заявки')
                }
            },
            {
                text: 'Мои заявки',
                icon: 'assignment',
                event: () => {
                    alert('Список заявок')
                }
            },
            {
                text: 'Настройки',
                icon: 'settings',
                event: () => {
                    alert('Настройки')
                }
            },
        ]
    }
}