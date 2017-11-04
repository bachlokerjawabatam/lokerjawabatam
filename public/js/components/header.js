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
				</div>
				<HeaderMobileMenu showMenu={showMenu} page={page} onClickToggleMenu={this.onClickToggleMenu} />
			</div>
		)	
	}
})

var HeaderMobileMenu = React.createClass({
	propTypes:
	{
		showMenu: React.PropTypes.bool,
		page: React.PropTypes.string,
		onClickToggleMenu: React.PropTypes.func
	},
	onClickToggleMenu: function(){
		this.props.onClickToggleMenu()
	},
	render: function(){
		let showMenu = this.props.showMenu
		let page = this.props.page
		
		if(page == 'blog'){
			var contentMenu = <BlogSideMenu onClickToggleMenu={this.onClickToggleMenu} />
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
	propTypes: {
		onClickToggleMenu: React.PropTypes.func
	},
	getInitialState: function(){
		return{
			populerItems: BlogStore.getPopulerItems(),
			latestItems: BlogStore.getLatestItems()
		}
	},
	componentDidMount: function(){
		this.listener = BlogStore.addChangeListener(this._onChange())
	},
	componentWillUnmount: function(){
		this.listener.remove()
	},
	_onChange: function(){
		this.setState({
			populerItems: BlogStore.getPopulerItems(),
			latestItems: BlogStore.getLatestItems()
		})
	},
	render: function(){
		let populeraItems = this.state.populerItems
		let latestItems = this.state.latestItems
		var that = this
		let item = function(item){
			return(
				<BlogSideMenuItem item={item} onClickToggleMenu={that.props.onClickToggleMenu} />
			)
		}

		return(
			<div className="blog-side-menu">
				<p className="title-side-menu">Artikel Populer</p>
				<ul className="side-menu-item">
					{populerItems.map(item)}
				</ul>
				<br />
				<p className="title-side-menu">Artikel Terbaru</p>
				<ul className="side-menu-item">
					{latestItems.map(item)}
				</ul>
			</div>
		)
	}
})

var BlogSideMenuItem = React.createClass({
	propTypes:{
		item: React.PropTypes.object,
		onClickToggleMenu: React.PropTypes.func
	},
	onClickToggleMenu: function(){
		this.props.onClickToggleMenu()
	},
	onClickMenuItem: function(){
		let item = this.props.item

		dispatcher.dispatch({
			actionType: 'blog-change-selected-blog',
			selectedBlog: this.props.item
		})

		dispatcher.dispatch({
			actionType: 'blog-change-show-blog-detail',
			showBlogDetail: true
		})

		$.ajax({
            url: '/tips_kerja/update_blog_visits',
            method: 'get',
            data: {blog_id: item.id},
            formatType: 'json',
            success: function(data){
                console.log("success update blog visits")
            }
        })

        this.onClickToggleMenu()
	},
	render: function(){
		let item = this.props.item
		let titleDisplay = item.title.length > 30 ? item.title.substr(0, 30) + "..." : item.title

		return(
			<li onClick={this.onClickMenuItem}>
				<i className="fa fa-arrow-circle-right" />
				{titleDisplay}
			</li>
		)
	}
})

window.BlogSideMenu = BlogSideMenu
window.HeaderMobile = HeaderMobile
window.HeaderDesktop = HeaderDesktop