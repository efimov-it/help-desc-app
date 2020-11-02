import SET_GUEST_MENU from '../../actions/menu/set_guest_menu'

import AddAdpplication from '../../../views/add-application'

export default () => {
    return {
        type: SET_GUEST_MENU,
        menuItems: [
            {
                text: 'Подать заявку',
                icon: 'edit',
                event: {
                    type: 'modal',
                    modal: {
                        header: 'Новая заявка',
                        content: AddAdpplication
                    }
                }
            },
            // {
            //     text: 'Настройки',
            //     icon: 'settings',
            //     event: {
            //         type: 'url',
            //         url: '/settings'
            //     }
            // }
        ]
    }
}