//tinggal benerin css style dan jquery untuk handle animasi ketika tombol menu bar di 
//klik menu navbar muncul dari arah kiri ke kanan menggeser halaman utama
//daftarka header dan navbar sebagai komponen global sehingga bisa di gunakan di semua halaman
var owners = [
	{name: 'Bachtiar Eko Wahyudi', position: 'Application Developer Manager'},
	{name: 'Prihambodo Trio Agustian', position: 'Company Manager'}
]

var menuItems = [
	{icon: "fa fa-home", title: "Loker Jawa", url: "/content_type='loker_jawa'"},
	{icon: "fa fa-briefcase", title: "Loker Batam", url: "/content_type='loker_batam'"},
	{icon: "fa fa-user", title: "Blog", url: "/blog"},
	{icon: "fa fa-camera", title: "Ide Bisnis", url: "/ide_bisnis"},
	{icon: "fa fa-file", title: "Tentang Kami", url: "/about_us"}
]

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

var WallAboutUsMobile = React.createClass({
	render: function(){
		return(
			<div className="row wall-about-us-mobile">
				<div className="col-xs-8">
				</div>
				<div className="col-xs-4">
					<h1>LOKER JAWA BATAM</h1>
					<h3>A PART OF SUCCESS</h3>
					<h5>apa yang anda ketahui tentang kami?</h5>
				</div>
			</div>
		)
	}
}) 

var AboutUsContent = React.createClass({
	render: function(){
		return(
			<div className="about-us-content-mobile text-center">
				<h1>TENTANG KAMI</h1>
				<h3>Lowongan Pekerjaan</h3>
				<p>
					Kami sebagai mitra anda yang menjadi yang terdepan dan tercepat sebagai penyedia
					informasi Lowongan Pekerjaan untuk daerah Jawa dan Batam. Kami ingin berkontribusi
					besar untuk kemajuan karir kerja mitra kami. Kecepatan Penyebarluasan informasi menjadi
					keunggulan kami, yang kami harapberdampak besar pada karir kerja mitra kami. Kami sebagai
					media perantara "job search" berkualitas yang memudahkan mitra kami untuk pencarian karir 
					yang sesuai.
				</p>
				<h3>Tips Kerja</h3>
				<p>
					Kami berinisiatif untuk menambah pengetahuan anda terkait dunia kerja berharap dapat
					meingkatkan kemampuan para pencari kerja agar lebih kompetitif. Dengan berbagai tips kami,
					kami berharap agar para Pencari kerja dapat menggali atau mengoptimalkan potensi mereka.
					Manfaat yang anda dapat dari artikel kami, merupakan nilai tersendiri bagi kami.
				</p>
				<h3>Ide Bisnis</h3>
				<p>
					Kami berharap untuk menggali potensi potensi bisnis yang sesuai dengan kemajuan dan teknologi
					masa kini. Kami berusaha mendorong para pekerja untuk mengembangkan enterpreneurship. Kami mendorong
					pekerja usia produktif mengembagkan bisnis kreatif.
				</p>
			</div>
		)
	}
})

var AboutUsOwner = React.createClass({
	render: function(){
		let owner = function(item, key){
			return(
				<div className="owner-item text-center">
					<h2>{item.name}</h2>
					<h4>{item.position}</h4>
				</div>
			)
		}

		return(
			<div className="about-us-owner-mobile">
				{owners.map(owner)}
			</div>
		)
	}
})

var AboutUsFooter = React.createClass({
	render: function(){
		return(
			<div className="about-us-footer-mobile text-center">
				<div className="logo-footer-mobile">
					<img src="/image/logo-lokerjawabatam.png" />
				</div>
				<div className="footer-link">
					<i className="fa fa-facebook" />
					<i className="fa fa-instagram" />
					<i className="fa fa-whatsapp" />
					<i className="fa fa-google" />
					<i className="fa fa-phone" />
				</div>
			</div>
		)
	}
})

var ElegantMobileNavbar = React.createClass({
	onClickMenuItem: function(url){
		window.location = url
	},
	render: function(){
		let menuItem = function(item, key){
			return(
				<div className="menu-item" onClick={this.onClickMenuItem.bind(this, item.url)}>
					<div className="col-xs-4">
						<i className={item.icon} />
					</div>
					<div className="col-xs-8">
						{item.title}
					</div>
				</div>
			)
		}
		return(
			<div className="elegant-mobile-menu-navbar">
				{menuItems.map(function(){menuItem})}
			</div>
		)
	}
})

var InstagramMenu = React.createClass({
	onClickMenuItem: function(url){
		window.location = url
	},
	render: function(){
		let that = this
		let instagramMenu = function(item, key){
			return(
				<i className={item.icon} onClick={that.onClickMenuItem.bind(this, item.url)} />
			)
		}

		return(
			<div className="instagram-menu text-center">
				{menuItems.map(instagramMenu)}
			</div>
		)
	}
})

var AboutUsMobile = React.createClass({
	render: function(){
		return (
			<div>
				<HeaderMobile />
				<WallAboutUsMobile />
				<AboutUsContent />
				<AboutUsOwner />
				<AboutUsFooter />
				<InstagramMenu />
			</div>
		)
	}
})

window.AboutUsMobile = AboutUsMobile 