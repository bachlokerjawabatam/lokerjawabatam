const TABLET_MAX_SIZE = 991;

var LandingPage = React.createClass({
            getInitialState: function(){
                return {
                    diffTime: {},
                    expDate: new Date(2017, 9, 1),
                    desktopView: true
                }
            },
            componentDidMount: function(){
                var that = this
                this.onWindowResize()
                $(window).on('resize.landing-page', $.proxy(this.onWindowResize, this))
                setInterval(function(){that.launchTime()}, 500)
            },
            componentWillUnmount: function(){
                $(window).off('resize.landing-page')
            },
            onWindowResize: function(){
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                this.setState({desktopView: desktopView})
            },
            launchTime: function(){
                let expDate = this.state.expDate
                let curDate = new Date
                let diffTime = expDate - curDate
                let diffWeek = 1000*60*60*24*7
                let diffDay = 1000*60*60*24
                let diffHour = 1000*60*60
                let diffMinute = 1000*60
                let diffSecond = 1000

                let week = parseInt(diffTime/diffWeek)
                let day = parseInt((diffTime-(diffWeek*week))/diffDay)
                let hour = parseInt((diffTime-(diffWeek*week)-(diffDay*day))/diffHour)
                let minute = parseInt((diffTime-(diffWeek*week)-(diffDay*day)-(diffHour*hour))/diffMinute)
                let second = parseInt((diffTime-(diffWeek*week)-(diffDay*day)-(diffHour*hour)-(diffMinute*minute))/diffSecond)
                

                let diffObj =  {
                    minggu: week, hari: day, 
                    jam: hour, menit: minute,
                    detik: second
                }

                this.setState({diffTime: diffObj})
            },
            mobileView: function(){
                let diffTime = this.state.diffTime
                return(
                    <div className="landing-page-mobile text-center">
                        <div className="title">
                            LokerJawaBatam.com
                        </div>
                        <div className="sub-title">
                            Informasi Lowongan kerja terkini daerah jawa dan batam
                        </div>
                        <div className="picture">
                        </div>
                        <div className="timer">
                            <span className="timer-number-mobile">{diffTime.minggu}</span>
                            <span className="timer-name-mobile">Minggu</span>
                            <span className="timer-number-mobile">{diffTime.hari}</span>
                            <span className="timer-name-mobile">Hari</span>  
                        </div>
                        <div className="timer">
                            <span className="timer-time-mobile">{diffTime.jam}</span>
                            <span className="timer-semicolon-mobile">:</span>
                            <span className="timer-time-mobile">{diffTime.menit}</span>
                            <span className="timer-semicolon-mobile">:</span>
                            <span className="timer-time-mobile">{diffTime.detik}</span>
                        </div>
                        <div className="message">
                            Tunggu Launching Kami pada Tanggal <strong>01 <strike>Septemper</strike>Oktober 2017</strong>
                        </div>
                    </div>
                )
            },
            desktopView: function(){
                let diffTime = this.state.diffTime

                return(
                    <div className="container-fluid landing-page text-center">
                        <div className="cover">
                            <div className="app-title">
                            Lokerjawabatam.com
                        </div>
                        <div className="app-subtitle">
                            informasi lowongan kerja terkini daerah jawa dan batam
                        </div>
                        <div className="picture" />
                        <div className="timer text-center">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12 text-right">
                                    <span className="timer-number">{diffTime.minggu}</span>
                                    <span className="timer-name">Minggu</span>
                                    <span className="timer-number">{diffTime.hari}</span>
                                    <span className="timer-name">Hari</span>  
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 text-left">
                                    <span className="timer-time">{diffTime.jam}</span>
                                    <span className="timer-semicolon">:</span>
                                    <span className="timer-time">{diffTime.menit}</span>
                                    <span className="timer-semicolon">:</span>
                                    <span className="timer-time">{diffTime.detik}</span>
                                </div>
                            </div>
                        </div>
                        <div className="message">
                            Tunggu Launching Kami pada Tanggal <strong>01 <strike>September</strike> Oktober 2017</strong>
                        </div>
                        </div>
                    </div>
                )                
            },
            render: function(){
                let desktopView = this.state.desktopView

                if (desktopView == true){
                    return this.desktopView()
                }else{
                    return this.mobileView()
                }

            }
        });

window.LandingPage = LandingPage