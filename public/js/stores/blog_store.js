let blogEventEmitter = fbemitter.EventEmitter 

const BLOG_CHANGE_EVENT = 'change'

var keygen = new KeyGenerator()

var blog = {
	title: null,
	content: null,
	pictureUrl: { url: null }
}

window.BlogStore = _.assign(new blogEventEmitter(),{ 
	getBlog: function(){ return blog },
	
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
		}
	}
);
