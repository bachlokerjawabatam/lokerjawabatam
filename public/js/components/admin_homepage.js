var PropTypes = React.PropTypes
var OverlayTrigger = ReactBootstrap.OverlayTrigger
var Tooltip = ReactBootstrap.Tooltip

var flexibleTooltip = function(textTooltip){
    return(
        <Tooltip>{textTooltip}</Tooltip>
    )
}

var keygen = new KeyGenerator()

var LokerJawaBatamSelect = React.createClass({
    propTypes:{
        classNames: PropTypes.string,
        id: PropTypes.string,
        options: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        onChangeSelected: PropTypes.func,
        useOnChange: PropTypes.bool
    },
    getDefaultProps: function(){
        return{
            useOnChange: false
        }
    },
    onChangeSelectedOption: function(event){
        let useOnChange = this.props.useOnChange

        if (useOnChange == true){
            this.props.onChangeSelected(event.target.value)
        }
    },
    render: function(){
        let id = this.props.id
        let selected = this.props.selected
        let options = this.props.options
        let name = this.props.name
        let classNames = this.props.classNames
        let option = function (item, key){
            return(
                <option key={key} value={item.id}>{item.name}</option>
            )
        }
        return(
            <select className={classNames}
                id={id} name={name} onChange={this.onChangeSelectedOption}>
                {options.map(function(item, key){
                    let isSelected = item.id == selected

                    return(
                        <option key={key} value={item.id} selected={isSelected}>
                            {item.name}
                        </option>
                    )
                })}
            </select>
        )
    }
});

var RequireDescriptionRow = React.createClass({
    onClickRemove: function(){
        let item = this.props.item
        let requirement = this.props.requirement

        dispatcher.dispatch({
            actionType: 'post-remove-require-description',
            key: item.key,
            requirementKey: requirement.key
        })
    },
    render: function(){
        let key = this.props.descriptionKey
        let removeIconStyle = {fontSize: "18px", cursor: "pointer"}
        let prefixName = this.props.inputName + "[" + key + "]"
        let requireDescriptionInputName = prefixName + "[description]"

        return(
            <div className="form-group">
                <div className="col-sm-3"></div>
                <label className="col-sm-2">Kualifikasi Pekerjaan :</label>
                <div className="col-sm-6">
                    <textarea name={requireDescriptionInputName} className="form-control input-sm" rows="2" required={true}  />
                </div>
                <div className="col-sm-1 text-left">
                    <i style={removeIconStyle} className="fa fa-times" onClick={this.onClickRemove}  />
                </div>
            </div>
        )
    }
})

var RequireDescriptions = React.createClass({
    propTypes: {
        requireDescriptions: PropTypes.array,
        requirement: PropTypes.object
    },
    onClickAddDescription: function(){
        let requirement = this.props.requirement

        dispatcher.dispatch({
            actionType: 'post-add-blank-require-description',
            requirementKey: requirement.key
        })
    },
    render: function(){
        let inputName = this.props.inputName
        let requireDescriptions = this.props.requireDescriptions
        let requirement = this.props.requirement

        return(
            <div>
                {requireDescriptions.map(function(item, key){
                    return(
                        <RequireDescriptionRow key={item.key} item={item} 
                            requirement={requirement}
                            inputName={inputName} 
                            descriptionKey={key} />
                    )
                })}
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-8">
                        <button type="button" className="btn btn-warning btn-xs pull-right" 
                            onClick={this.onClickAddDescription}>
                            Tambah kualifikasi Pekerjaan
                        </button>
                    </div>
                </div>
            </div>
        )
    }
})

var DescriptionRow = React.createClass({
    onClickRemove: function(){
        let item = this.props.item
        let requirement = this.props.requirement

        dispatcher.dispatch({
            actionType: 'post-remove-description',
            key: item.key,
            requirementKey: requirement.key
        })
    },
    render: function(){
        let key = this.props.descriptionKey
        let removeIconStyle = {fontSize: "18px", cursor: "pointer"}
        let prefixName = this.props.inputName + "[" + key + "]"
        let workDescriptionInputName = prefixName + "[description]"
        return(
            <div className="form-group">
                <div className="col-sm-3"></div>
                <label className="col-sm-2">Deskripsi Pekerjaan :</label>
                <div className="col-sm-6">
                    <textarea name={workDescriptionInputName} className="form-control input-sm" rows="2" required={true}  />
                </div>
                <div className="col-sm-1 text-left">
                    <i style={removeIconStyle} className="fa fa-times" onClick={this.onClickRemove}  />
                </div>
            </div>
        )
    }
})

