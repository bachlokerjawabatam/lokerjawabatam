var menuItems = [
	{icon: "fa fa-home", title: "Loker Jawa", url: "loker_jawa"},
	{icon: "fa fa-home", title: "Loker Batam", url: "loker_batam"},
	{icon: "fa fa-briefcase", title: "Tips Kerja", url: "/tips_kerja"},
	{icon: "fa fa-leaf", title: "Ide Bisnis", url: "/tips_kerja"},
	{icon: "fa fa-address-card", title: "Tentang Kami", url: "/tentang_kami"}
]

var InstagramMenu = React.createClass({
	onClickMenuItem: function(url){
		if(_.includes(['loker_jawa', 'loker_batam'], url)){
			$.ajax({
                url: '/homepage/set_session_content_type',
                method: 'get',
                data: {content_type: url},
                formatType: 'json',
                success: function(data){
                    window.location.href = '/'
                }
            })
		}else{
			window.location = url
		}

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