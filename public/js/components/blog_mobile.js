var BlogItemMobile = React.createClass({
	propTypes: {
		item: React.PropTypes.object,
		completeContent: React.PropTypes.bool
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
		let blogPicture = "/images/" + item.picture_url
		let itemContent = item.content
		let contentStyle = {marginTop: "50px"}
		let completeContent = this.props.completeContent

		if (completeContent){
			contentStyle.display = "block"
			var buttonDisplay =
				<button className="btn btn-md btn-warning" onClick={this.onClickBack}>
					<i className="fa fa-arrow-left fa-1x" /> Kembali Ke daftar Posting
				</button>
		}else{
			contentStyle.display = "none"
			var buttonDisplay = 
				<button className="btn btn-lg btn-success" onClick={this.onClickSelectedBlog}>
					Baca selengkapnya  <i className="fa fa-arrow-right fa-1x" />
				</button>
		}

		return(
			<div className="blog-item-content">
				<div className="blog-item-body">
					<div className="blog-image-mobile">
						<img src={blogPicture} />
					</div>
					<br />
					<span className="title">{item.title}</span>
					<div style={contentStyle} dangerouslySetInnerHTML={{__html:itemContent}} />
					{buttonDisplay}
				</div>
			</div>
		)
	}
})

var BlogContentMobile = React.createClass({
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

		let item = function(item, key){
			return(
				<BlogItemMobile item={item} key={key} />
			)
		}

		let blankDivStyle = {width: "100%", height: "400px"}

		if (showBlogDetail){
			return(
				<div className='blog-content-mobile'>
					<BlogItemMobile item={selectedBlog} key='selected-blog-1' completeContent={true} />
					<div style={blankDivStyle} />
				</div>
			)
		}else{
			return(
				<div className="blog-content-mobile">
					{blogList.map(item)}
					<div style={blankDivStyle} />
				</div>
			)
		}

	}
})

var BlogMobile = React.createClass({
	render: function(){
		return(
			<div className="blog-mobile">
				<HeaderMobile useBarMenu={true} page="blog" />
				<BlogContentMobile />
				<InstagramMenu />
			</div>
		)
	}
})

window.BlogMobile = BlogMobile