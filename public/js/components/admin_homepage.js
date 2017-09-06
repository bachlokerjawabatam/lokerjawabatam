var PropTypes = React.PropTypes

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
                    <textarea name={workDescriptionInputName} className="form-control input-sm" rows="3" required={true}  />
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
    onClickRemove:function(){
        let item = this.props.item

        dispatcher.dispatch({
            actionType: 'post-remove-requirement',
            key: item.key 
        })
    },
    render: function(){
        let key = this.props.inputKey
        let item = this.props.item
        let workDescriptions = item.workDescriptions
        let educationLevelTypes = this.props.educationLevelTypes
        let prefixName = this.props.inputName + "[" +  key  + "]"
        let positionInputName = prefixName + "[position_name]"
        let positionIdInputName = prefixName + "[position_id]"
        let ageMinInputName = prefixName + "[age_min]"
        let ageMaxInputName = prefixName + "[age_max]"
        let educationLevelIdInputName = prefixName + "[education_level_id]"
        let descriptionInputName = prefixName + "[description]"
        let salaryInputName = prefixName + "[salary]"
        let workDescriptionInputName = prefixName + "[work_description]"
        let removeIconStyle = {fontSize: "18px", cursor: "pointer"}

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
                        <input type="number" step="50000" name={salaryInputName} className="form-control input-sm" />
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
                    <label className="col-sm-2">Keterangan :</label>
                    <div className="col-sm-6">
                        <textarea name={descriptionInputName} className="form-control input-sm" rows="8" required={true} />
                    </div>
                </div>
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
        let inputName = "requirements"
        let i = 0
        
        return (
            <div>
                {
                    requirements.map(function(item, key) {
                           return(
                            <ItemRequirement key={item.key} item={item} inputKey={key}
                                educationLevelTypes={educationLevelTypes} inputName={inputName} />
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
    onClickLogout: function(){
        window.location = '/admin/logout'
    },
    render: function(){
    	let iconStyle = {margin: "5px 20px 0px 0px", fontSize: "18px"}
        return(
            <div className="navbar-menu">
                <div className="menu-option">
                    <i style={iconStyle} className="fa fa-user" />
                        Posting Loker
                </div>
                <div className="menu-option">
                    <i style={iconStyle} className="fa fa-user" />
                        Posting blog
                </div>
                <div className="menu-option" onClick={this.onClickLogout}>
                    <i style={iconStyle} className="fa fa-user" />
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
        var listener = PostStore.addChangeListener(this._onChange)
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
    render: function(){
        let post = this.state.post
        let provinces = this.state.provinces
        let cities = this.state.cities
        let companyTypes = this.state.companyTypes
        let provinceSelected = this.state.provinceSelected
        let csrfToken = this.props.csrfToken
        let requirements = post.requirements

        return(
            <div className="form-loker">
                <h3>Form lowongan Kerja</h3>
                <hr/>  
                <form className="form-horizontal" method="POST" action="/admin/post_loker">
                    <input type="hidden" name="_token" value={csrfToken} />
                    <div className="form-group">
                        <label className="col-sm-3 control-label"> Nama Perusahaan</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control input-sm" name="company[name]" required={true} />
                            <input type="hidden" name="post[company_id]" value="" />
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
    render: function(){
        let csrfToken = this.props.csrfToken

        return(
            <div className="admin-page text-center">
                <div className="header">
                    <div className="title">
                        Lokerjawabatam.com
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-2">
                        <AdminNavbarMenu />
                    </div>
                    <div className="col-lg-9 col-md-10 col-sm-10">
                        <AdminFormLokerPost csrfToken={csrfToken} />
                    </div>
                </div>
            </div>
        )
    }
});

window.AdminPage = AdminPage