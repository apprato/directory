/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import documentEditor from '../../modules/document-editor.js';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
//import 'froala-editor/css/plugins/code_beautifier.min.css';


// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
// Render Froala Editor component.


export default class DocumentEditor extends React.Component {


  handleModelChange(model) {
    this.description.model = model;
  }


  /* Education Modal */
  constructor(props) {

    super(props);
    const component = this;

    // Bind events
    this.handleModelChange = this.handleModelChange.bind(this);
    this.description = {
      model: ''
    };
    this.config = {
      charCounterCount: true,
      codeBeautifierOptions: {
        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 4,
        wrap_line_length: 0
      },
      fontFamily: {
        //'Arial,Helvetica,sans-serif': 'Font 1',
        //'Impact,Charcoal,sans-serif': 'Font 2',
      },
      blockTags: {
        n: 'Normal',
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3'
      },
      toolbarButtons: [
        'bold', 'italic', 'underline', 'paragraphFormat', 'formatOL',
        'formatUL', 'insertHTML', 'undo', 'redo', 'html'
      ]
    }
  }


  componentDidMount() {
    documentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  render() {
    const { doc } = this.props;

    return (<form
      ref={ form => (this.documentEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ doc && doc.title }
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <FroalaEditor
          className="body"
          componentClass="textarea"
          type="textarea"
          ref="body"
          name="body"
          placeholder=""
          tag='textarea'
          model={doc.body}
          onModelChange={this.handleModelChange}
          config={this.config}
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { doc && doc._id ? 'Save Changes' : 'Add Document' }
      </Button>
    </form>);
  }
}

DocumentEditor.propTypes = {
  doc: React.PropTypes.object,
};
