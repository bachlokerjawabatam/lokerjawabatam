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
	onClickMenu: function(menuUrl, event){
		event.preventDefault()
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
					<a href="/pasang_iklan" className="btn btn-lg btn-success">Mau Pasang Iklan?</a>
					<div className="welcome-menu pull-right">
						<div className="row text-center">
							<div className="col-sm-2 col-sm-offset-2">
								<a href="/loker_jawa" onClick={this.onClickMenu.bind(this, 'loker_jawa')}>
									<i className="fa fa-address-card"/><br />
									<span>Loker Jawa</span>
								</a>
							</div>
							<div className="col-sm-2">
								<a href="/loker_batam"  onClick={this.onClickMenu.bind(this, 'loker_batam')}>
									<i className="fa fa-address-card-o" /><br />
									<span>Loker Batam</span>
								</a>
							</div>
							<div className="col-sm-2">
								<a href="/tips_kerja">
									<i className="fa fa-briefcase" /><br />
									<span>Tips Kerja</span>
								</a>
							</div>
							<div className="col-sm-2">
								<a href="/ide_bisnis">
									<i className="fa fa-lightbulb-o" /><br />
									<span>Ide Bisnis</span>
								</a>
							</div>
							<div className="col-sm-2">
								<a href="/tentang_kami">
									<i className="fa fa-users" /><br />
									<span>Tentang Kami</span>
								</a>
							</div>
						</div>
					</div>
					<i className="pull-right fa fa-search" />
				</div>
				<div className="body-image">
					<img className="image-animate" src="/image/building.jpg" />
				</div>
				<div className="service-description text-center">
					<h1>Layanan Kami</h1>
					<div className="row">
						<div className="col-md-6 item-service">
							<h3>Loker Jawa</h3>
							<div className="pull-left icon">
								<i className="fa fa-address-card" />
							</div>
							<div className="pull-left description">
								<p>
									Kami Menyediakan Informasi lowongan kerja sesuai dengan kebutuhan anda
									di daerah Jawa dan sekitarnya. 
								</p>
							</div>
						</div>
						<div className="col-md-6 item-service">
							<h3>Loker Batam</h3>
							<div className="pull-left icon">
								<i className="fa fa-address-card-o" />
							</div>
							<div className="pull-left description">
								<p>
									Kami Menyediakan Informasi lowongan kerja sesuai dengan kebutuhan anda
									di daerah Batam dan sekitarnya.
								</p>
							</div>
						</div>
						<div className="col-md-6 item-service">
							<h3>Tips Kerja</h3>
							<div className="pull-left icon">
								<i className="fa fa-briefcase" />
							</div>
							<div className="pull-left description">
								<p>
									Kami Menyediakan Informasi Tips Kerja untuk membantu anda dalam mencari kerja
									maupun meningkatkan produktifitas anda.
								</p>
							</div>
						</div>
						<div className="col-md-6 item-service">
							<h3>Ide Bisnis</h3>
							<div className="pull-left icon">
								<i className="fa fa-lightbulb-o" />
							</div>
							<div className="pull-left description">
								<p>
									Kami Menyediakan Informasi Ide Bisnis untuk anda yang ingin beralih 
									menjadi pengusaha maupun ingin memiliki usaha sampingan. 
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="summary-loker">
					<h1>Info Loker Terkini</h1>
					<div className="row">
						<div className="col-md-4">
							<div className="item-loker">
								<div className="panel panel-default">
									<div className="panel-heading">
										PT KEMET ELECTRONIC INDONESIA
									</div>
									<div className="panel-body">
										<p>Software Engineer</p>
										<p>Batam - Kepulauan Riau</p>
									</div>
								</div>	
							</div>	
						</div>
						<div className="col-md-4">
							<div className="item-loker">
								<div className="panel panel-default">
									<div className="panel-heading">
										PT KEMET ELECTRONIC INDONESIA
									</div>
									<div className="panel-body">
										<p>Software Engineer</p>
										<p>Batam - Kepulauan Riau</p>
									</div>
								</div>	
							</div>	
						</div>
						<div className="col-md-4">
							<div className="item-loker">
								<div className="panel panel-default">
									<div className="panel-heading">
										PT KEMET ELECTRONIC INDONESIA
									</div>
									<div className="panel-body">
										<p>Software Engineer</p>
										<p>Batam - Kepulauan Riau</p>
									</div>
								</div>	
							</div>	
						</div>
					</div>
				</div>
				<div className="summary-blog">
					<h1>Blog Tips Kerja & Ide Bisnis</h1>
					<div className="row">
						<div className="col-md-4 text-center">
							<div className="item-blog">
								<div className="body">
									<img src="/images/1511098404.jpg" />
								</div>
								<div className="footer">
									<p className="category">Tips Kerja</p>
									<p>Tips Menjadi Pekerja Yang sukses</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="item-blog">
								<div className="body">
									<img src="/images/1511098404.jpg" />
								</div>
								<div className="footer">
									<p className="category">Tips Kerja</p>
									<p>Tips Menjadi Pekerja Yang sukses</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="item-blog">
								<div className="body">
									<img src="/images/1509031839.jpg" />
								</div>
								<div className="footer">
									<p className="category">Tips Kerja</p>
									<p>Tips Menjadi Pekerja Yang sukses</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="item-blog">
								<div className="body">
									<img src="/images/1511098404.jpg" />
								</div>
								<div className="footer">
									<p className="category">Tips Kerja</p>
									<p>Tips Menjadi Pekerja Yang sukses</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="item-blog">
								<div className="body">
									<img src="/images/1510839794.jpg" />
								</div>
								<div className="footer">
									<p className="category">Tips Kerja</p>
									<p>Tips Menjadi Pekerja Yang sukses</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="item-blog">
								<div className="body">
									<img src="/images/1509722106.jpg" />
								</div>
								<div className="footer">
									<p className="category">Tips Kerja</p>
									<p>Tips Menjadi Pekerja Yang sukses</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="welcome-footer">
					<div className="row">
						<div className="col-md-3">
							<h3>Layanan Kami</h3>
							<ul>
								<li><a href="/loker_jawa">Loker Jawa</a></li>
								<li><a href="/loker_batam">Loker Batam</a></li>
								<li><a href="/tips_kerja">Tips Kerja</a></li>
								<li><a href="/ide_bisnis">Ide Bisnis</a></li>
							</ul>
						</div>
						<div className="col-md-3">
							<h3>Tentang Kami</h3>
							<ul>
								<li>
									<a href="javascript:void(0)">
										<i className="fa fa-phone" />085762635185
									</a>
								</li>
								<li>
									<a href="javascript:void(0)">
										<i className="fa fa-google-mail" />lokerjawabatam@gmail.com
									</a>
								</li>
								<li>
									<a href="javascript:void(0)">
										<i className="fa fa-map-marker" />
										Desa Jatirejo Kelurahan Sempu, Kecamatan Andong, Kabupaten Boyolali
									</a>
								</li>
							</ul>
						</div>
						<div className="col-md-6 text-right">
							<img className="logo-footer" src="/image/logo.png" />
							<br />
							<div className="medsos-link">
								<OverlayTrigger placement="bottom" overlay={flexibleTooltip("facebook.lokerjawabatam")}>
									<i className="fa fa-facebook" onClick={this.onClickLink.bind(this, "https://www.facebook.com/lokerjawabatam")} />
								</OverlayTrigger>
								<OverlayTrigger placement="bottom" overlay={flexibleTooltip("instagram.lokerjawabatam")}>
									<i className="fa fa-instagram" onClick={this.onClickLink.bind(this, "https://www.instagram.com/lokerjawabatam")}/>
								</OverlayTrigger>
								<OverlayTrigger placement="bottom" overlay={flexibleTooltip("085736763079")}>
									<i className="fa fa-whatsapp" />
								</OverlayTrigger>
								<OverlayTrigger placement="bottom" overlay={flexibleTooltip("085736763079")}>
									<i className="fa fa-phone" />
								</OverlayTrigger>
								<OverlayTrigger placement="bottom" overlay={flexibleTooltip("lokerjawabatam@gmail.com")}>
									<i className="fa fa-google" />
								</OverlayTrigger>
							</div>
							<span>Copyright 2017</span>
						</div>
					</div>
				</div>	
			</div>
		)
	}
})

var animateImage = React.createClass({
	render: function(){
		return(
			<div className="body-image">
				<img className="image-animate" src={images[arrNumber].image} />
				<div className="title-animate">
					<h1>{images[arrNumber].title}</h1>
				</div>
			</div>
		)
	}
})


window.WelcomeDesktop = WelcomeDesktop