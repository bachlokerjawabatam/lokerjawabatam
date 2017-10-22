let blogEventEmitter = fbemitter.EventEmitter 

const BLOG_CHANGE_EVENT = 'change'

var keygen = new KeyGenerator()

var categories = []

var blog = {
	key: keygen.getUniqueKey(),
	id: null,
	title: null,
	content: null,
	picture_url: null,
	source_link: null,
	user_id: null,
	category_id: null,
	author: {},
	category: {}
}

var blogList = []
var adminBlogList = []
var showBlogDetail = false
var selectedBlog = {}
var populerItems = []
var latestItems = []
var isNewFormBlog = false
var requesting = false

window.BlogStore = _.assign(new blogEventEmitter(),{ 
	getBlog: function(){ return blog },
	getCategories: function(){ return categories },
	getBlogList: function(){ return blogList },
	getShowBlogDetail: function(){ return showBlogDetail },
	getSelectedBlog: function(){ return selectedBlog },
	getPopulerItems: function(){ return populerItems },
	getLatestItems: function(){ return latestItems },
	isNewFormBlog: function(){ return isNewFormBlog },
	getAdminBlogList: function(){ return adminBlogList },
	getRequesting: function(){ return requesting },

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
			adminBlogList = payload.adminBlogList
			categories = payload.categories
			let author = payload.author
			blog = Object.assign({}, {user_id: author.id, author: author})

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-view-initialization'){
			blogList = payload.blogList
			populerItems = payload.populerItems
			latestItems = payload.latestItems

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-set-blog-list'){
			blogList = payload.blogList
			
			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-change-show-blog-detail'){
			showBlogDetail = payload.showBlogDetail

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-change-selected-blog'){
			_.assign(selectedBlog, payload.selectedBlog)

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-change-is-new-form-blog'){
			isNewFormBlog = payload.isNewFormBlog

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-admin-item-change-requesting'){
			requesting = payload.requesting
			_blog = _.find(adminBlogList, function(_item){ 
				return _item.id == payload.item.id
			})
			
			_.assign(_blog, payload.attributes)
			
			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-set-blog'){
			blog = payload.blog

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-admin-delete-blog'){
			_.remove(adminBlogList, function(_item){
				return _item.id == payload.item.id
			})

			BlogStore.emitChange()
		}else if(payload.actionType == 'blog-reset-blog'){
			let _userId = blog.user_id
			let _author = blog.author
			blog = {user_id: _userId, author: _author , requesting: {type: null, status: false}}

			BlogStore.emitChange()
		}
	}
);
