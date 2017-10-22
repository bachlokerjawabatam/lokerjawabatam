let AlertEventEmitter = fbemitter.EventEmitter

const ALERT_CHANGE_EVENT = "change"

var alert = { alertType: null, alertLabel: null }

window.AlertAppStore = _.assign(new AlertEventEmitter(), {
	getAlert: function(){ return alert },

	emitChange: function(){
		return this.emit(ALERT_CHANGE_EVENT)
	},
	addChangeListener: function(callback){
		return this.addListener(ALERT_CHANGE_EVENT, callback)
	},
	removeChangeListener: function(callback){
		return this.removeAllListener(ALERT_CHANGE_EVENT)
	}

})

dispatcher.register(
	function(payload){
		if (payload.actionType == 'alert-app-change-alert'){
			_.assign(alert, payload.attributes)

			AlertAppStore.emitChange()
		}
	}
)
