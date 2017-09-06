var JobViewMobile = React.createClass({
	closeJobView: function(){
		$(".job-view-mobile").animate({
			marginLeft: '100%'
		})
	},
	render: function(){
		let closeStyle = {color: '#008c8c'}

		return(
			<div className="job-view-mobile fixed">
				<i className="fa fa-times fa-5x pull-right" style={closeStyle} onClick={this.closeJobView}/>
				<div className="box-job-view text-left">
					<p className="company">PT MAJU MUNDUR</p>
					<p className="email">hrd@ptmajumundur.com</p>
					<p className="address">JL Jenderal Suprapto BLok QG10 37</p>
					
					<p className="basa-basi">
						Dibutuhkan Karyawan/ Karyawati untuk mengisi posisi di bawah ini dengan beberapa persyaratan 
						yang dijelaskan berikut :
					</p>

					<p className="position">Software Engineer</p>
					<p className="salary">Rp. 7.500.000,00</p>
					<p className="requirement"><u>Persyaratan Umum</u></p>	
					<ul className="requirement-list">
						<li>Usia: 27 Tahun</li>
						<li>JenisKelamin: Pria/Wanita</li>
						<li>Pendidikan: S1/D3/SMK</li>
						<li>Pengalaman: min 1 Tahun</li>
					</ul>
					<p className="requirement"><u>Persyaratan Khusus</u></p>	
					<ul className="requirement-list">
						<li>bisa Berbahasa Inggris minimal pasif</li>
						<li>Mengetahui bahasa pemrograman web</li>
						<li>Mengetahui Analisa Database</li>
					</ul>
					<p className="requirement"><u>Deskripsi Pekerjaan</u></p>	
					<ul className="requirement-list">
						<li>membuat dan mengembangkan program aplikasi</li>
						<li>menjaga asset IT</li>
						<li>menganalisa database</li>
						<li>dan lain lain</li>
					</ul>
				</div>
			</div>
		)
	}
})

var JobListMobile = React.createClass({
	onClickItemList: function(){ 
		$(".job-view-mobile").animate({
			marginLeft: '0px'
		})
	},
	render: function(){
		return(
			<div className="job-list-mobile text-left">
				<div className="item-list" onClick={this.onClickItemList}>
					<div className="company">PT MAJU MUNDUR</div>
					<div className="position">Software Engineer</div>
					<div className="location">DKI - Jakarta Utara</div>
					<div className="location">Expired : 31 Agustus 2017</div>
				</div>
			</div>
		)
	}
});


var NavbarMobile = React.createClass({
	onClickMenu: function(url){
		window.location = url
	},
	render: function(){
		return(
			<div className="navbar-mobile text-left">
				<div className="menu">
					<div className="item text-right">
						<i className="fa fa-briefcase fa-4x pull-left" />
						Loker Jawa
					</div>
					<div className="item text-right">
						<i className="fa fa-leaf fa-4x pull-left" />
						Loker Batam
					</div>
					<div className="item text-right" onClick={this.onClickMenu.bind(this, "/blog")}>
						<i className="fa fa-user fa-4x pull-left" />
						Blog Loker
					</div>
					<div className="item text-right" onClick={this.onClickMenu.bind(this, "/about_us")}>
						<i className="fa fa-user fa-4x pull-left" />
						Tentang Kami
					</div>
				</div>
				<div className="search-filter">
					<div className="search">
						<input type="text" className="input-search" placeholder="cari disini" />
						<i className="fa fa-user fa-4x" />
					</div>
					<div className="filter-mobile">
						<input type="text" className="form-control input-lg" placeholder="Perusahaan" /> 
						<input type="text" className="form-control input-lg" placeholder="Posisi" />
						<input type="text" className="form-control input-lg" placeholder="Pendidikan" />
						<input type="number" className="form-control input-lg" placeholder="Usia" />
						<input type="number" className="form-control input-lg" placeholder="Gaji" />
					</div>
				</div>
			</div>
		)
	}
})

var HomepageMobile = React.createClass({
	getInitialState: function(){
		return{
			showNavbar: false
		}
	},
	toggleNavbar: function(){
		let showNavbar = this.state.showNavbar
		this.setState({showNavbar: !showNavbar})
		let marginNavbar = !showNavbar? '0px' : '-100%' 
		
		$(".navbar-mobile").animate({
			marginLeft: marginNavbar
		});
		
	},
	render: function(){
		let showNavbar = this.state.showNavbar
		let iconClassName = showNavbar? 'fa fa-times pull-left' : 'fa fa-bars pull-left'
		return(
			<div className="container-fluid homepage-mobile text-center">
				<div className="header fixed">
					<i className={iconClassName} onClick={this.toggleNavbar} />
					Lokerjawabatam.com
				</div>
				<NavbarMobile />
				<JobViewMobile />
				<JobListMobile />
			</div>
		)
	}
});

window.HomepageMobile = HomepageMobile