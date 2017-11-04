'use strict';
      const {Editor, EditorState, convertFromRaw, RichUtils} = Draft;

      class LokerjawabatamEditor extends React.Component {
        constructor(props) {
          super(props);
          var content = BlogStore.getBlog().content;
          if (this.props.editMode && content.substr(0, 1) == '{' ){
            var contentState = convertFromRaw(JSON.parse(content));  
            this.state = {editorState: EditorState.createWithContent(contentState)};
          }else{
            this.state = {editorState: EditorState.createEmpty()};
          }
          this.focus = () => this.refs.editor.focus();
          this.onChange = (editorState) => this._onChangeEditor(editorState); 
          this.handleKeyCommand = this._handleKeyCommand.bind(this);
          this.onTab = this._onTab.bind(this);
          this.toggleBlockType = this._toggleBlockType.bind(this);
          this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        }
        _onChangeEditor(editorState){
          this.setState({editorState})
          dispatcher.dispatch({
              actionType: 'blog-change',
              attributes: { content: editorState }
          })
        }
        _handleKeyCommand(command, editorState) {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return true;
          }
          return false;
        }
        _onTab(e) {
          const maxDepth = 6;
          this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
        }
        _toggleBlockType(blockType) {
          this.onChange(
            RichUtils.toggleBlockType(
              this.state.editorState,
              blockType
            )
          );
        }
        _toggleInlineStyle(inlineStyle) {
          this.onChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
          );
        }
        render() {
          const {editorState} = this.state;
          // If the user changes block type before entering any text, we can
          // either style the placeholder or hide it. Let's just hide it now.
          let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }
          return (
            <div className="RichEditor-root">
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <hr />
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  onTab={this.onTab}
                  placeholder="Silahkan Ketik di sini...."
                  ref="editor"
                  spellCheck={true}
                />
              </div>
            </div>
          );
        }
      }
      // Custom overrides for "code" style.
      const styleMap = {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
      };
      function getBlockStyle(block) {
        switch (block.getType()) {
          case 'blockquote': return 'RichEditor-blockquote';
          default: return null;
        }
      }
      class StyleButton extends React.Component {
        constructor() {
          super();
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
          };
        }
        render() {
          let className = 'btn btn-sm btn-default RichEditor-styleButton';
          if (this.props.active) {
            className = 'btn btn-sm btn-success RichEditor-styleButton'
            className += ' RichEditor-activeButton';
          }
         
          var iconStyle = {fontSize: '14px'}
          var buttonStyle = {marginRight: '3px', marginBottom: '3px', padding: '8px', minWidth: '40px'}

          if(this.props.iconName){
            var labelDisplay = <i style={iconStyle} className={this.props.iconName} />
          }else{
            var labelDisplay = this.props.label
          }

          return (
            <button type="button" style={buttonStyle} className={className} onMouseDown={this.onToggle}>
              {labelDisplay}
            </button>
          );
        }
      }
      const BLOCK_TYPES = [
        {label: 'H1', style: 'header-one', iconName: null},
        {label: 'H2', style: 'header-two', iconName: null},
        {label: 'H3', style: 'header-three', iconName: null},
        {label: 'H4', style: 'header-four', iconName: null},
        {label: 'H5', style: 'header-five', iconName: null},
        {label: 'H6', style: 'header-six', iconName: null},
        {label: 'Blockquote', style: 'blockquote', iconName: null},
        {label: 'UL', style: 'unordered-list-item', iconName: 'fa fa-list-ul'},
        {label: 'OL', style: 'ordered-list-item', iconName: 'fa fa-list-ol'},
        {label: 'Code Block', style: 'code-block', iconName: null},
      ];
      const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
        return (
          <div className="RichEditor-controls text-left">
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                iconName={type.iconName}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
        );
      };
      var INLINE_STYLES = [
        {label: 'Bold', style: 'BOLD', iconName:'fa fa-bold'},
        {label: 'Italic', style: 'ITALIC', iconName:'fa fa-italic'},
        {label: 'Underline', style: 'UNDERLINE', iconName:'fa fa-underline'},
        {label: 'Monospace', style: 'CODE', iconName: null},
      ];
      const InlineStyleControls = (props) => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className="RichEditor-controls text-left">
            {INLINE_STYLES.map(type =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                iconName={type.iconName}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
        );
      };


window.LokerjawabatamEditor = LokerjawabatamEditor