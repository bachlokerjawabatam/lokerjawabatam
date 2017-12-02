var OverlayTrigger = ReactBootstrap.OverlayTrigger
var Tooltip = ReactBootstrap.Tooltip
const {Editor, EditorState, convertFromRaw} = Draft;

var formatDate = function(dateString){
	let arrMonth = [
		'Januari', 
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'December'
	]

	let postDate = new Date(dateString)
	let date = postDate.getDate()
	let month = postDate.getMonth()
	let year = postDate.getFullYear()

	return date + ", " + arrMonth[month] + " " + year 
}

var flexibleTooltip = function(texTooltip){
	return(
		<Tooltip>{texTooltip}</Tooltip>
	)
}

var BlogLabel = React.createClass({
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
			var boxLabelClass = 'blog-label pull-left'
		}else if(position == 'right'){
			var boxLabelClass = 'blog-label pull-right'
		}

		if (link){
			var labelTag = <a href={link}>{label}</a>
		}else{
			var labelTag = <span>{label}</span>
		}

		return(
			<OverlayTrigger placement="bottom" overlay={flexibleTooltip(labelTooltip)}>
				<div className={boxLabelClass}>
					<i className={iconClass} />
					{labelTag}
				</div>
			</OverlayTrigger>
		)
	}
})

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
		let imageUrl = "/images/" + item.picture_url
		var itemContent = item.content
		var completeContent = this.props.completeContent

		let contentStyle = !completeContent ? {display: 'none'} : {display: 'block'} 
		
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

		if (item.category.name == 'Tips Kerja'){
			var categoryLinkName = 'https://www.lokerjawabatam.com/tips_kerja'
		}else if(item.category.name == 'Ide Bisnis'){
			var categoryLinkName = 'https://www.lokerjawabatam.com/ide_bisnis'
		}

		let postDate = formatDate(item.created_at)
		let curDate = formatDate(new Date)

		if (postDate == curDate){
			var newLabelComponent = 
				<div className="new-label-indicator pull-right">
					<img src="/image/blog_new_label.png" />
				</div> 
		}

		return(
			<div className="blog-list-item">
				<div className="blog-image">
					<img src={imageUrl} />
					{newLabelComponent}
				</div>
				<h1>{item.title}</h1>
				<div className="box-label">
					<BlogLabel key="label" iconClass="fa fa-tag" label={item.category.name}
						 link={categoryLinkName} tooltip='label' />
					<BlogLabel key="viewers" iconClass="fa fa-eye" label={item.visits + " x dilihat"}
						tooltip='viewers' />
					<BlogLabel key="post-date" iconClass="fa fa-calendar-o" label={postDate}
						position="right" tooltip='tanggal posting' />
				</div>
				<br />
				<br />
				{contentDisplay}
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
				<h3 className="category">Artikel Populer</h3>
				<ul className="blog-category-item text-right">
					{populerItems.map(item)}
				</ul>
				<h3 className="category">Artikel Terbaru</h3>
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