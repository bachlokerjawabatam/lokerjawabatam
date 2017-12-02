var OverlayTrigger = ReactBootstrap.OverlayTrigger
var Tooltip = ReactBootstrap.Tooltip

var flexibleTooltip = function(texTooltip){
	return(
		<Tooltip>{texTooltip}</Tooltip>
	)
}

var WelcomeMobile = React.createClass({
	getInitialState: function(){
		return{
			menuItems: [
				{ title: 'Loker Jawa', value: 'loker_jawa', url: '', className: 'fa fa-address-card' },
				{ title: 'Loker Batam', value: 'loker_batam', url: '', className: 'fa fa-address-card-o' },
				{ title: 'Tips Kerja', value: 'tips_kerja', url: '', className: 'fa fa-briefcase' },
				{ title: 'Ide Bisnis', value: 'ide_bisnis', url: '', className: 'fa fa-lightbulb-o' },
				{ title: 'Tentang Kami', value: 'tentang_kami', url: '', className: 'fa fa-users' },
			]
		}
	},
	onClickMenu: function(menuUrl){
		if(_.includes(['loker_jawa', 'loker_batam'], menuUrl)){
			$.ajax({
                url: '/homepage/set_session_content_type',
                method: 'get',
                data: {content_type: menuUrl},
                formatType: 'json',
                success: function(data){
                    window.location.href = '/lowongan_kerja'
                }
            })
		}else{
			window.location.href = menuUrl
		}
	},
	onClickLink: function(textLink){
		window.open(textLink, '_blank')
	},
	render: function(){
		let menuItems = this.state.menuItems
		var that = this
		var menuItem = function(item, key){
			return(
				<div key={key} className="col-xs-12">
					<div className="circle-icon pull-right" onClick={that.onClickMenu.bind(that, item.value)}>
						<i className={item.className} />
					</div>
					<div className="menu-item pull-right" onClick={that.onClickMenu.bind(that, item.value)}>
						{item.title}
					</div>
				</div>
			)
		}

		return(
			<div className="welcome-mobile">
				<HeaderMobile />
				<div className="content-mobile">
					<div className="row">
						{menuItems.map(menuItem)}
					</div>
				</div>
				<div className="social-link text-center">
					<div className="row">
						<div className="col-xs-2 col-xs-offset-1">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("facebook.lokerjawabatam")}>
								<i className="fa fa-facebook" onClick={this.onClickLink.bind(this, "https://www.facebook.com/lokerjawabatam")} />
							</OverlayTrigger>
						</div>
						<div className="col-xs-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("instagram.lokerjawabatam")}>
								<i className="fa fa-instagram" onClick={this.onClickLink.bind(this, "https://www.instagram.com/lokerjawabatam")}/>
							</OverlayTrigger>
						</div>
						<div className="col-xs-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("085762635185")}>
								<i className="fa fa-whatsapp" />
							</OverlayTrigger>
						</div>
						<div className="col-xs-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("085762635185")}>
								<i className="fa fa-phone" />
							</OverlayTrigger>
						</div>
						<div className="col-xs-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("lokerjawabatam@gmail.com")}>
								<i className="fa fa-google" />
							</OverlayTrigger>
						</div>	
					</div>
				</div>
			</div>
		)
	}
})

window.WelcomeMobile = WelcomeMobile