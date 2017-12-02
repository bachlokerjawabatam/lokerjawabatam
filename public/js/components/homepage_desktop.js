var NavbarMenu = React.createClass({
    onClickItemMenu: function(contentType){
        if(contentType == 'loker_batam' || contentType == 'loker_jawa'){
            let currentContentType = HomepageStore.getContentType()
            if(currentContentType != contentType){
                $.ajax({
                    url: '/homepage/set_session_content_type',
                    method: 'get',
                    data: {content_type: contentType},
                    formatType: 'json',
                    beforeSend: function(){
                        dispatcher.dispatch({
                            actionType: 'homepage-change-is-loading-data',
                            bool: true
                        })
                    },
                    success: function(data){
                        let contentType = data.contentType
                        let lokerInfos = data.lokerInfos

                        dispatcher.dispatch({
                            actionType: 'homepage-initialization',
                            contentType: contentType,
                            lokerInfos: lokerInfos
                        })
                    }
                }).always(function(){
                    dispatcher.dispatch({
                        actionType: 'homepage-change-is-loading-data',
                        bool: false
                    })
                })
            }
        }else{
            window.location.href = "/" + contentType
        }
    },
    render: function(){
        var contentType = HomepageStore.getContentType()
        let arrMenu = [
            {title: 'Loker Jawa', value: 'loker_jawa', icon: 'fa fa-newspaper-o'},
            {title: 'Loker Batam', value: 'loker_batam', icon: 'fa fa-newspaper-o'},
            {title: 'Tips Kerja', value: 'tips_kerja', icon: 'fa fa-address-card-o'},
            {title: 'Ide Bisnis', value: 'ide_bisnis', icon: 'fa fa-briefcase'},
            {title: 'Tentang Kami', value: 'about_us', icon: 'fa fa-user'}
        ]
        let that = this
        let listMenu = function(item, key){
            let styleItemMenu = {}
            if(item.value == contentType){
                _.assign(styleItemMenu, {fontWeight: 'bold'})
            }

            return(
                <div className="menu" key={key}>
                    <i className={item.icon} />
                    <span style={styleItemMenu} onClick={that.onClickItemMenu.bind(that, item.value)}>{item.title}</span>
                </div>
            )
        }
        return(
            <div className="panel navbar">
                <div className="panel-heading title text-left">
                    Menu
                </div>
                <div className="panel-body">
                    {arrMenu.map(listMenu)}
                </div>
            </div>
        )
    }
});

var FilterMenu = React.createClass({
    render: function(){
        let btnFilterStyle = {marginTop: "10px"}

        return (
            <div className="panel filter">
                <div className="panel-heading title text-left">
                    Filter
                </div>
                <div className="panel-body">
                    <span>Nama Perusahaan</span>
                    <input className="form-control input-sm" />
                    <span>Posisi</span>
                    <input className="form-control input-sm" />
                    <span>Usia</span>
                    <input className="form-control input-sm" />
                    <span>Pendidikan</span>
                    <input className="form-control input-sm" />
                    <span>Pengalaman</span>
                    <input className="form-control input-sm" />
                    <button className="btn btn-md btn-success" style={btnFilterStyle}>Filter</button>
                </div>
            </div>
        )
    }
});

