let EventEmitter = fbemitter.EventEmitter 

const CHANGE_EVENT = 'change'

var keygen = new KeyGenerator()

var contentType = null
var lokerList = []
var lokerInfos = []
var itemSelected = {}
var infoSelected = {}
var isLoadingData = false
var showNavbar = false
var showJobView = false

window.HomepageStore = _.assign(new EventEmitter(),{ 
	getContentType: function(){ return contentType },
	getLokerList: function(){ return lokerList },
	getLokerInfos: function(){ return lokerInfos },
	getItemSelected: function(){ return itemSelected },
	getInfoSelected: function(){ return infoSelected },
	getIsLoadingData: function(){ return isLoadingData },
	getShowNavbar: function(){ return showNavbar },
	getShowJobView: function(){ return showJobView},

	emitChange: function(){
		return this.emit(CHANGE_EVENT)
	},
	addChangeListener: function(callback){
		return this.addListener(CHANGE_EVENT, callback)
	},
	removeChangelistener: function(){
		return this.removeAllListener(CHANGE_EVENT)
	}

});

dispatcher.register(
	function(payload){
		if(payload.actionType == 'homepage-initialization'){
			lokerList = []
			contentType = payload.contentType
			itemSelected = {}
			infoSelected = {}
			
			lokerInfos = payload.lokerInfos
			_.each(lokerInfos, function(_item){
				_.each(_item.requirements, function(_itemRequirement){
					list = _itemRequirement
					postData = {company: _item.company ,expiredDate: _item.expired_date, city: _item.city, province: _item.province}
					_.assign(list, postData)
					lokerList.push(list)
				})
			})

			HomepageStore.emitChange()
		}else if(payload.actionType == 'homepage-change-content-type'){
			contentType = payload.contentType

			HomepageStore.emitChange()
		}else if(payload.actionType == 'homepage-change-change-item'){
			let _itemInfo = _.find(lokerInfos, function(item){
				if(item.id == payload.item.post_id){
					return true
				}else{
					return false
				}
			})
			let _itemList = _.find(lokerList, function(_item){
				if(_item.id == payload.item.id){
					return true
				}else{
					return false
				}
			})

			itemSelected = _itemList
			infoSelected = _itemInfo
			showJobView = true

			HomepageStore.emitChange()
		}else if(payload.actionType == 'homepage-change-is-loading-data'){
			isLoadingData = payload.bool

			HomepageStore.emitChange()
		}else if(payload.actionType == 'homepage-change-show-navbar'){
			showNavbar = payload.bool
			
			HomepageStore.emitChange()
		}else if(payload.actionType == 'homepage-chage-show-job-view'){
			showJobView = payload.show

			HomepageStore.emitChange()
		}
	}
);
