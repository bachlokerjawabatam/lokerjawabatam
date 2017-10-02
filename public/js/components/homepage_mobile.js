var Requirement = React.createClass({
	propTypes: {
		item: React.PropTypes.object
	},
	render: function(){
		let requirement = this.props.item
		let position = requirement.position
		let educationLevel = requirement.education_level
		let requireDescriptions = requirement.require_descriptions
		let workDescriptions = requirement.work_descriptions

		return(
			<div>
				<p className="position">{position.name}</p>
				<p className="salary">Rp. {(requirement.salary * 1000).toFixed(2)}</p>
				<p className="requirement"><u>Persyaratan Umum</u></p>	
				<ul className="requirement-list">
					<li>Usia: {requirement.age_min - requirement.age_max} Tahun</li>
					<li>JenisKelamin: {requirement.gender}</li>
					<li>Pendidikan: {educationLevel.name}</li>
					<li>Pengalaman: min {requirement.experience} Tahun</li>
				</ul>
				<p className="requirement"><u>Persyaratan Khusus</u></p>	
				<ul className="requirement-list">
					{
						requireDescriptions.map(function(item, key){
							return(
								<li ke={key}>{item.description}</li>
							)
						})
					}
				</ul>
				<p className="requirement"><u>Deskripsi Pekerjaan</u></p>	
				<ul className="requirement-list">
					{
						workDescriptions.map(function(item, key){
							return(
								<li key={key}>{item.description}</li>
							)
						})
					}
				</ul>
			</div>
		)
	},
})

var JobViewMobile = React.createClass({
	propTypes:{
        infoSelected: React.PropTypes.object,
        isLoadingData: React.PropTypes.bool
    },
	closeJobView: function(){
		dispatcher.dispatch({
			actionType: 'homepage-chage-show-job-view',
			show: false
		})

		$(".job-view-mobile").animate({
			marginLeft: '100%'
		})
	},
	render: function(){
		let closeStyle = {color: '#008c8c'}
		let info = this.props.infoSelected
        let isLoadingData = this.props.isLoadingData
        let company = info.company
        let postDate = info.created_at
        let expiredDate = info.expired_date
        let requirements = info.requirements
        let logoUrl = "/logos/" + info.logo

        if (!_.isEmpty(info.logo)){
        	var logoDisplay = <img src={logoUrl} className="logo-mobile-view" />
        }

        let infoRequirement = function(item, key){
        	return(
        		<Requirement key={key} item={item} />
        	)
        }

        if(_.isEmpty(info)){
            return(
                <div className="job-view-mobile fixed">
                    <div className="blank-post tex-center">
                        <i className="fa fa-file-o" />
                        <h3>Tidak ada file yang di pilih</h3>
                    </div>
                </div>
            )
        }else{        	
			return(
				<div className="job-view-mobile fixed">
					<i className="fa fa-times fa-5x pull-right" style={closeStyle} onClick={this.closeJobView}/>
					<div className="box-job-view text-left">
						<p className="company">{company.name}</p>
						{logoDisplay}
						<p className="email">{company.email}</p>
						<p className="address">{company.address}</p>
						
						<p className="basa-basi">
							Dibutuhkan Karyawan/ Karyawati untuk mengisi posisi di bawah ini dengan beberapa persyaratan 
							yang dijelaskan berikut :
						</p>
						{requirements.map(infoRequirement)}
					</div>
				</div>
			)
        }
	}
})