var PostingItem = React.createClass({
    propTypes:{
        item: React.PropTypes.object,
        itemSelected: React.PropTypes.object
    },
    onClickItemSelected: function(){
        let item = this.props.item
        dispatcher.dispatch({
            actionType: 'homepage-change-change-item',
            item: item
        })

        $("html").animate({scrollTop: 0}, '600');
    },
    expiredDateDisplay: function(){
        let item = this.props.item

        if(!_.isEmpty(item.expiredDate)){
            return item.expiredDate + " (expired date)"
        }else{
            return "-"
        }
    },
    render: function(){
        let item = this.props.item
        let position = item.position
        let company = item.company
        let expiredDate = item.expiredDate
        let city = item.city
        let province = item.province
        let itemSelected = this.props.itemSelected
        let itemClassName = ''
        let expiredDateDisplay = this.expiredDateDisplay()

        if(item.id == itemSelected.id){
            itemClassName = 'post-item-v2 active'
        }else{
            itemClassName = 'post-item-v2'
        }

        return(
            <div className={itemClassName} onClick={this.onClickItemSelected}>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="box-logo">
                            <img src={"logos/" + item.logo} alt="logo-post-list" />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="part-description">
                            <div className="pointer" />
                            <p><i className="fa fa-stethoscope" /> {position.name}</p>
                            <p><i className="fa fa-home" /> {company.name}</p>
                            <p><i className="fa fa-calendar" /> {expiredDateDisplay}</p>
                            <p><i className="fa fa-map-marker" /> {city.name} - {province.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var PostingLists = React.createClass({
    propTypes:{
        lokerList: React.PropTypes.array,
        itemSelected: React.PropTypes.object,
        infoSelected: React.PropTypes.object,
        isLoadingData: React.PropTypes.bool
    },
    render: function(){
        let lokerList = this.props.lokerList
        let itemSelected = this.props.itemSelected
        let isLoadingData = this.props.isLoadingData
        
        let postingItem = function(item, key){
            return(
                <PostingItem key={key} 
                    item={item}
                    itemSelected={itemSelected} />
            )
        }

        if(isLoadingData == true){
            return (
                <div className="posting-list">
                    <div className="loading-data">
                        <img src="/image/circle_64.gif" className="loading-image" />
                    </div>
                </div>
            )
        }else{
            return (
                <div className="posting-list">
                    {
                        lokerList.map(postingItem)
                    }
                </div>
            )
        }
    }
});

var PostView = React.createClass({
    propTypes:{
        infoSelected: React.PropTypes.object,
        isLoadingData: React.PropTypes.bool
    },
    render: function(){
        let info = this.props.infoSelected
        let isLoadingData = this.props.isLoadingData
        let company = info.company
        let postDate = info.created_at
        let expiredDate = info.expired_date 
        let sourceLink = info.source_link
        let requirements = info.requirements
        let logoUrl = "/logos/" + info.logo
        let fileStyle = {fontSize: "120px"}

        if (!_.isEmpty(info.logo)){
            var logoDisplay = <img src={logoUrl} />
        }

        let postItemView = function(item, key){
            return(
                <PostItemView key={key} requirement={item} />
            )
        }

        if(isLoadingData == true){
            return(
                <div className="post-view text-center">
                    <div className="loading-data">
                        <img src="/image/bar_small.gif" className="loading-image" />
                    </div>
                </div>
            )
        }else{
            if(_.isEmpty(info)){
                return(
                    <div className="post-view">
                        <div className="blank-post tex-center">
                            <i className="fa fa-file-o" style={fileStyle} />
                            <h3>Tidak ada file yang di pilih</h3>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="post-view">
                        <h1>{company.name}</h1>
                        <hr/>
                        <div className="row">
                            <div className="post-info col-md-7">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        Info Perusahaan
                                    </div>
                                    <div className="panel-body">
                                        <p className="label">Tanggal Posting:</p>
                                        <p className="value"><i className="fa fa-calendar" />{postDate}</p>
                                        <p className="label">Tanggal Expired:</p>
                                        <p className="value"><i className="fa fa-calendar-o" />{expiredDate}</p>
                                        <p className="label">Sumber:</p>
                                        <p className="value"><i className="fa fa-newspaper-o" /><a href={sourceLink}>{sourceLink}</a></p>
                                        <p className="label">Alamat:</p>
                                        <p className="value"><i className="fa fa-map-marker" />{info.company.address}</p>  
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 text-center">
                                <div className="logo-view">
                                    {logoDisplay}
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="content">
                            {requirements.map(postItemView)}
                        </div>
                    </div>
               )    
            }
        }
        
    }
})

var HomepageDesktopView = React.createClass({
    getInitialState: function(){
        return{
            lokerList: HomepageStore.getLokerList(),
            lokerInfos: HomepageStore.getLokerInfos(),
            itemSelected: HomepageStore.getItemSelected(),
            infoSelected: HomepageStore.getInfoSelected(),
            isLoadingData: HomepageStore.getIsLoadingData()
        }
    },
    componentDidMount: function(){
        this.listener = HomepageStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function(){
        this.listener.remove()
    },
    _onChange: function(){
        this.setState({
            lokerList: HomepageStore.getLokerList(),
            lokerInfos: HomepageStore.getLokerInfos(),
            itemSelected: HomepageStore.getItemSelected(),
            infoSelected: HomepageStore.getInfoSelected(),
            isLoadingData: HomepageStore.getIsLoadingData()
        })
    },
    render: function(){
        let lokerList = this.state.lokerList
        let lokerInfo = this.state.lokerInfo
        let itemSelected = this.state.itemSelected
        let infoSelected = this.state.infoSelected
        let isLoadingData = this.state.isLoadingData

        return (
            <div className="container-fluid homepage-desktop">
                <HeaderDesktop />
                <div className="strip"></div>
                <div className="content">
                    <PostingLists lokerList={lokerList}
                                 itemSelected={itemSelected} 
                                 isLoadingData={isLoadingData} />
                    <div className="row">
                        <div className="col-lg-5 col-md-7">    
                        </div>
                        <div className="col-lg-7 col-md-5">
                            <PostView infoSelected={infoSelected} 
                                isLoadingData={isLoadingData} />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    
                </div>
            </div>
        );
    }
});

var PostItemView = React.createClass({
    propTypes: {
        requirement: React.PropTypes.object.isRequired
    },
    ageDisplay: function(ageMin, ageMax){
        let _ageMin = Number(ageMin)
        let _ageMax = Number(ageMax)

        if (_ageMin != 0 && _ageMax != 0){
            return _ageMin + " - " + _ageMax + " Tahun"
        }else if(_ageMin == 0 && _ageMax != 0){
            return "Di Bawah " + _ageMax + " Tahun"
        }else if(_ageMin !=0 && _ageMax == 0){
            return "Di Atas " + _ageMin + " Tahun"
        }else{
            return "Tidak Ada Batasan Usia"
        }
    },
    salaryDisplay: function(salary){
        if(salary != 0){
            return "Rp. " + (salary * 1000).toFixed(2)
        }else{
            return "Di Rahasiakan"
        }
    },
    render: function(){
        let requirement = this.props.requirement
        let gender = requirement.gender
        let experience = requirement.experience
        let age_min = requirement.age_min
        let age_max = requirement.age_max
        let position = requirement.position
        let educationLevel = requirement.education_level
        let description = requirement.description
        let workDescriptions = requirement.work_descriptions
        let requireDescriptions = requirement.require_descriptions
        let salary = requirement.salary
        let ageDisplay = this.ageDisplay(age_min, age_max)
        let salaryDisplay = this.salaryDisplay(salary)

        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-stethoscope" />{position.name}
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <p className="label">Jenis Kelamin</p>
                                        <p className="value"><i className="fa fa-intersex" />{gender}</p>
                                        <p className="label">Usia</p>
                                        <p className="value"><i className="fa fa-heart" />{ageDisplay}</p>
                                        <p className="label">Pendidikan</p>
                                        <p className="value"><i className="fa fa-university" />{educationLevel.name}</p>
                                        <p className="label">Pengalaman</p>
                                        <p className="value"><i className="fa fa-briefcase" />{experience} Tahun</p>
                                        <p className="label">Gaji</p>
                                        <p className="value"><i className="fa fa-money" />{salaryDisplay}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        {requireDescriptions.map(function(item, key){
                                            return(<p className="value" key={key}><i className="fa fa-check-square" />{item.description}</p>)
                                        })}
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        {workDescriptions.map(function(item, key){
                                            return(
                                                <p  className="value" key={key}><i className="fa fa-check-circle" />{item.description}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

window.HomepageDesktopView = HomepageDesktopView
window.NavbarMenu = NavbarMenu
window.FilterMenu = FilterMenu