var WorkDescription = React.createClass({
    propTypes:{
        workDescriptions: PropTypes.array,
        requirement: PropTypes.object
    },
    onClickAddDescription: function(){
        let requirement = this.props.requirement

        dispatcher.dispatch({
            actionType: 'post-add-blank-description',
            requirementKey: requirement.key
        })
    },
    render: function(){
        let inputName = this.props.inputName
        let workDescriptions = this.props.workDescriptions
        let requirement = this.props.requirement

        return(
            <div>
                {workDescriptions.map(function(item, key){
                    return(
                        <DescriptionRow key={item.key} item={item} 
                            requirement={requirement}
                            inputName={inputName} 
                            descriptionKey={key} />
                    )
                })}
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-8">
                        <button type="button" className="btn btn-primary btn-xs pull-right" 
                            onClick={this.onClickAddDescription}>
                            Tambah Deskripsi Pekerjaan
                        </button>
                    </div>
                </div>
            </div>
        )
    }
});

var ItemRequirement = React.createClass({
    getInitialState: function(){
        return {
            salary: 0
        }
    },
    onClickRemove:function(){
        let item = this.props.item

        dispatcher.dispatch({
            actionType: 'post-remove-requirement',
            key: item.key 
        })
    },
    onChangeSalary: function(event){
        let salary = Number(event.target.value) / 1000 
        this.setState({salary: salary})
    },
    render: function(){
        let key = this.props.inputKey
        let item = this.props.item
        let workDescriptions = item.workDescriptions
        let requireDescriptions = item.requireDescriptions
        let educationLevelTypes = this.props.educationLevelTypes
        let genderOptions = this.props.genderOptions
        let prefixName = this.props.inputName + "[" +  key  + "]"
        let positionInputName = prefixName + "[position_name]"
        let positionIdInputName = prefixName + "[position_id]"
        let genderInputName = prefixName + "[gender]"
        let ageMinInputName = prefixName + "[age_min]"
        let ageMaxInputName = prefixName + "[age_max]"
        let experienceInputName = prefixName + "[experience]"
        let educationLevelIdInputName = prefixName + "[education_level_id]"
        let descriptionInputName = prefixName + "[description]"
        let salaryInputName = prefixName + "[salary]"
        let workDescriptionInputName = prefixName + "[work_description]"
        let requireDescriptionInputName = prefixName + "[require_description]"
        let removeIconStyle = {fontSize: "18px", cursor: "pointer"}
        let salaryValue = this.state.salary

        return (
            <div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Posisi :</label>
                    <div className="col-sm-6">
                        <input type="text" name={positionInputName} className="form-control input-sm" required={true} />
                        <input type="hidden" name={positionIdInputName} />
                    </div>
                    <div className="col-sm-1 text-left">
                        <i style={removeIconStyle} className="fa fa-times" onClick={this.onClickRemove}  />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Gaji :</label>
                    <label className="col-sm-1 text-right">Rp.</label>
                    <div className="col-sm-5">
                        <input type="number" step="50000" className="form-control input-sm" onChange={this.onChangeSalary} />
                        <input type="hidden" name={salaryInputName} value={salaryValue} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Jenis Kelamin :</label>
                    <div className="col-sm-2">
                        <select className="form-control input-sm" id="gender" name={genderInputName} >
                            <option key="gender-1" value="Pria">Pria</option>
                            <option key="gender-2" value="Wanita">Wanita</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Usia :</label>
                    <label className="col-sm-1">Min :</label>
                    <div className="col-sm-2">
                        <input type="number" min={18} max={63} name={ageMinInputName} className="form-control input-sm" required={true} />
                    </div>
                    <label className="col-sm-1">Max :</label>
                    <div className="col-sm-2">
                        <input type="number" min={18} max={63} name={ageMaxInputName} className="form-control input-sm" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Pendidikan :</label>
                    <div className="col-sm-3">
                        <LokerJawaBatamSelect
                            classNames="form-control input-sm" 
                            id="education-level-type"
                            name={educationLevelIdInputName}
                            options={educationLevelTypes} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Pengalaman :</label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" min={0} step={1} 
                            name={experienceInputName} />
                    </div>
                    <div className="col-sm-1">
                        Tahun
                    </div>
                </div>
                <RequireDescriptions inputName={requireDescriptionInputName} 
                    requireDescriptions={requireDescriptions} requirement={item} />
                <WorkDescription inputName={workDescriptionInputName} 
                    workDescriptions={workDescriptions} requirement={item} />
            </div>
        )
    }
});

