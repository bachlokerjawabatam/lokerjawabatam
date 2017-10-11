var blogItems = [
	{title: "TIPS MENCARI KERJA DENGAN BAIK & BENAR"}
]

var BlogItemMobile = React.createClass({
	propTypes: {
		item: React.PropTypes.object
	},
	render: function(){
		let item = this.props.item

		return(
			<div className="blog-item-content">
				<div className="blog-item-header">
					<p>{item.title}</p>
				</div>
				<div className="blog-item-body">
					<div className="blog-image-mobile">
						<img src="/image/landing_page.jpg" />
					</div>
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
					<div className="blog-item-more text-center">
						<h4>Selengkapnya..</h4>
						<i className="fa fa-chevron-down" />
					</div>
				</div>
			</div>
		)
	}
})

var BlogContentMobile = React.createClass({
	render: function(){
		let item = function(item, key){
			return(
				<BlogItemMobile item={item} key={key} />
			)
		}

		return(
			<div className="blog-content-mobile">
				{blogItems.map(item)}
			</div>
		)
	}
})

var BlogMobile = React.createClass({
	render: function(){
		return(
			<div className="blog-mobile">
				<HeaderMobile useBarMenu={true} page="blog" />
				<BlogContentMobile />
				<InstagramMenu />
			</div>
		)
	}
})

window.BlogMobile = BlogMobile