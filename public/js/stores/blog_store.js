let blogEventEmitter = fbemitter.EventEmitter 

const BLOG_CHANGE_EVENT = 'change'

var keygen = new KeyGenerator()

var categories = []

var blog = {
	key: keygen.getUniqueKey(),
	title: null,
	content: null,
	pictureUrl: null,
	source_link: null,
	user_id: null,
	category_id: null,
	author: {},
	category: {}
}

window.BlogStore = _.assign(new blogEventEmitter(),{ 
	getBlog: function(){ return blog },
	getCategories: function(){ return categories },

	emitChange: function(){
		return this.emit(BLOG_CHANGE_EVENT)
	},
	addChangeListener: function(callback){
		return this.addListener(BLOG_CHANGE_EVENT, callback)
	},
	removeChangelistener: function(){
		return this.removeAllListener(BLOG_CHANGE_EVENT)
	}

});

dispatcher.register(
	function(payload){
		if (payload.actionType == 'blog-change'){
			blog = Object.assign({}, blog, payload.attributes)

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-set-initialization'){
			categories = payload.categories
			let author = payload.author
			blog = Object.assign({}, {user_id: author.id, author: author})

			BlogStore.emitChange()
		}
	}
);
