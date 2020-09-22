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

export default initialState