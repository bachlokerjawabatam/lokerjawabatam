var PropTypes = React.PropTypes

var hideAlert = function(){
	dispatcher.dispatch({
		actionType: 'alert-app-change-alert',
		attributes: {alertType: null, alertLabel: null}
	})
}

var changeAlertAttributes = function(attributes){
	dispatcher.dispatch({
		actionType: 'alert-app-change-alert',
		attributes: attributes
	})
		
	setTimeout(hideAlert, 3000)
}
	

var AlertApp = React.createClass({
	propTypes:{
		flashAlert: PropTypes.object
	},
	getInitialState: function(){
		return {
			alert: AlertAppStore.getAlert()
		}
	},
	componentDidMount: function(){
		this.listener = AlertAppStore.addChangeListener(this._onChange)
		let flashAlert = this.props.flashAlert
		if (flashAlert){
		    this.setAlert(flashAlert)
		}
	},
	componentWillUnmount: function(){
		this.listener.remove()
	},
	_onChange: function(){
		this.setState({
			alert: AlertAppStore.getAlert()
		})
	},		
	setAlert: function(attributes){
		this.setState({
			alert: attributes
		})
		setTimeout(this.hideAlert, 3000)
	},
	hideAlert: function(){
		this.setState({
			alert: {alertType: null, alertLabel: null}
		})
	},
	render: function(){
		let alert= this.state.alert
		let alertType = alert.alertType
		let alertLabel = alert.alertLabel 
		let alertClass = null
		let alertTitle = null

		if(alertType == 'notify'){
			alertClass = 'fa fa-check-circle' 
			alertTitle = 'Berhasil !'
		}else if(alertType == 'warning'){
			alertClass = 'fa fa-exclamation-triangle'
			alertTitle = 'Peringatan !'
		}else if(alertType == 'error'){
			alertTitle = 'Kesalahan !'
			alertClass = 'fa fa-ban'
		}

		let newStyle = {}
		let titleStyle = null

		if (alertType == 'notify'){
			_.assign(newStyle, {backgroundColor: "#00cc00"})
			titleStyle = {color: "#00cc00"}
		}else if (alertType == 'warning'){
			_.assign(newStyle, {backgroundColor: "orange"})
			titleStyle = {color: "orange"}
		}else if (alertType == 'error'){
			titleStyle = {color: "#d64541"}
			_.assign(newStyle, {backgroundColor: "#d64541"})
		}

		let iStyle = {fontSize: '32px'} 

		if (!_.isEmpty(alertLabel)){
			return(
				<div className="alert-box">
					<div className="alert-notification">
						<div className="alert-icon" style={newStyle} >
							<i className={alertClass} style={iStyle} />
						</div>
						<div className="alert-remark">
							<p className="title" style={titleStyle}>{alertTitle}</p>
							<p>{alertLabel}</p>
						</div>
					</div>
				</div>
			)
		}else{
			return null
		}
			
	},
	statics: {
	    displaySuccess: function(message){
	    	changeAlertAttributes({alertType: "notify", alertLabel: message})
	    },
	    displayError: function(message){
	    	changeAlertAttributes({alertType: "error", alertLabel: message})
	    },
	    displayWarning: function(message){
	     	changeAlertAttributes({alertType: "warning", alertLabel: message})
	    }
	 }
})
	

window.AlertApp = AlertApp