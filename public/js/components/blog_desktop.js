var categories = [
	{title: "Tips", icon: "fa fa-user"},
	{title: "Intermezzo", icon: "fa fa-briefcase"},
	{title: "lain lain", icon: "fa fa-leaf"}
]

var blogLists = [
	{title: "Tips Mencari Kerja Dengan Baik Dan Benar"},
	{title: "asdfsdfsd"}
] 

var BlogListItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired
	},
	render: function(){
		let item = this.props.item
		return(
			<div className="blog-list-item">
				<div className="blog-image">
					<img src="/image/landing_page.jpg" />
				</div>
				<h3>TIPS MENCARI KERJA DENGAN BAIK & BENAR</h3>
				<hr />
				<p>
					“Setelah 2 tahun membangun bisnis online, dari profit 500 ribu per bulan, hingga
					menjadi Rp 5 juta per bulan, kini berhasil melipatgandakan penghasilan menjadi 20
					juta per bulan... hanya dengan menerapkan prinsip-prinsip sederhana internet
					marketing. Dan itu masih berlanjut... Saya kira, saya sudah cukup layak untuk
					memberikan sebagian ilmunya di sini. Selamat membaca.”
				</p>
				<p>
					Saya tanya kepada anda... apa tujuan anda membuat blog?
					Jawaban anda pasti beragam. Tapi, saya yakin pada satu hal. Bagi anda yang
					punya produk internet, tujuan blog anda pasti untuk menarik pengunjung dan
					menjaring lebih banyak pelanggan. Betul?
				</p>
				<button className="btn btn-md btn-warning pull-right">Selengkapnya</button>
			</div>
		)
	}
})

var BlogCategories = React.createClass({
	render: function(){
		let categoryItem = function(item, key){
			return(
				<li key={key}>{item.title} <i className={item.icon} /></li>
			)
		}

		return(
			<div className="blog-categories text-center">
				<h3>Artikel Populer</h3>
				<ul className="blog-category-item text-right">
					{categories.map(categoryItem)}
				</ul>
			</div>
		)
	}
})

var BlogList = React.createClass({
	render: function(){
		let blogListItem = function(item, key){
			return(
				<BlogListItem key={key} item={item} />
			)
		}
		return(
			<div className="blog-list">
				{blogLists.map(blogListItem)}
			</div>
		)
	}
})


var BlogDesktop = React.createClass({
	render: function(){
		return (
			<div className="blog-mobile">
				<HeaderDesktop />
				<div className="row">
					<div className="col-lg-9 col-md-7">
						<BlogList />
					</div>
					<div className="col-lg-3 col-md-5">
						<BlogCategories />
					</div>
				</div>
			</div>
		)
	}
})

window.BlogDesktop = BlogDesktop