var Requirement = React.createClass({
    propTypes:{
        requirements: PropTypes.array
    },
    onClickAddRequirement: function(){
        dispatcher.dispatch({
            actionType: 'post-add-blank-requirement'
        })
    },
    render: function(){
        let requirements = this.props.requirements
        let educationLevelTypes = PostStore.getEducationLevelTypes()
        let genderOptions = PostStore.getGenderOptions()
        let inputName = "requirements"
        let i = 0
        
        return (
            <div>
                {
                    requirements.map(function(item, key) {
                           return(
                            <ItemRequirement key={item.key} item={item} inputKey={key}
                                educationLevelTypes={educationLevelTypes} 
                                genderOptions={genderOptions}
                                inputName={inputName} />
                        )
                    })
                }
                <div className="form-group">
                        <div className="col-sm-11">
                            <button type="button" className="btn btn-xs btn-success pull-right"
                                onClick={this.onClickAddRequirement} >
                                Tambah Kebutuhan Pekerjaan
                            </button>
                        </div>
                    </div>
            </div>
        )
    }
});

var AdminNavbarMenu = React.createClass({
    propTypes: {
        menuSelected: React.PropTypes.string.isRequired
    },
    onClickMenu: function(menu){
        if(_.includes(['loker', 'blog'], menu)){
            dispatcher.dispatch({
                actionType: 'post-change-menu-selected',
                menuSelected: menu
            })
        }else if(menu == 'logout'){
            window.location = '/admin/logout'
        }
    },
    render: function(){
    	let iconStyle = {margin: "5px 20px 0px 0px", fontSize: "18px"}
        let menuSelected = this.props.menuSelected
        let lokerClassName = menuSelected == "loker" ? "menu-option active" : "menu-option"
        let blogClassName = menuSelected == "blog" ? "menu-option active" : "menu-option"

        return(
            <div className="navbar-menu">
                <div className={lokerClassName} onClick={this.onClickMenu.bind(this, "loker")}>
                    <i style={iconStyle} className="fa fa-briefcase" />
                        Posting Loker
                </div>
                <div className={blogClassName} onClick={this.onClickMenu.bind(this, "blog")} >
                    <i style={iconStyle} className="fa fa-user" />
                        Posting Artikel
                </div>
                <div className="menu-option" onClick={this.onClickMenu.bind(this, "logout")}>
                    <i style={iconStyle} className="fa fa-lock" />
                        Keluar
                </div>
            </div>
        )
    }
});

