var BlogMobile = React.createClass({
	render: function(){
		return(
			<div className="blog-mobile">
				<HeaderMobile />
				<InstagramMenu />
			</div>
		)
	}
})

window.BlogMobile = BlogMobile