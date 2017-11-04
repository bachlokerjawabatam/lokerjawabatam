'use strict'

var PropTypes = React.PropTypes
var OverlayTrigger = ReactBootstrap.OverlayTrigger
var Tooltip = ReactBootstrap.Tooltip
const {Editor, EditorState, convertToRaw, convertFromRaw, RichUtils} = Draft;

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
        
        return(
            <select className={classNames} value={selected}
                id={id} name={name} onChange={this.onChangeSelectedOption}>
                {options.map(function(item, key){
                    let isSelected = item.id == selected
                    
                    return(
                        <option key={key} value={item.id}>
                            {item.name}
                        </option>
                    )
                })}
            </select>
        )
    }
});


var PreviewComponentEditor = React.createClass({
    propTypes:{
        contentRaw: React.PropTypes.string
    },
    render: function(){
        const {contentRaw} = this.props

        return(
            <Editor editorState={contentRaw} readOnly />
        )
    }
})

var RequireDescriptionRow = React.createClass({
    onClickRemove: function(){
        let item = this.props.item
        let requirement = this.props.requirement

        dispatcher.dispatch({
            actionType: 'post-remove-require-description',
            key: item.key,
            id: item.id,
            requirementKey: requirement.key
        })
    },
    _onDispatchChangeRequirementDescription: function(attributes){
        let requirement = this.props.requirement
        let item = this.props.item

        dispatcher.dispatch({
            actionType: 'post-change-requirement-description',
            requirementKey: requirement.key,
            itemKey: item.key,
            attributes: attributes
        })
    },
    onChangeRequirementDescription: function(event){
        this._onDispatchChangeRequirementDescription({description: event.target.value})
    },
    render: function(){
        let key = this.props.descriptionKey
        let removeIconStyle = {fontSize: "18px", cursor: "pointer"}
        let prefixName = this.props.inputName + "[" + key + "]"
        let requireDescriptionIdInputName = prefixName + "[id]"
        let requireDescriptionInputName = prefixName + "[description]"
        let requireDescriptionDestroyInputName = prefixName + "[destroy]"
        let item = this.props.item
        let itemDisplayStyle = item.destroy ? {display: "none"} : null

        return(
            <div style={itemDisplayStyle} className="form-group">
                <input type="hidden" name={requireDescriptionDestroyInputName} value={item.destroy} />
                <input type="hidden" name={requireDescriptionIdInputName} value={item.id} />
                <div className="col-sm-3"></div>
                <label className="col-sm-2">Kualifikasi Pekerjaan :</label>
                <div className="col-sm-6">
                    <textarea name={requireDescriptionInputName} className="form-control input-sm" 
                        value={item.description || ''}
                        rows="2"
                        required={true}
                        onChange={this.onChangeRequirementDescription} />
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
                        <RequireDescriptionRow key={key} item={item} 
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
            id: item.id,
            requirementKey: requirement.key
        })
    },
    _onDispatchChangeWorkDescription: function(attributes){
        let requirement = this.props.requirement
        let item = this.props.item

        dispatcher.dispatch({
            actionType: 'post-change-work-description',
            requirementKey: requirement.key,
            itemKey: item.key,
            attributes: attributes
        })
    },
    onChangeWorkDescription: function(event){
        this._onDispatchChangeWorkDescription({description: event.target.value})
    },
    render: function(){
        let key = this.props.descriptionKey
        let removeIconStyle = {fontSize: "18px", cursor: "pointer"}
        let prefixName = this.props.inputName + "[" + key + "]"
        let workDescriptionIdInputName = prefixName + "[id]"
        let workDescriptionInputName = prefixName + "[description]"
        let workDescriptionDestroyInputName = prefixName + "[destroy]"
        let item = this.props.item
        let itemDisplayStyle = item.destroy ? {display: "none"} : null

        return(
            <div style={itemDisplayStyle} className="form-group">
                <input type="hidden" name={workDescriptionDestroyInputName} value={item.destroy} />
                <input type="hidden" name={workDescriptionIdInputName} value={item.id} />
                <div className="col-sm-3"></div>
                <label className="col-sm-2">Deskripsi Pekerjaan :</label>
                <div className="col-sm-6">
                    <textarea name={workDescriptionInputName} className="form-control input-sm"
                        value={item.description || ''}
                        rows="2"
                        required={true}
                        onChange={this.onChangeWorkDescription}  />
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
                        <DescriptionRow key={key} item={item} 
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
    propTypes: {
        item: PropTypes.object,
        educationLevelTypes: PropTypes.array, 
        genderOptions: PropTypes.array,
        inputName: PropTypes.string
    },
    _onDispatchChangeRequirement: function(attributes){
        let item = this.props.item
        dispatcher.dispatch({
            actionType: 'post-change-requirement',
            id: item.id,
            key: item.key,
            attributes: attributes
        })
    },
    _onDispatchChangePosition: function(attributes){
        let item = this.props.item
        dispatcher.dispatch({
            actionType: 'post-change-position',
            id: item.id,
            key: item.key,
            attributes: attributes
        })
    },
    onClickRemove:function(){
        let item = this.props.item

        dispatcher.dispatch({
            actionType: 'post-remove-requirement',
            key: item.key,
            id: item.id
        })
    },
    onChangePosition: function(event){
        this._onDispatchChangePosition({id: null, name: event.target.value})
    },
    onChangeSalary: function(event){
        let salary = Number(event.target.value) / 1000 
        this._onDispatchChangeRequirement({salary: salary})
    },
    onChangeGender: function(event){
        this._onDispatchChangeRequirement({gender: event.target.value})
    },
    onChangeAgeMax: function(event){
        this._onDispatchChangeRequirement({age_max: event.target.value})
    },
    onChangeAgeMin: function(event){
        this._onDispatchChangeRequirement({age_min: event.target.value})
    },
    onChangeEducationValueSelected: function(educationLevelId){
        this._onDispatchChangeRequirement({education_level_id: educationLevelId})
    },
    onChangeExperience: function(event){
        this._onDispatchChangeRequirement({experience: event.target.value})
    },
    render: function(){
        let key = this.props.inputKey
        let item = this.props.item
        let workDescriptions = item.work_descriptions
        let requireDescriptions = item.require_descriptions
        let educationLevelTypes = this.props.educationLevelTypes
        let genderOptions = this.props.genderOptions
        let prefixName = this.props.inputName + "[" +  key  + "]"
        let requirementIdInputName = prefixName + "[id]"
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
        let requirementDestroyInputName = prefixName + "[destroy]"
        let removeIconStyle = {fontSize: "18px", cursor: "pointer"}
        let salaryDisplay = Number(item.salary) * 1000
        let itemDisplayStyle = item.destroy ? {display: 'none'} : null
        
        return (
            <div style={itemDisplayStyle}>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Posisi :</label>
                    <div className="col-sm-6">
                        <input type="text" name={positionInputName} className="form-control input-sm" 
                            value={item.position.name}
                            required={true}
                            onChange={this.onChangePosition} />
                        <input type="hidden" name={positionIdInputName} />
                        <input type="hidden" name={requirementDestroyInputName} value={item.destroy} />
                        <input type="hidden" name={requirementIdInputName} value={item.id} />
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
                        <input type="number" step="50000" className="form-control input-sm" 
                            value={salaryDisplay}
                            onChange={this.onChangeSalary} />
                        <input type="hidden" name={salaryInputName} value={item.salary} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Jenis Kelamin :</label>
                    <div className="col-sm-2">
                        <select className="form-control input-sm" id="gender" 
                            name={genderInputName}
                            value={item.gender}
                            onChange={this.onChangeGender} >
                            <option key="gender-1" value="Pria">Pria</option>
                            <option key="gender-2" value="Wanita">Wanita</option>
                            <option key="gender-3" value="Pria/Wanita">Pria/Wanita</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Usia :</label>
                    <label className="col-sm-1">Min :</label>
                    <div className="col-sm-2">
                        <input type="number" min={0} max={63} name={ageMinInputName} 
                            onChange={this.onChangeAgeMin}
                            value={item.age_min}
                            className="form-control input-sm" required={true} />
                    </div>
                    <label className="col-sm-1">Max :</label>
                    <div className="col-sm-2">
                        <input type="number" min={18} max={63} name={ageMaxInputName} 
                            onChange={this.onChangeAgeMax}
                            value={item.age_max}
                            className="form-control input-sm" />
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
                            options={educationLevelTypes}
                            useOnChange={true}
                            selected={item.education_level_id}
                            onChangeSelected={this.onChangeEducationValueSelected} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <label className="col-sm-2">Pengalaman :</label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" min={0} step={1} 
                            name={experienceInputName}
                            onChange={this.onChangeExperience}
                            value={item.experience} />
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
                            <ItemRequirement key={key} item={item} inputKey={key}
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
    onChangeCitySelected: function(cityId){
        dispatcher.dispatch({
            actionType: 'post-change-city-selected',
            cityId: cityId
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
            attributes: { logo: url, removePicture: true }
        })
    },
    onRemovePicture: function(){
        dispatcher.dispatch({
            actionType: "post-change-picture",
            attributes: { logo: null, removePicture: true}
        })
    },
    _onDispatchChangeCompany: function(attributes){
        dispatcher.dispatch({
            actionType: 'post-change-post-company',
            attributes: attributes
        })
    },
    _onDispatchChangePost: function(attributes){
        dispatcher.dispatch({
            actionType: 'post-change-post',
            attributes: attributes
        })
    },
    onChangeCompanyName: function(event){
        this._onDispatchChangeCompany({name: event.target.value})
    },
    onChangeCompanyEmail: function(event){
        this._onDispatchChangeCompany({email: event.target.value})  
    },
    onChangeCompanyAddress: function(event){
        this._onDispatchChangeCompany({address: event.target.value})
    },
    onChangeSourceLink: function(event){
        this._onDispatchChangePost({source_link: event.target.value})
    },
    onChangeExpiredDate: function(event){
        this._onDispatchChangePost({expired_date: event.target.value})
    },
    isDataValid: function(){
        let isDataValid = {message: null, status: true}
        let post = this.state.post
        if (_.isEmpty(_.filter(post.requirements, function(_e){ return (!_e.destroy || _e.destroy == undefined) }))){
            isDataValid = { message: "Minimal Memiliki 1 Kebutuhan Pekerjaan", status: false }
            return isDataValid
        }else{
            _.each(_.filter(post.requirements, function(_k){return (!_k.destroy || _k.destroy == undefined)}), function(e){
                if(_.isEmpty(_.filter(e.require_descriptions, function(_i){ return (!_i.destroy || _i.destroy == undefined) }))){
                    isDataValid = { message: "Minimal Memiliki 1 Kualifikasi Pekerjaan", status: false }
                    return isDataValid
                }

                if(_.isEmpty(_.filter(e.work_descriptions, function(_j){ return (!_j.destroy || _j.destroy == undefined) }))){
                    isDataValid  = { message: "Minimal Memiliki 1 Deskripsi Pekerjaan", status: false }
                    return isDataValid
                }

            })
        }

        return isDataValid
    },
    onClickLokerSubmit: function(){
        let isValid = this.isDataValid()

        if(isValid.status){
            $("#button-submit-loker").click()
        }else{
            AlertApp.displayWarning(isValid.message)
        }
    },
    render: function(){
        let post = this.state.post
        let provinces = this.state.provinces
        let cities = this.state.cities
        let company = post.company
        let companyTypes = this.state.companyTypes
        let provinceSelected = this.state.provinceSelected
        let csrfToken = this.props.csrfToken
        let requirements = post.requirements
        let pictureUrl = this.state.post.logo
        let removePicture = post.removePicture

        if (pictureUrl){
            if (post.id && pictureUrl && !removePicture){
                pictureUrl = '/logos/' + pictureUrl
            }

            var logoDisplay = [
                <img src={pictureUrl} key={keygen.getUniqueKey()} />,
                <i className="fa fa-times-circle" onClick={this.onRemovePicture} key={keygen.getUniqueKey()} />]
        }else{
            var logoDisplay = <i className="fa fa-photo fa-3x" />
        }

        let actionUrl = post.id ? "/admin/update_loker" : "/admin/post_loker"

        return(
            <div className="form-loker">
                <h3>Form lowongan Kerja</h3>
                <hr/>  
                <form id="loker-form" className="form-horizontal" method="POST" action={actionUrl} encType="multipart/form-data">
                    <input type="hidden" name="_token" value={csrfToken} />
                    <input type="hidden" name="post[id]" value={post.id} />
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Nama Perusahaan</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control input-sm" name="company[name]" value={company.name} 
                                onChange={this.onChangeCompanyName} required={true} />
                            <input type="hidden" name="post[company_id]" value={company.id} />
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
                            <input type="email" className="form-control input-sm" name="company[email]" 
                                value={company.email}
                                onChange={this.onChangeCompanyEmail} required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Alamat Perusahaan</label>
                        <div className="col-sm-8">
                            <textarea className="form-control input-sm" row="5" name="company[address]"
                                value={company.address || ''}
                                onChange={this.onChangeCompanyAddress} required={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Jenis Perusahaan</label>
                        <div className="col-sm-8">
                            <LokerJawaBatamSelect
                                classNames="form-control input-sm" 
                                id="cities"
                                name="company[company_type_id]"
                                options={companyTypes}
                                selected={company.company_type.id} />
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
                                useOnChange={true}
                                selected={post.province_id} />
                        </div>
                        <label className="col-sm-2 control-label"> Kota</label>
                        <div className="col-sm-3">
                            <LokerJawaBatamSelect
                                classNames="form-control input-sm" 
                                id="cities"
                                name="post[city_id]"
                                options={cities}
                                selected={post.city_id}
                                useOnChange={true}
                                onChangeSelected={this.onChangeCitySelected} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Tanggal Expired :</label>
                        <div className="col-sm-8">
                            <input type="date" className="form-control" name="post[exp_date]" 
                                value={post.expired_date}
                                onChange={this.onChangeExpiredDate} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Sumber / Link :</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control input-sm" 
                                name="post[source_link]"
                                value={post.source_link}
                                onChange={this.onChangeSourceLink} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Kebutuhan :</label>
                    </div>
                    <Requirement requirements={requirements} />
                    <button type="button" className="btn btn-md btn-primary" onClick={this.onClickLokerSubmit}>Submit</button>
                    <input type="submit" id="button-submit-loker" className="hide" />
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
            if(isNewFormLoker){
                var formDisplay = <AdminFormLokerPost csrfToken={csrfToken} />
            }else{
                var formDisplay = <LokerPostingList csrfToken={csrfToken} />
            }
            
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
            categories: BlogStore.getCategories(),
            rawContent: BlogStore.getRawContent(),
            showModalConfirm: BlogStore.getShowModalConfirm()
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
            blog: BlogStore.getBlog(),
            rawContent: BlogStore.getRawContent(),
            showModalConfirm: BlogStore.getShowModalConfirm()
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
            attributes: { picture_url: url , removePicture: true }
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
    onClickSubmit: function(){
        let content = this.state.blog.content.getCurrentContent()
        let rawContent = JSON.stringify(convertToRaw(content))
        dispatcher.dispatch({
            actionType: "blog-change-raw-content",
            rawContent: rawContent
        })
        dispatcher.dispatch({
            actionType: 'blog-change-show-modal-confirm',
            showModalConfirm: true
        })
    },
    onClickYes: function(){
        this.onHideModalConfirm()
        $("#button-submit-artikel").click()
    },
    onClickNo: function(){
        this.onHideModalConfirm()
    },
    onHideModalConfirm: function(){
        dispatcher.dispatch({
            actionType: 'blog-change-show-modal-confirm',
            showModalConfirm: false
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
        let rawContent = this.state.rawContent
        let titleInputName = "blog[title]"
        let categoryIdInputName = "blog[category_id]"
        let sourceLinkInputName = "blog[source_link]"
        let rawContentInputName = "blog[raw_content]"
        let contentValue = this.state.blog.content
        let showModalConfirm = this.state.showModalConfirm

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
        console.log("raw content", rawContent)
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
                        <label className="col-sm-3 control-label"> Konten Artikel</label>
                        <div className="col-sm-8">
                            <LokerjawabatamEditor editMode={id ? true : false} />
                        </div>
                    </div>
                    <input type="hidden" name={rawContentInputName} value={rawContent} />
                    <button type="button" className="btn btn-md btn-primary" onClick={this.onClickSubmit}>Submit</button>
                    <button type="submit" id="button-submit-artikel" className="hide" />
                </form>
                <BlogPreview blogContent={contentValue} title={blogTitle} picture={pictureUrl} />
                <PromptModalConfirmation 
                    show={showModalConfirm}
                    onClickYes={this.onClickYes}
                    onClickNo={this.onClickNo} />
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
                    <div className="content">
                        <PreviewComponentEditor contentRaw={blogContent} />
                    </div>
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

        var item = function(item, key){
            return(
                <BlogPostingListItem item={item} csrfToken={that.props.csrfToken} />
            )
        }

        if(items.length > 0){
            var itemDisplay = <div>{items.map(item)}</div>
        }else{
            var itemDisplay = <div className="blank-posting">
                Tidak Ada Posting
            </div>
        }
         
        return(
            <div className="form-loker">
                <h3>Daftar Posting Artikel</h3>
                <hr />
                {itemDisplay}
            </div>
        )
    }
})

var LokerPostingList = React.createClass({
    getInitialState: function(){
        return{
            items: PostStore.getAdminLokerList()
        }
    },
    componentDidMount: function(){
        this.listener = PostStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function(){
        this.listener.remove()
    },
    _onChange: function(){
        this.setState({
            items: PostStore.getAdminLokerList()
        })
    },
    render: function(){
        let items = this.state.items
        var that = this

        var item = function(item, key){
            return(
                <LokerPostingListItem key={key} item={item} csrfToken={that.props.csrfToken} />
            )
        }

        if(items.length > 0){
            var itemDisplay = <div>{items.map(item)}</div>
        }else{
            var itemDisplay = <div className="blank-posting">Tidak Ada Posting</div>
        }

        return(
            <div className="form-loker">
                <h3>Daftar Posting Lowongan Kerja</h3>
                <hr />
                {itemDisplay}
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
                    blog: blog.blog
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
                AlertApp.displaySuccess("Posting Blog Berhasil Di Hapus!")
            },
            error: function(){
                AlertApp.displayError("Posting Blog Gagal di hapus!")
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


var LokerPostingListItem = React.createClass({
    onClickEditLoker: function(){
        let item = this.props.item

        $.ajax({
            url: "/admin/edit_loker",
            method: "GET",
            data: { id: item.id },
            beforeSend: function(){
                dispatcher.dispatch({
                    actionType: 'post-admin-item-change-requesting',
                    item: item,
                    attributes: {   requesting: {type: 'edit', status: true}},
                    requesting: true
                })
            },
            success: function(post){
                dispatcher.dispatch({
                    actionType: 'post-set-post-loker',
                    post: post
                })

                dispatcher.dispatch({
                    actionType: 'post-change-is-new-form-loker',
                    isNewFormLoker: true
                })
            },
            error: function(){
                console.log("error coy!");
            }
        }).always(function(){
            dispatcher.dispatch({
                actionType: 'post-admin-item-change-requesting',
                item: item,
                attributes: {requesting: {type: 'edit', status: false}},
                requesting: false
            })
        })
    },
    onClickDeleteLoker: function(){
        let item = this.props.item
        let csrfToken = this.props.csrfToken

        $.ajax({
            url: "/admin/delete_loker",
            method: "DELETE",
            data: { id: item.id, _token: csrfToken},
            beforeSend: function(){
                dispatcher.dispatch({
                    actionType: 'post-admin-item-change-requesting',
                    item: item,
                    attributes: {requesting: {type: 'delete', status: true}},
                    requesting: true
                })
            },
            success: function(loker){
                dispatcher.dispatch({
                    actionType: 'post-admin-delete-loker',
                    item: item
                })
                AlertApp.displaySuccess("Posting Loker Berhasil Di Hapus!")
            },
            error: function(){
                AlertApp.displayError("Posting Loker Gagal Di Hapus!")
            }
        }).always(function(){
            dispatcher.dispatch({
                actionType: 'post-admin-item-change-requesting',
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
                        {item.company.name}    
                    </div>
                    <div className="col-sm-4 text-right">
                        <button key={keygen.getUniqueKey()} className="btn-warning btn-xs" onClick={this.onClickEditLoker}><i className="fa fa-check" /> Edit</button>
                        <button key={keygen.getUniqueKey()} className="btn-danger btn-xs" onClick={this.onClickDeleteLoker}><i className="fa fa-times" /> Hapus</button>
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
    onClickForm: function(){
        dispatcher.dispatch({actionType: 'post-reset-admin-post'
        })

        dispatcher.dispatch({
            actionType: 'post-change-is-new-form-loker',
            isNewFormLoker: true
        })
    },
    onClickPosting: function(){
        dispatcher.dispatch({
            actionType: 'post-change-is-new-form-loker',
            isNewFormLoker: false
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

window.BlogForm = BlogForm
window.AdminPage = AdminPage