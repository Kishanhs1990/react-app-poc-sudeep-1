import React from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

class CodeEditor extends React.PureComponent {
  render() {
    const {
      id,
      onChangeFunc = () => {},
      data = '',
      mode = 'javascript',
      readOnly = false,
    } = this.props;
    return (
      <AceEditor
        debounceChangePeriod={1000}
        className="code-editor"
        mode={mode}
        theme="monokai"
        name={id}
        onChange={onChangeFunc}
        setOptions={{ useWorker: false }}
        width="100% !important"
        height="40vh"
        value={data}
        readOnly={readOnly}
        wrapEnabled
      />
    );
  }
}

export default CodeEditor;
