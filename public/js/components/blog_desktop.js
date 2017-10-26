var OverlayTrigger = ReactBootstrap.OverlayTrigger
var Tooltip = ReactBootstrap.Tooltip

var flexibleTooltip = function(texTooltip){
	return(
		<Tooltip>{texTooltip}</Tooltip>
	)
}

var BlogListItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		completeContent: React.PropTypes.bool
	},
	getDefaultProps: function(){
		return{
			completeContent: false
		}
	},
	onClickSelectedBlog: function(){
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
	},
	onClickBack: function(){
		dispatcher.dispatch({
			actionType: 'blog-change-show-blog-detail',
			showBlogDetail: false
		})
	},
	render: function(){
		let item = this.props.item
		let imageUrl = "/images/" + item.picture_url
		let itemContent = item.content
		let completeContent = this.props.completeContent

		let contentStyle = !completeContent ? {display: 'none'} : {display: 'block'}   

		if (!completeContent){
			var buttonDisplay = 
				<button className="btn btn-md btn-success pull-right" onClick={this.onClickSelectedBlog}>
					Baca selengkapnya  <i className="fa fa-arrow-right fa-1x" />
				</button>
		}else{
			var buttonDisplay =
				<button className="btn btn-md btn-warning pull-right" onClick={this.onClickBack}>
					<i className="fa fa-arrow-left fa-1x" /> Kembali Ke daftar Posting
				</button>
		}

		return(
			<div className="blog-list-item">
				<div className="blog-image">
					<img src={imageUrl} />
				</div>
				<h1>{item.title}</h1>
				<br />
				<div  style={contentStyle} dangerouslySetInnerHTML={{__html:itemContent}} />
				{buttonDisplay}
				<br />
				<hr />
			</div>
		)
	}
})

var BlogSideBar = React.createClass({
	propTypes: {
		latestItems: React.PropTypes.array,
		populerItems: React.PropTypes.array
	},
	render: function(){
		let latestItems = this.props.latestItems
		let populerItems = this.props.populerItems
		
		let item = function(item, key){
			return(
				<ItemSideBar key={key} item={item} /> 
			)
		}

		return(
			<div className="blog-categories text-right">
				<h3>Artikel Populer</h3>
				<ul className="blog-category-item text-right">
					{populerItems.map(item)}
				</ul>
				<h3>Artikel Terbaru</h3>
				<ul className="blog-category-item text-right">
					{latestItems.map(item)}
				</ul>
			</div>
		)
	}
})

var ItemSideBar = React.createClass({
	onClickSelectedBlog: function(){
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
	},
	render: function(){
		let item = this.props.item
		let titleDisplay = item.title.length > 30 ? item.title.substr(0, 30) + "..." : item.title

		return(
			<OverlayTrigger placement="bottom" overlay={flexibleTooltip(item.title)}>
				<li onClick={this.onClickSelectedBlog} >
					{titleDisplay} <i className="fa fa-check" />
				</li>
			</OverlayTrigger>
		)
	}
})

var BlogList = React.createClass({
	getInitialState: function(){
		return{
			blogList: BlogStore.getBlogList(),
			showBlogDetail: BlogStore.getShowBlogDetail(),
			selectedBlog: BlogStore.getSelectedBlog()
		}
	},
	componentDidMount: function(){
		this.listener = BlogStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function(){
		this.listener.remove()
	},
	_onChange: function(){
		this.setState({
			blogList: BlogStore.getBlogList(),
			showBlogDetail: BlogStore.getShowBlogDetail(),
			selectedBlog: BlogStore.getSelectedBlog()
		})
	},
	render: function(){
		let blogList = this.state.blogList
		let showBlogDetail = this.state.showBlogDetail
		let selectedBlog = this.state.selectedBlog

		let blogListItem = function(item, key){
			return(
				<BlogListItem key={key} item={item} />
			)
		}

		if (showBlogDetail){
			return(
				<div className='blog-list'>
					<BlogListItem key="selected-blog-1" item={selectedBlog} completeContent={true}  />		
				</div>
			)
		}else{
			return(
				<div className="blog-list">
					{blogList.map(blogListItem)}
				</div>
			)
		}

	}
})


var BlogDesktop = React.createClass({
	getInitialState: function(){
		return{
			populerItems: BlogStore.getPopulerItems(),
			latestItems: BlogStore.getLatestItems()
		}
	},
	componentDidMount: function(){
		this.listener = BlogStore.addChangeListener(this._onChange)
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
		let latestItems = this.state.latestItems
		let populerItems = this.state.populerItems

		return (
			<div className="blog-mobile">
				<HeaderDesktop />
				<div className="row">
					<div className="col-lg-9 col-md-7">
						<BlogList />
					</div>
					<div className="col-lg-3 col-md-5">
						<BlogSideBar 
							populerItems={populerItems}
							latestItems={latestItems} />
					</div>
				</div>
			</div>
		)
	}
})

window.BlogDesktop = BlogDesktop