var NavbarMenu = React.createClass({
    onClickItemMenu: function(contentType){
        let currentContentType = HomepageStore.getContentType()
        if(currentContentType != contentType){
            $.ajax({
                url: '/homepage/set_session_content_type',
                method: 'get',
                data: {content_type: contentType},
                formatType: 'json',
                success: function(data){
                    let contentType = data.contentType
                    let lokerInfos = data.lokerInfos

                    dispatcher.dispatch({
                        actionType: 'homepage-initialization',
                        contentType: contentType,
                        lokerInfos: lokerInfos
                    })
                }
            })
        }
    },
    render: function(){
        var contentType = HomepageStore.getContentType()
        let arrMenu = [
            {title: 'Loker Jawa', value: 'loker_jawa', icon: 'fa fa-newspaper-o'},
            {title: 'Loker Batam', value: 'loker_batam', icon: 'fa fa-newspaper-o'},
            {title: 'Blog', value: 'blog', icon: 'fa fa-address-card-o'}
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

        if(item.id == itemSelected.id){
            itemClassName = 'post-item active'
        }else{
            itemClassName = 'post-item'
        }

        return(
            <div className={itemClassName} onClick={this.onClickItemSelected}>
                <p className="position">{position.name}</p>
                <p className="company-name">{company.name}</p>
                <p className="location">
                    <span className="pull-left"><strong>{expiredDate}</strong></span>
                    <span className="pull-right">{city.name} - {province.name}</span>
                </p>
            </div>
        )
    }
});

var PostingLists = React.createClass({
    propTypes:{
        lokerList: React.PropTypes.array,
        itemSelected: React.PropTypes.object,
        infoSelected: React.PropTypes.object
    },
    render: function(){
        let lokerList = this.props.lokerList
        let itemSelected = this.props.itemSelected
        
        let postingItem = function(item, key){
            return(
                <PostingItem key={key} 
                    item={item}
                    itemSelected={itemSelected} />
            )
        }
        return (
            <div className="posting-list">
                {
                    lokerList.map(postingItem)
                }
            </div>
        )
    }
});

var PostView = React.createClass({
    propTypes:{
        infoSelected: React.PropTypes.object
    },
    render: function(){
        let info = this.props.infoSelected
        let company = info.company
        let postDate = info.created_at
        let expiredDate = info.expired_date
        let requirements = info.requirements
        
        let postItemView = function(item, key){
            return(
                <PostItemView key={key} requirement={item} />
            )
        }

        if(_.isEmpty(info)){
            return(
                <div className="post-view">
                    <div className="blank-post tex-center">
                        <i className="fa fa-file-o" />
                        <h3>Tidak ada file yang di pilih</h3>
                    </div>
                </div>
            )
        }else{
            return(
            <div className="post-view">
                <h1 className="text-center">{company.name}</h1>
                <hr/>
                <p className="date"><label>Post Date:</label>  {postDate}</p>
                <p className="date"><label>Expired Date:</label>  {expiredDate}</p>
                <br/>
                <div className="content">
                    <p>Kami perusahaan {company.name} sedang membutuhkan tenaga kerja dengan kriteria sebagai berikut:</p>
                    {requirements.map(postItemView)}
                </div>
            </div>
        )    
        }
        
    }
})

var HomepageDesktopView = React.createClass({
    getInitialState: function(){
        return{
            lokerList: HomepageStore.getLokerList(),
            lokerInfos: HomepageStore.getLokerInfos(),
            itemSelected: HomepageStore.getItemSelected(),
            infoSelected: HomepageStore.getInfoSelected()
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
            infoSelected: HomepageStore.getInfoSelected()
        })
    },
    render: function(){
        let lokerList = this.state.lokerList
        let lokerInfo = this.state.lokerInfo
        let itemSelected = this.state.itemSelected
        let infoSelected = this.state.infoSelected
        
        return (
            <div className="container-fluid homepage-desktop">
                <div className="header">
                    <div className="title">Lokerjawabatam.com</div>
                    <div className="sub-title">
                        informasi lowongan kerja terkini daerah jawa dan batam
                    </div>
                </div>
                <div className="strip"></div>
                <div className="content">
                    <div className="row">
                        <div className="col-lg-2 col-md-6">
                            <NavbarMenu />
                            <FilterMenu />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <PostingLists lokerList={lokerList}
                                 itemSelected={itemSelected} />
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <PostView infoSelected={infoSelected} />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    contact person
                </div>
            </div>
        );
    }
});

var PostItemView = React.createClass({
    propTypes: {
        requirement: React.PropTypes.object.isRequired
    },
    render: function(){
        let requirement = this.props.requirement
        let age_min = requirement.age_min
        let age_max = requirement.age_max
        let position = requirement.position
        let educationLevel = requirement.education_level
        let description = requirement.description
        let workDescriptions = requirement.work_descriptions

        return(
            <div>
                <h4><u>{position.name}</u></h4>
                <div className="row">
                    <div className="col-md-4">
                        <ul>
                            <li>Jenis Kelamin: Pria/Wanita</li>
                            <li>Usia: {age_min} - {age_max} Tahun</li>
                            <li>Pendidikan: {educationLevel.name}</li>
                            <li>Berpengalaman: 1 Tahun</li>
                        </ul>
                    </div>
                    <div className="col-md-8">
                        <u>Description:</u>
                        <p>{description}</p>
                        <br/>
                        <u>Pekerjaan:</u>
                        <ul>
                            {workDescriptions.map(function(item, key){
                                return(<li key={key}>{item.description}</li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

window.HomepageDesktopView = HomepageDesktopView
window.NavbarMenu = NavbarMenu
window.FilterMenu = FilterMenu