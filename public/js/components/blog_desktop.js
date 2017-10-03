var categories = [
	{title: "Tips", icon: "fa fa-user"},
	{title: "Intermezzo", icon: "fa fa-briefcase"},
	{title: "lain lain", icon: "fa fa-leaf"}
]

var BlogListItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired
	},
	render: function(){
		let item = this.props.item
		let imageUrl = "/images/" + item.picture_url

		return(
			<div className="blog-list-item">
				<div className="blog-image">
					<img src={imageUrl} />
				</div>
				<h3>{item.title}</h3>
				<hr />
				<p>{item.content}</p>
				<button className="btn btn-md btn-warning pull-right">Selengkapnya</button>
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
			blogList: BlogStore.getBlogList()
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
			blogList: BlogStore.getBlogList()
		})
	},
	render: function(){
		let blogList = this.state.blogList

		let blogListItem = function(item, key){
			return(
				<BlogListItem key={key} item={item} />
			)
		}
		return(
			<div className="blog-list">
				{blogList.map(blogListItem)}
			</div>
		)
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