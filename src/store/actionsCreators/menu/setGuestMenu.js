import SET_GUEST_MENU from '../../actions/menu/set_guest_menu'

export default () => {
    return {
        type: SET_GUEST_MENU,
        menuItems: [
            {
                text: 'Подать заявку',
                icon: 'edit',
                event: () => {
                    alert('Подача заявки')
                }
            },
            {
                text: 'Настройки',
                icon: 'settings',
                event: () => {
                    alert('Страница с настройками')
                }
            }
        ]
    }
}