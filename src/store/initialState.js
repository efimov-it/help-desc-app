import AddAdpplication from '../views/add-application'
const initialState = {
    user: {
        token: null,
        data: {
            name: null,
            surName: null,
            login: null,
            role: null,
            mail: null,
            post: null
        }
    },
    modals: [

    ],
    menu: {
        isShown: false,
        items: [
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
            {
                text: 'Настройки',
                icon: 'settings',
                event: {
                    type: 'url',
                    url: '/settings'
                }
            }
        ]
    }
}

export default initialState