var AdminFormLokerPost = React.createClass({
    propTypes:{
        csrfToken: PropTypes.string.isRequired
    },
    getInitialState: function(){
        return {
            provinceSelected: PostStore.getProvinceSelected(),
            provinces: PostStore.getProvinces(),
            cities: PostStore.getProvinceCities(),
            companyTypes: PostStore.getCompanyTypes(),
            post: PostStore.getPost()
        }
    },
    componentDidMount: function(){
        this.listener = PostStore.addChangeListener(this._onChange)
    },
    _onChange: function(){
        this.setState({
            provinceSelected: PostStore.getProvinceSelected(),
            cities: PostStore.getProvinceCities(),
            post: PostStore.getPost()
        })
    },
    componentWillUnmount: function(){
        this.listener.remove()
    },
    onChangeProvinceSelected: function(provinceId){
        dispatcher.dispatch({
            actionType: 'post-change-province-selected',
            provinceId: provinceId
        })
    },
    onClickPicture: function(){
        $(".post-picture").click()
    },
    onChangePicture: function(event){
        let attachment = event.target.files[0]

        let url = URL.createObjectURL(attachment)

        dispatcher.dispatch({
            actionType: 'post-change-picture',
            attributes: { logo: url }
        })
    },
    onRemovePicture: function(){
        dispatcher.dispatch({
            actionType: "post-change-picture",
            attributes: { logo: null }
        })
    },
    render: function(){
        let post = this.state.post
        let provinces = this.state.provinces
        let cities = this.state.cities
        let companyTypes = this.state.companyTypes
        let provinceSelected = this.state.provinceSelected
        let csrfToken = this.props.csrfToken
        let requirements = post.requirements
        let pictureUrl = this.state.post.logo

        if (pictureUrl){
            var logoDisplay = [<img src={pictureUrl} />,<i className="fa fa-times-circle" onClick={this.onRemovePicture} />]
        }else{
            var logoDisplay = <i className="fa fa-photo fa-3x" />
        }

        return(
            <div className="form-loker">
                <h3>Form lowongan Kerja</h3>
                <hr/>  
                <form className="form-horizontal" method="POST" action="/admin/post_loker" encType="multipart/form-data">
                    <input type="hidden" name="_token" value={csrfToken} />
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Nama Perusahaan</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control input-sm" name="company[name]" required={true} />
                            <input type="hidden" name="post[company_id]" value="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Logo Perusahaan</label>
                        <div className="col-sm-8">
                            <div className="post-picture-view pull-left">
                                {logoDisplay}
                            </div>
                            <a href="javascript:void(0)" className="btn btn-sm btn-success pull-right" onClick={this.onClickPicture}>
                                <i className="fa fa-camera" />
                                 Upload Logo
                            </a>
                            <input type="file" className="post-picture hidden" name="logo" onChange={this.onChangePicture} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Email Perusahaan</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control input-sm" name="company[email]" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Alamat Perusahaan</label>
                        <div className="col-sm-8">
                            <textarea className="form-control input-sm" row="5" name="company[address]" required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Jenis Perusahaan</label>
                        <div className="col-sm-8">
                            <LokerJawaBatamSelect
                                classNames="form-control input-sm" 
                                id="cities"
                                name="company[company_type_id]"
                                options={companyTypes} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Provinsi</label>
                        <div className="col-sm-3">
                            <LokerJawaBatamSelect
                                classNames="form-control input-sm" 
                                id="provinces"
                                name="post[province_id]"
                                options={provinces}
                                onChangeSelected={this.onChangeProvinceSelected}
                                useOnChange={true} />
                        </div>
                        <label className="col-sm-2 control-label"> Kota</label>
                        <div className="col-sm-3">
                            <LokerJawaBatamSelect
                                classNames="form-control input-sm" 
                                id="cities"
                                name="post[city_id]"
                                options={cities} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Tanggal Expired :</label>
                        <div className="col-sm-8">
                            <input type="date" className="form-control" name="post[exp_date]" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Sumber / Link :</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control input-sm" name="post[source_link]" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Kebutuhan :</label>
                    </div>
                    <Requirement requirements={requirements} />
                    <button type="submit" className="btn btn-md btn-primary">Submit</button>
                </form>
            </div>
        )
    }
})
var AdminPage = React.createClass({
    propTypes:{
        csrfToken: PropTypes.string.isRequired
    },
    getInitialState: function(){
        return{
            menuSelected: PostStore.getMenuSelected(),
            isNewFormBlog: BlogStore.isNewFormBlog(),
            isNewFormLoker: PostStore.isNewFormLoker()
        }
    },
    componentDidMount: function(){
        this.listener = PostStore.addChangeListener(this._onChange)
        this.listener2 = BlogStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function(){
        this.listener.remove()
        this.listener2.remove()
    },
    _onChange: function(){
        this.setState({
            menuSelected: PostStore.getMenuSelected(),
            isNewFormBlog: BlogStore.isNewFormBlog(),
            isNewFormLoker: PostStore.isNewFormLoker()
        })
    },
    render: function(){
        let csrfToken = this.props.csrfToken
        let menuSelected = this.state.menuSelected
        let isNewFormBlog = this.state.isNewFormBlog
        let isNewFormLoker = this.state.isNewFormLoker

        if(menuSelected == "loker"){
            var formDisplay = <AdminFormLokerPost csrfToken={csrfToken} /> 
            var menuFormDisplay = <LokerPostMenu />
        }else if(menuSelected == "blog"){
            if(isNewFormBlog){
                var formDisplay = <BlogForm csrfToken={csrfToken} />
            }else{
                var formDisplay = <BlogPostingList csrfToken={csrfToken} />
            }
            var menuFormDisplay = <BlogPostMenu />
        }

        return(
            <div className="admin-page text-center">
                <div className="header">
                    <div className="title">
                        Lokerjawabatam.com
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-2">
                        <AdminNavbarMenu menuSelected={menuSelected} />
                    </div>
                    <div className="col-lg-9 col-md-10 col-sm-10">
                        {menuFormDisplay}
                        {formDisplay}
                    </div>
                </div>
            </div>
        )
    }
});

var BlogForm = React.createClass({
    getInitialState: function(){
        return{
            blog: BlogStore.getBlog(),
            categories: BlogStore.getCategories()
        }
    },
    componentDidMount: function(){
        this.listener = BlogStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function(){
        this.listener.remove()
    },
    _onChange: function(){
        this.setState({
            blog: BlogStore.getBlog()
        })
    },
    onClickUpload: function()
    {
        $('.blog-picture').click()
    },
    onChangePicture: function(event){
        let attachment = event.target.files[0]
        let url = URL.createObjectURL(attachment)

        dispatcher.dispatch({
            actionType: "blog-change",
            attributes: { picture_url: url }
        })
    },
    onRemovePicture: function(){
        dispatcher.dispatch({
            actionType: 'blog-change',
            attributes: { picture_url: null, removePicture: true }
        })
    },
    onChangeContent: function(event){
        dispatcher.dispatch({
            actionType: 'blog-change',
            attributes: { content: event.target.value }
        })
    },
    onClickAttr: function(attrType){
        let contentValue = this.state.contentValue
        if (attrType == 'bold'){
            contentValue += '<strong></strong>'
        }else if (attrType == 'italic'){
            contentValue += '<i></i>'
        }else if (attrType == 'underline'){
            contentValue += '<u></u>'
        }

        this.setState({contentValue: contentValue})
    },
    onChangeTitle: function(event){
        dispatcher.dispatch({
            actionType: "blog-change",
            attributes: { title: event.target.value }
        })
    },
    onChangeSourceLink: function(event){
        dispatcher.dispatch({
            actionType: "blog-change",
            attributes: { source_link: event.target.value }
        })
    },
    render: function(){
        let id = this.state.blog.id
        let userId = this.state.blog.user_id
        let categories = this.state.categories
        let blogTitle = this.state.blog.title
        let sourceLink = this.state.blog.source_link
        let categoryId = this.state.blog.category_id
        let picture_url = this.state.blog.picture_url
        let removePicture = this.state.blog.removePicture
        let titleInputName = "blog[title]"
        let categoryIdInputName = "blog[category_id]"
        let sourceLinkInputName = "blog[source_link]"
        let contentValue = this.state.blog.content

        if (id && picture_url && !removePicture){
            var pictureUrl = "/images/" + picture_url
        }else{
            var pictureUrl = picture_url
        }

        if (pictureUrl) {
            var pictureBlogDisplay = [<img src={pictureUrl} />, <i className="fa fa-times-circle" onClick={this.onRemovePicture} />]
        }else{
            var pictureBlogDisplay = <i className="fa fa-photo fa-3x" />
        }

        let actionUrl = id ? "/admin/update_blog" : "/admin/post_blog"

        return(
            <div className="form-loker">
                <h3>{ id ? "Edit Artikel" : "Form Artikel" }</h3>
                <hr/>  
                <form className="form-horizontal" method="POST" action={actionUrl} encType="multipart/form-data">
                    <input type="hidden" name="_token" value={csrfToken} />
                    <input type="hidden" name="blog[user_id]" value={userId} />
                    <input type="hidden" name="blog[id]" value={id} />
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Judul Artikel</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control input-sm" name={titleInputName} 
                                value={blogTitle} 
                                required={true}
                                onChange={this.onChangeTitle} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Kategori</label>
                        <div className="col-sm-8">
                            <LokerJawaBatamSelect
                                classNames="form-control input-sm" 
                                id="blog-category"
                                name={categoryIdInputName}
                                options={categories}
                                selected={categoryId} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Sumber Referensi</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control input-sm" 
                                name={sourceLinkInputName}
                                value={sourceLink}
                                required={true}
                                onChange={this.onChangeSourceLink} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Picture</label>
                        <div className="col-sm-8">
                            <div className="blog-picture-view pull-left">
                                {pictureBlogDisplay}
                            </div>
                            <a href="javascript:void(0)" className="btn btn-sm btn-success pull-right" onClick={this.onClickUpload}>
                                <i className="fa fa-camera fa-1x" /> Upload Gambar
                            </a>
                            <input type="file" className="blog-picture hidden" name="picture" onChange={this.onChangePicture} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"></label>
                        <div className="col-sm-8 text-left">
                            <div className="text-editor-tool">
                                <a href="javascript:void(0)"className="btn btn-default" onClick={this.onClickAttr.bind(this, 'bold')}>
                                    <i className="fa fa-bold" />
                                </a>
                                <a href="javascript:void(0)" className="btn btn-default" onClick={this.onClickAttr.bind(this, 'italic')}>
                                    <i className="fa fa-italic" />
                                </a>
                                <a href="javascript:void(0)" className="btn btn-default" onClick={this.onClickAttr.bind(this, 'underline')}>
                                    <i className="fa fa-underline" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Konten Artikel</label>
                        <div className="col-sm-8">
                            <textarea rows={30} className="form-control input-sm" 
                                name="blog[content]" 
                                required={true} 
                                value={contentValue}
                                onChange={this.onChangeContent} />
                            <input type="hidden" name="post[company_id]" value="" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-md btn-primary">Submit</button>
                </form>
                <BlogPreview blogContent={contentValue} title={blogTitle} picture={pictureUrl} />
            </div>
        )
    }
})

var BlogPreview = React.createClass({
    propTypes: {
        blogContent: PropTypes.string,
        title: PropTypes.string,
        picture: PropTypes.string
    },
    getInitialState: function(){
        return{
            showPreview: false
        }
    },
    togglePreview: function(){
        let showPreview = this.state.showPreview
        this.setState({showPreview: !showPreview})
    },
    render: function(){
        let blogContent = this.props.blogContent
        let showPreview = this.state.showPreview
        let title = this.props.title
        let picture = this.props.picture

        if(showPreview){
            var previewComponent = 
                <div className="box-preview">
                    <img src={picture} />
                    <h1>{title}</h1>
                    <div className="content" dangerouslySetInnerHTML={{__html:blogContent}} />
                </div>
        }else{
            var previewComponent = null
        }

        return(
            <div className="blog-preview">
                <OverlayTrigger placement="left" overlay={flexibleTooltip("blog preview")}>
                    <div className="button-preview" onClick={this.togglePreview}>
                        <i className="fa fa-search" />
                    </div>
                </OverlayTrigger>
                {previewComponent}
            </div>
        )
    }
})

var BlogPostingList = React.createClass({
    getInitialState: function(){
        return{
            items: BlogStore.getAdminBlogList()
        }
    },
    componentDidMount: function(){
        this.listener = BlogStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function(){
        this.listener.remove()
    },
    _onChange: function(){
        this.setState({
            items: BlogStore.getAdminBlogList()
        })
    },
    render: function(){
        let items = this.state.items
        var that = this

        let item = function(item, key){
            return(
                <BlogPostingListItem item={item} csrfToken={that.props.csrfToken} />
            )
        }

        return(
            <div className="form-loker">
                <h3>Daftar Posting Artikel</h3>
                <hr />
                <div>
                    {items.map(item)}
                </div>
            </div>
        )
    }
})

var BlogPostingListItem = React.createClass({
    onClickEditBlog: function(){
        let item = this.props.item

        $.ajax({
            url: "/admin/edit_blog",
            method: "GET",
            data: { id: item.id },
            beforeSend: function(){
                dispatcher.dispatch({
                    actionType: 'blog-admin-item-change-requesting',
                    item: item,
                    attributes: {requesting: {type: 'edit', status: true}},
                    requesting: true
                })
            },
            success: function(blog){
                dispatcher.dispatch({
                    actionType: 'blog-set-blog',
                    blog: blog
                })

                dispatcher.dispatch({
                    actionType: 'blog-change-is-new-form-blog',
                    isNewFormBlog: true
                })
            },
            error: function(){
                console.log("error coy!");
            }
        }).always(function(){
            dispatcher.dispatch({
                actionType: 'blog-admin-item-change-requesting',
                item: item,
                attributes: {requesting: {type: 'edit', status: false}},
                requesting: false
            })
        })
    },
    onClickDeleteBlog: function(){
        let item = this.props.item
        let csrfToken = this.props.csrfToken

        $.ajax({
            url: "/admin/delete_blog",
            method: "DELETE",
            data: { id: item.id, _token: csrfToken},
            beforeSend: function(){
                dispatcher.dispatch({
                    actionType: 'blog-admin-item-change-requesting',
                    item: item,
                    attributes: {requesting: {type: 'delete', status: true}},
                    requesting: true
                })
            },
            success: function(blog){
                dispatcher.dispatch({
                    actionType: 'blog-admin-delete-blog',
                    item: item
                })
            },
            error: function(){
                console.log("error coy!");
            }
        }).always(function(){
            dispatcher.dispatch({
                actionType: 'blog-admin-item-change-requesting',
                item: item,
                attributes: {requesting: {type: 'edit', status: false}},
                requesting: false
            })
        })  
    },
    render: function(){
        let item = this.props.item

        return(
            <div className="posting-blog-list-item">
                <div className="row">
                    <div className="col-sm-8 text-left">
                        {item.title}    
                    </div>
                    <div className="col-sm-4 text-right">
                        <button className="btn-warning btn-xs" onClick={this.onClickEditBlog}><i className="fa fa-check" /> Edit</button>
                        <button className="btn-danger btn-xs" onClick={this.onClickDeleteBlog}><i className="fa fa-times" /> Hapus</button>
                    </div>
                </div>
            </div>
        )
    }
})

var BlogPostMenu = React.createClass({
    onClickForm: function(){
        dispatcher.dispatch({actionType: 'blog-reset-blog'
        })

        dispatcher.dispatch({
            actionType: 'blog-change-is-new-form-blog',
            isNewFormBlog: true
        })
    },
    onClickPosting: function(){
        dispatcher.dispatch({
            actionType: 'blog-change-is-new-form-blog',
            isNewFormBlog: false
        })
    },
    render: function(){
        return(
            <div className="posting-menu">
                <button className="btn btn-primary btn-sm" onClick={this.onClickForm}><i className="fa fa-file" /> Posting Baru</button>
                <button className="btn btn-success btn-sm" onClick={this.onClickPosting}><i className="fa fa-list" /> Daftar Posting</button>
            </div>
        )
    }
})

var LokerPostMenu = React.createClass({
    render: function(){
        return(
            <div className="posting-menu">
                <button className="btn btn-primary btn-sm"><i className="fa fa-file" /> Posting Baru</button>
                <button className="btn btn-success btn-sm"><i className="fa fa-list" /> Daftar Posting</button>
            </div>
        )
    }
})

window.BlogForm = BlogForm
window.AdminPage = AdminPage