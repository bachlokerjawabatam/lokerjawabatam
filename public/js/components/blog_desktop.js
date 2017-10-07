var categories = [
	{title: "Tips", icon: "fa fa-user"},
	{title: "Intermezzo", icon: "fa fa-briefcase"},
	{title: "lain lain", icon: "fa fa-leaf"}
]

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
		
		let contentStyle = !completeContent ? {textOverflow: 'ellipsis', height: '50px'} : null   

		if (completeContent){
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
				<div  style={contentStyle} dangerouslySetInnerHTML={{__html:itemContent}} />
				{buttonDisplay}
				<br />
				<hr />
			</div>
		)
	}
})

var BlogCategories = React.createClass({
	render: function(){
		let categoryItem = function(item, key){
			return(
				<li key={key}>{item.title} <i className={item.icon} /></li>
			)
		}

		return(
			<div className="blog-categories text-center">
				<h3>Artikel Populer</h3>
				<ul className="blog-category-item text-right">
					{categories.map(categoryItem)}
				</ul>
			</div>
		)
	}
})

var BlogList = React.createClass({
	getInitialState: function(){
		return{
			blogList: BlogStore.getBlogList(),
			showBlogDetail: BlogStore.getShowBlogDetail()
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
				<BlogListItem key={key} item={item} completeContent={true} />
			)
		}

		if (showBlogDetail){
			return(
				<div className='blog-list'>
					<BlogListItem key="selected-blog-1" item={selectedBlog} />		
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
	render: function(){
		return (
			<div className="blog-mobile">
				<HeaderDesktop />
				<div className="row">
					<div className="col-lg-9 col-md-7">
						<BlogList />
					</div>
					<div className="col-lg-3 col-md-5">
						<BlogCategories />
					</div>
				</div>
			</div>
		)
	}
})

window.BlogDesktop = BlogDesktop