var HeaderDesktop = React.createClass({
	render: function(){
		return(
			<div className="header-desktop">
				<div className="row">
					<div className="col-lg-4 col-md-6 pull-left logo-web">
						<img src='/image/logo-lokerjawabatam.png' />
					</div>
					<div className="col-lg-5 col-md-6 pull-right">
						<div className="row menu-about-us text-center">
							<div className="col-sm-6 col-md-3 menu-item">
								Loker Jawa
							</div>
							<div className="col-sm-6 col-md-3 menu-item">
								Loker Batam
							</div>
							<div className="col-sm-6 col-md-3 menu-item">
								Blog
							</div>
							<div className="col-sm-6 col-md-3 menu-item">
								Ide Bisnis
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

var HeaderMobile = React.createClass({
	render: function(){
		return(
			<div className="header-mobile text-center">
				<img src='/image/logo-lokerjawabatam.png' />
				<p>Informasi Lowongan kerja terkini daerah jawa dan batam</p>
			</div>
		)	
	}
})


window.HeaderMobile = HeaderMobile
window.HeaderDesktop = HeaderDesktop