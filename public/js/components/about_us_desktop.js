var ContactLink = React.createClass({
	render: function(){
		return(
			<div className="contact-link">
				<div className="row text-center">
					<div className="col-sm-2">
						<i className="fa fa-facebook" />
					</div>
					<div className="col-sm-2">
						<i className="fa fa-instagram" />
					</div>
					<div className="col-sm-2">
						<i className="fa fa-whatsapp" />
					</div>
					<div className="col-sm-2">
						<i className="fa fa-phone" />
					</div>
					<div className="col-sm-2">
						<i className="fa fa-google" />
					</div>
				</div>
			</div>
		)
	}
})

var ContactUs = React.createClass({
	render: function(){
		return(
			<div className="contact-us">
				<div className="row">
					<div className="col-sm-4 text-right owner">
						<img src="/image/owner-1.jpg" />
					</div>
					<div className="col-sm-8 text-right owner-name">
						<h1>Bachtiar Eko Wahyudi</h1>
						<p>Application Development Manager</p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-4 text-right owner">
						<img src="/image/owner-1.jpg" />
					</div>
					<div className="col-sm-8 text-right owner-name">
						<h1>Prihambodo Trio Agustian</h1>
						<p>Company Manager</p>
					</div>
				</div>
			</div>
		)
	}
})

var AboutUsContent = React.createClass({
	render: function(){
		return(
			<div className="about-us-content">
				<div className="row">
					<div className="col-sm-5">
						<ContactUs />
						<ContactLink />
					</div>
					<div className="col-sm-7">
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
				</div>
			</div>
		)
	}
})

var Wall = React.createClass({
	render: function(){
		return(
			<div className="wall-about-us">
				<div className="cover">
					<div className="motto pull-left">
						<h1>LOKER JAWA BATAM</h1>
						<h3>A PART OF SUCCESS</h3>
						<h5>apa yang anda ketahui tentang kami?</h5>
					</div>
				</div>
			</div>
		)
	}
})

var AboutUsDesktop = React.createClass({
	render: function(){
		return (
			<div className="about-us container-fluid">
				<HeaderDesktop />
				<Wall />
				<AboutUsContent />
			</div>
		)
	}
})

window.AboutUsDesktop = AboutUsDesktop 