import React from 'react'
import {connect} from 'react-redux'

import mapDispatchToProps from '../../store/mapDispatchToProps'
import mapStateToProps from '../../store/mapStateToProps'

import Card from '../../components/card'
import SubmitTextBox from '../../components/submit-textbox'

import AddApplication from '../add-application'
import ApplicationStatus from '../application-status'
import SendApplicationCode from '../send-application-code'

import './index.scss'
import BannerImage1 from '../../assets/ui/main_page_banner_1.png'
import BannerImage2 from '../../assets/ui/main_page_banner_2.png'
import BannerImage3 from '../../assets/ui/main_page_banner_3.png'

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            applicationsCount: 0,
            processingTime: 0
        }
    }

    componentDidMount () {
        global.sendRequest({
            url: '/init/'
        })
        .then(resp=>{
            this.setState({
                applicationsCount: resp.applications_count,
                processingTime: resp.processing_time
            })
        })
        .catch(err=>{
            this.props.createResultModal(err, 'error')
        })
    }

    newApplicationsModal () {
        this.props.createModal({
            content: AddApplication,
            header: "Новая заявка"
        })
    }

    applicationStatusModal (code) {
        if (code === "") {
            this.props.createResultModal('Вы не указали идентификатор вашей заявки.', 'error')
        }
        else {
            this.props.createModal({
                content: ApplicationStatus,
                header: "Заявка #" + code,
                data: code
            })
        }
    }

    sendApplicationCodeModal () {
        this.props.createModal({
            header: 'Восстановление доступа к заявкам',
            content: SendApplicationCode
        })
    }

    render () {
        return (
            <div className="main-page_wrapper">
                <div className="main-page">
                    <div className="main-page_cards">
                        <Card backgroundImage={BannerImage1}>
                            <div className="main-page_card-counter"
                                 title={'В данный момент тех. поддержка обрабатывает ' + this.state.applicationsCount + ' заявок.'}>
                                <h2 className="main-page_card-counter-num">
                                    {this.state.applicationsCount}
                                    <div className={'main-page_card-counter-indicator' + (this.state.applicationsCount > 5 ? ' main-page_card-counter-indicator__yellow' : '')} />
                                </h2>
                                <h3 className="main-page_card-counter-title">
                                    заявок в обработке
                                </h3>
                            </div>
                            <button
                                className="main-page_card-button button button__big"
                                title="Открыть форму подачи заявки"
                                onClick={()=>this.newApplicationsModal.apply(this)}
                            >
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
                            <SubmitTextBox onSubmit={(code)=>this.applicationStatusModal.apply(this, [code])}
                                           buttonText="Проверить"
                                           placeholder="Идентификатор заявки"
                                           inputTitle="Пожалуйста, введите идентификатор заявки"
                                           buttonTitle="Проверить статус заявки по идентификатору"
                                           className="main-page_card-input" />
                            <span
                                className="link"
                                onClick={()=>this.sendApplicationCodeModal.apply(this)}
                            >Я потерял(а) идентификатор заявки</span>
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

export default connect(
    mapStateToProps('mainPage'),
    mapDispatchToProps('mainPage')
)(MainPage)