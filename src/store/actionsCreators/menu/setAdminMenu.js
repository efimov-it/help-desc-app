import SET_ADMIN_MENU from '../../actions/menu/set_admin_menu'

export default () => {
    return {
        type: SET_ADMIN_MENU,
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
                text: 'Пользователи',
                icon: 'people',
                event: () => {
                    alert('Список пользователей')
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