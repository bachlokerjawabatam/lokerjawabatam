var OverlayTrigger = ReactBootstrap.OverlayTrigger
var Tooltip = ReactBootstrap.Tooltip

var flexibleTooltip = function(texTooltip){
	return(
		<Tooltip>{texTooltip}</Tooltip>
	)
}

var WelcomeDesktop = React.createClass({
	getInitialState: function(){
		return{
			images: [
				{image: "/image/welcome1.jpg", title: 'MAKING YOUR OWN SUCCESS'},
				{image: "/image/welcome2.jpg", title: 'GREAT ONE FOR INSPIRING ANYONE'},
				{image: "/image/welcome3.jpg", title: 'GOOD WORK RAISE A GOOD LIFE'}
			],
			count: 0
		}
	},
	componentDidMount: function(){
		this.imageAnimate = setInterval(this.changeImage, 10000)
	},
	componentWillUnmount: function(){
		clearInterval(this.imageAnimate)
	},
	changeImage: function(){
		let count = this.state.count + 1
		var that = this
		$(".title-animate").animate({
			marginTop: "-120px",
			opacity: 0
		})
		$(".image-animate").fadeOut(1000);
		setTimeout(function(){that.setState({count: count})}, 1000)
		$(".image-animate").fadeIn(1000, function(){
			$(".title-animate").animate({
				marginTop: "0px",
				opacity: 1
			})
		});
	},
	onClickLink: function(textLink){
		window.open(textLink, '_blank')
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
	render: function(){
		let arrNumber = this.state.count % 3 
		let images = this.state.images

		return(
			<div className="container-fluid welcome-desktop">
				<div className="header">
					<img className="pull-left" src="/image/logo-lokerjawabatam.png" onClick={this.onClickMenu.bind(this, '/')} />
					<div className="welcome-menu pull-right">
						<div className="row text-center">
							<div className="col-sm-2 col-sm-offset-2">
								<i className="fa fa-address-card" onClick={this.onClickMenu.bind(this, 'loker_jawa')}/><br />
								<span onClick={this.onClickMenu.bind(this, 'loker_jawa')}>Loker Jawa</span>
							</div>
							<div className="col-sm-2">
								<i className="fa fa-address-card-o" onClick={this.onClickMenu.bind(this, 'loker_batam')} /><br />
								<span onClick={this.onClickMenu.bind(this, 'loker_batam')}>Loker Batam</span>
							</div>
							<div className="col-sm-2">
								<i className="fa fa-briefcase" onClick={this.onClickMenu.bind(this, '/tips_kerja')} /><br />
								<span onClick={this.onClickMenu.bind(this, '/tips_kerja')}>Tips Kerja</span>
							</div>
							<div className="col-sm-2">
								<i className="fa fa-lightbulb-o" onClick={this.onClickMenu.bind(this, '/ide_bisnis')}/><br />
								<span onClick={this.onClickMenu.bind(this, '/ide_bisnis')}>Ide Bisnis</span>
							</div>
							<div className="col-sm-2">
								<i className="fa fa-users" onClick={this.onClickMenu.bind(this, '/tentang_kami')}/><br />
								<span onClick={this.onClickMenu.bind(this, '/tentang_kami')}>Tentang Kami</span>
							</div>
						</div>
					</div>
				</div>
				<div className="medsos pull-right">
					<div className="row">
						<div className="col-sm-2 col-sm-offset-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("facebook.lokerjawabatam")}>
								<i className="fa fa-facebook" onClick={this.onClickLink.bind(this, "http://facebook.lokerjawabatam")} />
							</OverlayTrigger>
						</div>
						<div className="col-sm-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("instagram.lokerjawabatam")}>
								<i className="fa fa-instagram" onClick={this.onClickLink.bind(this, "http://instagram.lokerjawabatam")}/>
							</OverlayTrigger>
						</div>
						<div className="col-sm-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("085762635185")}>
								<i className="fa fa-whatsapp" />
							</OverlayTrigger>
						</div>
						<div className="col-sm-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("085762635185")}>
								<i className="fa fa-phone" />
							</OverlayTrigger>
						</div>
						<div className="col-sm-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("lokerjawabatam@gmail.com")}>
								<i className="fa fa-google" />
							</OverlayTrigger>
						</div>	
					</div>
				</div>
				<div className="body-image">
					<img className="image-animate" src={images[arrNumber].image} />
					<div className="title-animate">
						<h1>{images[arrNumber].title}</h1>
					</div>
				</div>
			</div>
		)
	}
})

var WelcomeMobile = React.createClass({
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
		let aboutUsStyle = {marginBottom: "40px"}

		return(
			<div className="welcome-mobile">
				<HeaderMobile />
				<div className="greet-wall">
					<span>Lokerjawabatam.com</span>
					<p>Informasi Lowongan Kerja Terkini Daerah Jawa Dan Batam</p>
				</div>
				<div className="metro-menu">
					<div className="row">
						<div className="col-xs-6">
							<div className="box-menu" onClick={this.onClickMenu.bind(this, 'loker_jawa')}>
								<i className="fa fa-address-card" />
								<br />
								<span>Loker Jawa</span>
							</div>
						</div>
						<div className="col-xs-6">
							<div className="box-menu" onClick={this.onClickMenu.bind(this, 'loker_batam')} >
								<i className="fa fa-address-card-o" />
								<br />
								<span>Loker Batam</span>
							</div>
						</div>
						<div className="col-xs-6">
							<div className="box-menu" onClick={this.onClickMenu.bind(this, '/tips_kerja')}>
								<i className="fa fa-briefcase" />
								<br />
								<span>Tips Kerja</span>
							</div>
						</div>
						<div className="col-xs-6">
							<div className="box-menu" onClick={this.onClickMenu.bind(this, '/ide_bisnis')}>
								<i className="fa fa-lightbulb-o" />
								<br />
								<span>Ide Bisnis</span>
							</div>
						</div>
						<div className="col-xs-6">
							<div style={aboutUsStyle} className="box-menu" onClick={this.onClickMenu.bind(this, '/tentang_kami')}>
								<i className="fa fa-users" />
								<br />
								<span>Tentang Kami</span>
							</div>
						</div>
					</div>
				</div>
				<div className="social-link text-center">
					<div className="row">
						<div className="col-xs-2 col-xs-offset-1">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("facebook.lokerjawabatam")}>
								<i className="fa fa-facebook" onClick={this.onClickLink.bind(this, "http://facebook.lokerjawabatam")} />
							</OverlayTrigger>
						</div>
						<div className="col-xs-2">
							<OverlayTrigger placement="bottom" overlay={flexibleTooltip("instagram.lokerjawabatam")}>
								<i className="fa fa-instagram" onClick={this.onClickLink.bind(this, "http://instagram.lokerjawabatam")}/>
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

window.WelcomeDesktop = WelcomeDesktop
window.WelcomeMobile = WelcomeMobile