const {Editor, EditorState, convertFromRaw} = Draft;

var BlogLabelMobile = React.createClass({
	propTypes: {
		iconClass: React.PropTypes.string,
		label: React.PropTypes.string,
		position: React.PropTypes.string,
		link: React.PropTypes.string,
		tooltip: React.PropTypes.string
	},
	getDefaultProps: function(){
		return{
			position: "left",
			link: null
		}
	},
	render: function(){
		var label = this.props.label
		let iconClass = this.props.iconClass
		var position = this.props.position
		var link = this.props.link
		var labelTooltip = this.props.tooltip
		
		if (position == 'left'){
			var boxLabelClass = 'blog-label-mobile pull-left'
		}else if(position == 'right'){
			var boxLabelClass = 'blog-label-mobile pull-right'
		}

		if (link){
			var labelTag = <a href={link}>{label}</a>
		}else{
			var labelTag = <span>{label}</span>
		}

		return(
			<div className={boxLabelClass}>
				<i className={iconClass} />
				{labelTag}
			</div>
		)
	}
})

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

		$("html").animate({scrollTop: 0}, '600');

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

		$("html").animate({scrollTop: 0}, '600');
	},
	render: function(){
		let item = this.props.item
		let blogPicture = "/images/" + item.picture_url
		let itemContent = item.content
		let contentStyle = {marginTop: "50px"}
		let completeContent = this.props.completeContent

		if (itemContent.substr(0,1) == '{'){
			let content = JSON.parse(itemContent)
			let contentRaw = EditorState.createWithContent(convertFromRaw(content))

			if (completeContent){
				var contentDisplay = <Editor editorState={contentRaw} readOnly />
			}else{
				var contentDisplay = null
			}
		}else{
			var contentDisplay = <div  style={contentStyle} dangerouslySetInnerHTML={{__html:itemContent}} />
		}

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

		if (item.category.name == 'Tips Kerja'){
			var categoryLinkName = 'https://www.lokerjawabatam.com/tips_kerja'
		}else if(item.category.name == 'Ide Bisnis'){
			var categoryLinkName = 'https://www.lokerjawabatam.com/ide_bisnis'
		}

		return(
			<div className="blog-item-content">
				<div className="blog-item-body">
					<div className="blog-image-mobile">
						<img src={blogPicture} />
					</div>
					<br />
					<span className="title">{item.title}</span>
					<br />
					<div>
						<BlogLabelMobile key="label" iconClass="fa fa-tag" label={item.category.name}
							 link={categoryLinkName} tooltip='label' />
						<BlogLabelMobile key="viewers" iconClass="fa fa-eye" label={item.visits + " x dilihat"}
							tooltip='viewers' />
						<BlogLabelMobile key="post-date" iconClass="fa fa-calendar-o" label={item.created_at}
							position="right" tooltip='tanggal posting' />
					</div>
					<div className="editor-read-only">
						{contentDisplay}
					</div>
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