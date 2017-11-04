var Modal = ReactBootstrap.Modal

var PromptModalConfirmation = React.createClass({
	propTypes:{
		show: React.PropTypes.bool,
		label: React.PropTypes.string,
		onClickYes: React.PropTypes.func,
		onClickNo: React.PropTypes.func
	},
	getDefaultProps: function(){
		return{
			show: false,
			label: "Apakah Anda Yakin Untuk Melanjutkan ?"
		}
	},
	getInitialState: function(){
		return{
			show: this.props.show
		}
	},
	onClickYes: function(){
		this.props.onClickYes()
	},
	onClickNo: function(){
		this.props.onClickNo()
	},
	render: function(){
		let label = this.props.label
		let show = this.props.show

		return(
			<Modal className="prompt-modal-confirm" show={show}>
				<Modal.Body>
					<div className="row">
						<div className="col-xs-3 text-center">
							<div className="box-icon">
								<i className="fa fa-exclamation fa-3x" />
							</div>
						</div>
						<div className="col-xs-9 text-center">
							<div className="label">
								<p>{label}</p>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="button-toolbar pull-right">
						<button className="btn btn-md btn-primary" onClick={this.onClickYes}>Ya</button>
						<button className="btn btn-md btn-danger" onClick={this.onClickNo}>Tidak</button>
					</div>
				</Modal.Footer>
			</Modal>
		)
	}
})

window.PromptModalConfirmation = PromptModalConfirmation