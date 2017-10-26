var menuItems = [
	{icon: "fa fa-address-card", title: "Loker Jawa", url: "loker_jawa"},
	{icon: "fa fa-address-card-o", title: "Loker Batam", url: "loker_batam"},
	{icon: "fa fa-briefcase", title: "Tips Kerja", url: "/tips_kerja"},
	{icon: "fa fa-lightbulb-o", title: "Ide Bisnis", url: "/ide_bisnis"},
	{icon: "fa fa-users", title: "Tentang Kami", url: "/tentang_kami"}
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
                    window.location.href = '/lowongan_kerja'
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