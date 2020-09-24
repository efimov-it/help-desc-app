import React from 'react'

import Card from '../../components/card'
import SubmitTextBox from '../../components/submit-textbox'

import './index.scss'
import BannerImage1 from '../../assets/ui/main_page_banner_1.png'
import BannerImage2 from '../../assets/ui/main_page_banner_2.png'
import BannerImage3 from '../../assets/ui/main_page_banner_3.png'

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            applicationCount: 7,
            processingTime: '4,3',
        }
    }

    render () {
        return (
            <div className="main-page_wrapper">
                <div className="main-page">
                    <div className="main-page_cards">
                        <Card backgroundImage={BannerImage1}>
                            <div className="main-page_card-counter"
                                 title={'В данный момент тех. поддержка обрабатывает ' + this.state.applicationCount + ' заявок.'}>
                                <h2 className="main-page_card-counter-num">
                                    {this.state.applicationCount}
                                    <div className={'main-page_card-counter-indicator' + (this.state.applicationCount > 5 ? ' main-page_card-counter-indicator__yellow' : '')} />
                                </h2>
                                <h3 className="main-page_card-counter-title">
                                    заявок в обработке
                                </h3>
                            </div>
                            <button className="main-page_card-button button button__big"
                                    title="Открыть форму подачи заявки">
                                Подать заявку
                            </button>
                        </Card>
                        <Card backgroundImage={BannerImage2}>
                            <div className="main-page_card-counter"
                                 title={this.state.processingTime + ' мин. - среднее время приёма новой заявки тех. поддержкой.'}>
                                <h2 className="main-page_card-counter-num">
                                    {this.state.processingTime}
                                    <span className="main-page_card-counter-num__small">мин.</span>
                                    <div className={'main-page_card-counter-indicator' + (this.state.processingTime > 7 ? ' main-page_card-counter-indicator__yellow' : '')} />
                                </h2>
                                <h3 className="main-page_card-counter-title">
                                    среднее время приёма заявок
                                </h3>
                            </div>
                            
                        </Card>
                    </div>

                    <div className="main-page_card">
                        <Card>
                            <h2 className="main-page_card-title">
                                Проверить статус заявки
                            </h2>
                            <p className="main-page_card-text">Укажите идентификатор вашей заявки:</p>
                            <SubmitTextBox onSubmit={()=>{alert()}}
                                           buttonText="Проверить"
                                           placeholder="Идентификатор заявки"
                                           inputTitle="Пожалуйста, введите идентификатор заявки"
                                           buttonTitle="Проверить статус заявки по идентификатору"
                                           className="main-page_card-input" />
                            <span className="link">Я потерял(а) идентификатор заявки</span>
                            <img className="main-page_card-img"
                                 src={BannerImage3}
                                 alt="banner"/>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}