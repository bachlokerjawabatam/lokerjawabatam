var HeaderDesktop = React.createClass({
	onClickMenu: function(menuUrl){
		if(_.includes(['loker_jawa', 'loker_batam'], menuUrl)){
			$.ajax({
                url: '/homepage/set_session_content_type',
                method: 'get',
                data: {content_type: menuUrl},
                formatType: 'json',
                success: function(data){
                    window.location.href = '/lowongan_kerja'
                }
            })
		}else{
			window.location.href = menuUrl
		}
	},
	render: function(){
		return(
			<div className="header-desktop">
				<div className="row">
					<div className="col-lg-6 col-md-6 pull-left logo-web">
						<img src='/image/logo-lokerjawabatam.png' onClick={this.onClickMenu.bind(this, '/')} />
					</div>
					<div className="col-lg-6 col-md-6 pull-right">
						<div className="row menu-about-us text-center">
							<div className="col-sm-6 col-md-2 col-md-offset-2 menu-item" 
								onClick={this.onClickMenu.bind(this, "loker_jawa")} >
								Loker Jawa
							</div>
							<div className="col-sm-6 col-md-2 menu-item" 
								onClick={this.onClickMenu.bind(this, "loker_batam")}>
								Loker Batam
							</div>
							<div className="col-sm-6 col-md-2 menu-item"
								onClick={this.onClickMenu.bind(this, "/tips_kerja")}>
								Tips Kerja
							</div>
							<div className="col-sm-6 col-md-2 menu-item"
								onClick={this.onClickMenu.bind(this, "/ide_bisnis")}>
								Ide Bisnis
							</div>
							<div className="col-sm-6 col-md-2 menu-item"
								onClick={this.onClickMenu.bind(this, "/tentang_kami")}>
								Tentang Kami
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

var HeaderMobile = React.createClass({
	propTypes: {
		page: React.PropTypes.string,
		userBarMenu: React.PropTypes.bool
	},
	getInitialState: function(){
		return{
			showMenu: false
		}
	},
	onClickToggleMenu: function(){
		this.setState({
			showMenu: !this.state.showMenu
		})
	},
	render: function(){
		let showMenu = this.state.showMenu
		let page = this.props.page
		let useBarMenu = this.props.useBarMenu
		let barStyle = null
		let classBar = showMenu ? "fa fa-times pull-left" : "fa fa-bars pull-left"
		
		if(useBarMenu){
			barStyle = {fontSize: "60px", marginLeft: "20px"}
		}else{
			barStyle = {display: "none"}
		}

		return(
			<div>
				<div className="header-mobile text-center">
					<i style={barStyle} className={classBar} onClick={this.onClickToggleMenu} />
					<img src='/image/logo-lokerjawabatam.png' />
					<p>Informasi Lowongan kerja terkini daerah jawa dan batam</p>
				</div>
				<HeaderMobileMenu showMenu={showMenu} page={page} />
			</div>
		)	
	}
})

var HeaderMobileMenu = React.createClass({
	propTypes:
	{
		showMenu: React.PropTypes.bool,
		page: React.PropTypes.string
	},
	render: function(){
		let showMenu = this.props.showMenu
		let page = this.props.page
		
		if(page == 'blog'){
			var contentMenu = <BlogSideMenu />
		}

		if(!showMenu){
			return(
				<div></div>
			)
		}else{
			return(
				<div className="menu-header-mobile">
					{contentMenu}			
				</div>
			)
		}
	}
})

var BlogSideMenu = React.createClass({
	render: function(){
		return(
			<div className="blog-side-menu">
				<p className="title-side-menu">Kategori</p>
				<ul className="side-menu-item">
					<li>
						<i className="fa fa-arrow-circle-right" />
						Tips dan Serba Serbi
						<span className="badge">10</span>
					</li>
				</ul>
			</div>
		)
	}
})

window.BlogSideMenu = BlogSideMenu
window.HeaderMobile = HeaderMobile
window.HeaderDesktop = HeaderDesktop