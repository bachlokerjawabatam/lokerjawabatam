var HeaderDesktop = React.createClass({
	render: function(){
		return(
			<div className="header-desktop">
				<div className="row">
					<div className="col-lg-6 col-md-6 pull-left logo-web">
						<img src='/image/logo-lokerjawabatam.png' />
					</div>
					<div className="col-lg-6 col-md-6 pull-right">
						<div className="row menu-about-us text-center">
							<div className="col-sm-6 col-md-2 col-md-offset-2 menu-item">
								Loker Jawa
							</div>
							<div className="col-sm-6 col-md-2 menu-item">
								Loker Batam
							</div>
							<div className="col-sm-6 col-md-2 menu-item">
								Blog
							</div>
							<div className="col-sm-6 col-md-2 menu-item">
								Ide Bisnis
							</div>
							<div className="col-sm-6 col-md-2 menu-item">
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