var JobListItem = React.createClass({
	propTypes:{
        item: React.PropTypes.object,
        itemSelected: React.PropTypes.object
    },
    onClickItemList: function(){ 
    	let item = this.props.item
        
        dispatcher.dispatch({
            actionType: 'homepage-change-change-item',
            item: item
        })

		$(".job-view-mobile").animate({
			marginLeft: '0px'
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

		return(
			<div className="item-list" onClick={this.onClickItemList}>
				<div className="company">{company.name}</div>
				<div className="position">{position.name}</div>
				<div className="location">{province.name} - {city.name}</div>
				<div className="location">Expired : {expiredDate}</div>
			</div>
		)
	}
})

var JobListMobile = React.createClass({
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

        let jobListItem = function(item, key){
            return(
                <JobListItem key={key} 
                    item={item}
                    itemSelected={itemSelected} />
            )
        }

        if(isLoadingData == true){
        	return (
        		<div className="job-list-mobile text-center">
					<div className="loading-data">
                        <img src="/image/circle_64.gif" className="loading-image" />
                    </div>
				</div>
        	)
        }else{	
			return(
				<div className="job-list-mobile text-left">
					{lokerList.map(jobListItem)}
				</div>
			)
        }
	}
});

var NavbarMobile = React.createClass({
	propTypes: {
		showJobView: React.PropTypes.bool
	},
	onClickMenu: function(strMenu){
		var that = this

		if(_.includes(['loker_jawa', 'loker_batam'], strMenu)){
			$.ajax({
                url: '/homepage/set_session_content_type',
                method: 'get',
                data: {content_type: strMenu},
                formatType: 'json',
                beforeSend: function(){
                    dispatcher.dispatch({
                        actionType: 'homepage-change-is-loading-data',
                        bool: true
                    })
                    dispatcher.dispatch({
						actionType: 'homepage-change-show-navbar',
						bool: false
					})
										
					$(".navbar-mobile").animate({
						marginLeft: '-100%'
					});

					if(that.props.showJobView){
						$(".job-view-mobile").animate({
							marginLeft: '100%'
						})	
					}
					
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
		}else{
			window.location = strMenu
		}
	},
	render: function(){
		let contentType = HomepageStore.getContentType()
		let btnFilterStyle = {margin: "5px 0px 0px 50px", width: "100px"}
		let lokerJawaStyle = contentType == 'loker_jawa' ? {fontWeight: "bold"} : null
		let lokerBatamStyle = contentType == 'loker_batam' ? {fontWeight: "bold"} : null

		return(
			<div className="navbar-mobile text-left">
				<div className="menu">
					<div className="item text-right" onClick={this.onClickMenu.bind(this, "loker_jawa")}>
						<i className="fa fa fa-newspaper-o fa-4x pull-left" />
						<span style={lokerJawaStyle}>Loker Jawa</span>
					</div>
					<div className="item text-right" onClick={this.onClickMenu.bind(this, "loker_batam")}>
						<i className="fa fa fa-newspaper-o fa-4x pull-left" />
						<span style={lokerBatamStyle}>Loker Batam</span>
					</div>
					<div className="item text-right" onClick={this.onClickMenu.bind(this, "/tips_kerja")}>
						<i className="fa fa-briefcase fa-4x pull-left" />
						Tips Kerja
					</div>
					<div className="item text-right" onClick={this.onClickMenu.bind(this, "/tips_kerja")}>
						<i className="fa fa-leaf fa-4x pull-left" />
						Ide Bisnis
					</div>
					<div className="item text-right" onClick={this.onClickMenu.bind(this, "/tentang_kami")}>
						<i className="fa fa-address-card fa-4x pull-left" />
						Tentang Kami
					</div>
				</div>
				<div className="search-filter">
					<div className="search">
						<input type="text" className="input-search" placeholder="cari disini" />
						<i className="fa fa-search fa-4x" />
					</div>
					<div className="filter-mobile">
						<input type="text" className="form-control input-lg" placeholder="Perusahaan" /> 
						<input type="text" className="form-control input-lg" placeholder="Posisi" />
						<input type="text" className="form-control input-lg" placeholder="Pendidikan" />
						<input type="number" className="form-control input-lg" placeholder="Usia" />
						<input type="number" className="form-control input-lg" placeholder="Gaji" />
						<button className="btn btn-lg btn-success" style={btnFilterStyle}>Filter</button>
					</div>
				</div>
			</div>
		)
	}
})

var HomepageMobile = React.createClass({
	getInitialState: function(){
		return{
			showNavbar: HomepageStore.getShowNavbar(),
			lokerList: HomepageStore.getLokerList(),
            lokerInfos: HomepageStore.getLokerInfos(),
            itemSelected: HomepageStore.getItemSelected(),
            infoSelected: HomepageStore.getInfoSelected(),
            isLoadingData: HomepageStore.getIsLoadingData(),
            showJobView: HomepageStore.getShowJobView()
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
            isLoadingData: HomepageStore.getIsLoadingData(),
            showNavbar: HomepageStore.getShowNavbar(),
            showJobView: HomepageStore.getShowJobView()
        })
    },
	toggleNavbar: function(){
		let showNavbar = this.state.showNavbar
		dispatcher.dispatch({
			actionType: 'homepage-change-show-navbar',
			bool: !showNavbar
		})
		let marginNavbar = !showNavbar? '0px' : '-100%' 
		
		$(".navbar-mobile").animate({
			marginLeft: marginNavbar
		});
		
	},
	render: function(){
		let lokerList = this.state.lokerList
        let lokerInfo = this.state.lokerInfo
        let itemSelected = this.state.itemSelected
        let infoSelected = this.state.infoSelected
        let isLoadingData = this.state.isLoadingData
		let showNavbar = this.state.showNavbar
		let iconClassName = showNavbar? 'fa fa-times pull-left' : 'fa fa-bars pull-left'
		let showJobView = this.state.showJobView

		return(
			<div className="container-fluid homepage-mobile text-center">
				<div className="header fixed">
					<i className={iconClassName} onClick={this.toggleNavbar} />
					Lokerjawabatam.com
				</div>
				<NavbarMobile showJobView={showJobView} />
				<JobViewMobile infoSelected={infoSelected} 
					isLoadingData={isLoadingData}/>
				<JobListMobile lokerList={lokerList} itemSelected={itemSelected} 
					isLoadingData={isLoadingData} />
			</div>
		)
	}
});

window.HomepageMobile = HomepageMobile