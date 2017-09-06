let EventEmitter = fbemitter.EventEmitter 

const CHANGE_EVENT = 'change'

var keygen = new KeyGenerator()

var blankItem = {	
					id: null,
                    ageMin: null,
                    ageMax: null, 
                    positionId: null,
                    educationLevelIds: null,
                    remark: null,
                    workDescriptions: []
                }

var blankDescription = {
                    id: null,
                    description: null
                }
var post = {
				id: null,
				postDate: null,
				expiredDate: null,
				companyId: null,
				provinceId: null,
				cityId: null,
		   }

var educationLevelTypes = []
var provinces = []
var cities = []
var companyTypes = []
var provinceSelected = {}
var provinceCities = []

window.PostStore = _.assign(new EventEmitter(),{ 
	getPost: function(){ return post },
	getEducationLevelTypes: function(){ return educationLevelTypes },
	getProvinces: function(){ return provinces },
	getProvinceSelected: function(){ return provinceSelected },
	getProvinceCities: function(){ return provinceCities },
	getCompanyTypes: function(){ return companyTypes },

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
		if (payload.actionType == 'initialize-post'){
			_.assign(post, {key: keygen.getUniqueKey()})
			_.assign(post, _post)

			return PostStore.emitChange()
		}else if (payload.actionType == 'post-set-initialization'){
			let _workDescription = Object.assign({}, blankDescription)
			_workDescription.key = keygen.getUniqueKey()
			let _requirement = Object.assign({}, blankItem) 
			_requirement.key = keygen.getUniqueKey()
			_requirement.workDescriptions.push(_workDescription)
			_.assign(post, {key: keygen.getUniqueKey(), requirements: [ _requirement ]})
			educationLevelTypes = payload.educationLevelTypes			
			cities = payload.cities
			provinces = payload.provinces
			companyTypes = payload.companyTypes
			_provinceSelected = provinces[0]
			_provinceCities = _.filter(cities, function(city){
				if (city.province_id == _provinceSelected.id){
					return true
				}
			}) 

			provinceSelected = _provinceSelected
			provinceCities = _provinceCities
		}else if (payload.actionType == 'post-change-province-selected'){
			_provinceSelected = _.find(provinces, function(_item){
				if(_item.id == payload.provinceId){
					return true
				}
			})
			_provinceCities = _.filter(cities, function(city){
				if (city.province_id == _provinceSelected.id){
					return true
				}
			})
			provinceSelected = _provinceSelected
			provinceCities = _provinceCities

			PostStore.emitChange()
		}else if (payload.actionType == 'post-add-blank-description'){
			//function add blank description
			let _blankDescription = Object.assign({}, blankDescription)
			_blankDescription.key = keygen.getUniqueKey()

			let _requirement = _.find(post.requirements, function(_item){
				if(_item.key == payload.requirementKey){
					return true
				}
			})
			_requirement.workDescriptions.push(_blankDescription)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-add-blank-requirement'){
			//function add blank requriement
			let _requirement = Object.assign({}, blankItem)
			_requirement.key = keygen.getUniqueKey()
			let _blankDescription = Object.assign({}, blankDescription)
			_blankDescription.key = keygen.getUniqueKey()
			_requirement.workDescriptions.push(_blankDescription)
			
			post.requirements.push(_requirement)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-remove-description'){
			//function remove description
			let _key = payload.key
			let _requirementKey = payload.requirementKey

			let _requirement = _.find(post.requirements, function(_item){
				if(_item.key == _requirementKey){
					return true
				}
			})

			let _description = _.remove(_requirement.workDescriptions, function(_item){
				if(_item.key == _key){
					return true
				}
			})

			PostStore.emitChange()
		}else if(payload.actionType == 'post-remove-requirement'){
			//function remove requirement
			let _requirement = _.remove(post.requirements, function(_item){
				if(_item.key == payload.key){
					return true
				}
			})

			PostStore.emitChange()
		}
	}
);
