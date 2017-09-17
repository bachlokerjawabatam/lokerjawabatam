var menuItems = [
	{icon: "fa fa-home", title: "Loker Jawa", url: "/content_type='loker_jawa'"},
	{icon: "fa fa-briefcase", title: "Loker Batam", url: "/content_type='loker_batam'"},
	{icon: "fa fa-user", title: "Blog", url: "/blog"},
	{icon: "fa fa-camera", title: "Ide Bisnis", url: "/ide_bisnis"},
	{icon: "fa fa-file", title: "Tentang Kami", url: "/about_us"}
]

var InstagramMenu = React.createClass({
	onClickMenuItem: function(url){
		window.location = url
	},
	render: function(){
		let that = this
		let instagramMenu = function(item, key){
			return(
				<i key={key} className={item.icon} onClick={that.onClickMenuItem.bind(that, item.url)} />
			)
		}

		return(
			<div className="instagram-menu text-center">
				{menuItems.map(instagramMenu)}
			</div>
		)
	}
})

window.InstagramMenu = InstagramMenu