var blogLists = [
	{title: "Tips Mencari Kerja Dengan Baik Dan Benar"}
] 

var BlogListItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired
	},
	render: function(){
		let item = this.props.item
		return(
			<div className="col-md-6 blog-list-item">
				<h3>{item.title}</h3>
				<button className="btn btn-md btn-success">Read More</button>
			</div>
		)
	}
})

var BlogView = React.createClass({
	render: function(){
		return(
			<div className="blog-view">
				blog view
			</div>
		)
	}
})

var BlogList = React.createClass({
	render: function(){
		let blogListItem = function(item, key){
			return(
				<BlogListItem key={key} item={item} />
			)
		}
		return(
			<div className="blog-list">
				{blogLists.map(blogListItem)}
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
					<div className="col-lg-4 col-md-4">
						<BlogList />
					</div>
					<div className="col-lg-4 col-md-4">
						<BlogView />
					</div>
				</div>
			</div>
		)
	}
})

window.BlogDesktop = BlogDesktop