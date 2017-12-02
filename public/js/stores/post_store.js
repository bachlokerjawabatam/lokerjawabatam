let EventEmitter = fbemitter.EventEmitter 

const CHANGE_EVENT = 'change'

var keygen = new KeyGenerator()

var blankItem = {	
					id: null,
                    age_min: null,
                    age_max: null,
                    education_level: {},
                    education_level_id: null, 
                    position_id: null,
                    salary: null,
                    remark: null
                }

var blankDescription = {
                    id: null,
                    description: null
                }

var blankRequireDescription = {
					id: null,
					description: null
				}

var blankPost = {
				id: null,
				post_date: null,
				expired_date: null,
				company_id: null,
				company: {
					company_type: {}
				},
				province_id: null,
				city_id: null,
				province: {},
				city: {},
				logo: null
		   }

var post = {}
var educationLevelTypes = []
var provinces = []
var cities = []
var companyTypes = []
var provinceSelected = {}
var provinceCities = []
var genderOptions = [{id: 1, name: "Pria"}, {id: 2, name: "Wanita"}]
var menuSelected = "loker"
var isNewFormLoker = false
var adminLokerList = []

window.PostStore = _.assign(new EventEmitter(),{ 
	getPost: function(){ return post },
	getEducationLevelTypes: function(){ return educationLevelTypes },
	getProvinces: function(){ return provinces },
	getProvinceSelected: function(){ return provinceSelected },
	getProvinceCities: function(){ return provinceCities },
	getCompanyTypes: function(){ return companyTypes },
	getGenderOptions: function(){ return genderOptions },
	getMenuSelected: function(){ return menuSelected },
	isNewFormLoker: function(){ return isNewFormLoker },
	getAdminLokerList: function(){ return adminLokerList },
	
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
			adminLokerList = payload.adminLokerList

			let _requireDescription = Object.assign({}, blankRequireDescription)
			_requireDescription.key = keygen.getUniqueKey()
			let _workDescription = Object.assign({}, blankDescription)
			_workDescription.key = keygen.getUniqueKey()
			let _requirement = Object.assign({}, blankItem)
			_requirement.position = {}
			_requirement.key = keygen.getUniqueKey()
			_requirement.work_descriptions = []
			_requirement.require_descriptions = []
			_requirement.work_descriptions.push(_workDescription)
			_requirement.require_descriptions.push(_requireDescription)
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
		}else if(payload.actionType == 'post-change-city-selected'){
			_.assign(post, {city_id: payload.cityId})

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
			_requirement.work_descriptions.push(_blankDescription)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-add-blank-require-description'){
			//function add blank require description
			let _blankDescription = Object.assign({}, blankRequireDescription)
			_blankDescription.key = keygen.getUniqueKey()

			let _requirement = _.find(post.requirements, function(_item){
				if(_item.key == payload.requirementKey){
					return true
				}
			})
			_requirement.require_descriptions.push(_blankDescription)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-add-blank-requirement'){
			//function add blank requriement
			let _requirement = Object.assign({}, blankItem)
			_requirement.position = {}
			_requirement.key = keygen.getUniqueKey()
			_requirement.work_descriptions = []
			_requirement.require_descriptions = []
			let _blankDescription = Object.assign({}, blankDescription)
			let _blankRequireDescription = Object.assign({}, blankRequireDescription)
			_blankDescription.key = keygen.getUniqueKey()
			_blankRequireDescription.key = keygen.getUniqueKey()
			_requirement.work_descriptions.push(_blankDescription)
			_requirement.require_descriptions.push(_blankRequireDescription)
			
			post.requirements.push(_requirement)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-remove-description'){
			//function remove description
			_requirement = _.find(post.requirements, function(_item){
				if(_item.key == payload.requirementKey){
					return true
				}
			})
			
			if(payload.id){
				_description = _.find(_requirement.work_descriptions, function(e){
					if(e.key == payload.key){
						return true
					}
				})

				_description.destroy = true
			}else{
				let _description = _.remove(_requirement.work_descriptions, function(_item){
					if(_item.key == payload.key){
						return true
					}
				})	
			}
			

			PostStore.emitChange()
		}else if(payload.actionType == 'post-remove-require-description'){
			//function remove require description
			_requirement = _.find(post.requirements, function(_item){
				if(_item.key == payload.requirementKey){
					return true
				}
			})
			
			if (payload.id){
				_description = _.find(_requirement.require_descriptions, function(e){
					if(e.key == payload.key){
						return true
					}
				})
				
				_description.destroy = true
			}else{
				_description = _.remove(_requirement.require_descriptions, function(_item){
					if(_item.key == payload.key){
						return true
					}	
				})	
			}
			

			PostStore.emitChange()
		}else if(payload.actionType == 'post-remove-requirement'){
			//function remove requirement
			if(payload.id){
				_requirement = _.find(post.requirements, function(e){
					if(e.key == payload.key){
						return true
					}
				})

				_requirement.destroy = true
			}else{
				_requirement = _.remove(post.requirements, function(_item){
					if(_item.key == payload.key){
						return true
					}
				})	
			}
			

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-menu-selected'){
			//function change menu selected
			menuSelected = payload.menuSelected

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-picture'){
			//function change company logo
			post = Object.assign({}, post, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-reset-admin-post'){
			//function reset posting on admin
			post = blankPost

			let _requireDescription = Object.assign({}, blankRequireDescription)
			_requireDescription.key = keygen.getUniqueKey()
			let _workDescription = Object.assign({}, blankDescription)
			_workDescription.key = keygen.getUniqueKey()
			let _requirement = Object.assign({}, blankItem)
			_requirement.position = {}
			_requirement.key = keygen.getUniqueKey()
			_requirement.work_descriptions = []
			_requirement.require_descriptions = []
			_requirement.work_descriptions.push(_workDescription)
			_requirement.require_descriptions.push(_requireDescription)
			_.assign(post, {key: keygen.getUniqueKey(), requirements: [ _requirement ]})		
			
			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-is-new-form-loker'){
			isNewFormLoker = payload.isNewFormLoker

			PostStore.emitChange()
		}else if(payload.actionType == 'post-set-post-loker'){
			post = payload.post.post
			
			_provinceCities = _.filter(cities, function(city){
				if (city.province_id == post.province_id){
					return true
				}
			})

			post.key = keygen.getUniqueKey()
			_.each(post.requirements, function(requirement){
				requirement.key = keygen.getUniqueKey()
				_.each(requirement.require_descriptions, function(e){
					e.key = keygen.getUniqueKey()
				})

				_.each(requirement.work_descriptions, function(i){
					i.key = keygen.getUniqueKey()
				})
			})

			provinceCities = _provinceCities

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-post-company'){
			_.assign(post.company, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-post'){
			_.assign(post, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-requirement'){
			_key = payload.id ? 'id' : 'key'

			let requirement = _.find(post.requirements, function(_item){
				if(_item[_key] == payload[_key]){
					return true
				}
			})

			_.assign(requirement, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-position'){
			_key = payload.id ? 'id' : 'key'

			let requirement = _.find(post.requirements, function(_item){
				if(_item[_key] == payload[_key]){
					return true
				}
			})
			
			_.assign(requirement.position, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-requirement-description'){
			_requirement = _.find(post.requirements, function(e){
				if(e.key == payload.requirementKey){
					return true
				}
			})

			_item = _.find(_requirement.require_descriptions, function(e){
				if(e.key == payload.itemKey){ 
					return true
				}
			})

			_.assign(_item, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-change-work-description'){
			_requirement = _.find(post.requirements, function(e){
				if(e.key == payload.requirementKey){
					return true
				}
			})

			_item = _.find(_requirement.work_descriptions, function(e){
				if(e.key == payload.itemKey){
					return true
				}
			})

			_.assign(_item, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-admin-item-change-requesting'){
			requesting = payload.requesting
			_post = _.find(adminLokerList, function(_item){ 
				return _item.id == payload.item.id
			})

			_.assign(_post, payload.attributes)

			PostStore.emitChange()
		}else if(payload.actionType == 'post-admin-delete-loker'){
			_.remove(adminLokerList, function(_item){
				return _item.id == payload.item.id
			})

			PostStore.emitChange()
		}
	}
);
