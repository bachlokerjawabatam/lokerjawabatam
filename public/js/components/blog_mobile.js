var BlogMobileView = React.createClass({
	render: function(){
		return(
			<div className="blog-mobile-view">
				<div className="title">
					Cara Mencari Kerja Yang Baik Dan benar
				</div>
				<div className="blog-image">
				</div>
				<div className="content">
					<p>Pada Awjk anskdnk kajsdk aosda jaoskdoasd kkasd alnya kamisd anskdaksdk asnd</p>
					<p>Post Date: 01 September 2017</p>
				</div>
			</div>
		)
	}
});

var BlogListMobile = React.createClass({
	onClickMenu: function(url){
		window.location = url
	},
	render: function(){
		let iconStyle = {marginRight: '30px', fontSize: '40px'}
		return (
			<div className="blog-list">
				<div className="menu">
					<div className="menu-item" onClick={this.onClickMenu.bind(this, "/")}>
						<i style={iconStyle} className="fa fa-leaf" />
						Info Loker
					</div>
				</div>
				<div className="item">
					<u>Cara mencari kerja dengan baik dan benar</u>
				</div>
			</div>
		)
	}
});

var BlogMobile = React.createClass({
	getInitialState: function(){
		return{
			showBlogList: false
		}
	},
	toggleBlogList: function(){
		let showBlogList = this.state.showBlogList
		this.setState({showBlogList: !showBlogList})
		let marginNavbar = !showBlogList? '0px' : '-100%' 
		
		$(".blog-list").animate({
			marginLeft: marginNavbar
		});
		
	},
	render: function(){
		let showBlogList = this.state.showBlogList
		let showBlogListClassName = showBlogList == true ? "fa fa-times pull-left" : " fa fa-bars pull-left"
		return (
			<div className="blog-mobile">
				<div className="header text-center fixed">
					<i className={showBlogListClassName} onClick={this.toggleBlogList} />
					Lokerjawabatam.com
				</div>
				<BlogListMobile />
				<BlogMobileView />
			</div>
		)
	}
})

window.BlogMobile = BlogMobile