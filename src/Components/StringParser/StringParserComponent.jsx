import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import CodeEditorComponent from '../CodeEditor/CodeEditorComponent';
import { StringParserActions } from '../../Store/Actions';

const mapStateToProps = (state) => ({
  parser: state.parser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...StringParserActions }, dispatch),
});

class StringParserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Parse',
      accumulator: 'and',
      input: '',
    };
  }

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  onInputChange = (newValue) => {
    const { input } = this.state;
    if (newValue && newValue !== input && newValue.length !== 0) {
      this.setState({
        input: newValue,
      });
    }
  };

  handleClick = async () => {
    const { input, accumulator } = this.state;
    const { actions } = this.props;
    this.setState({
      buttonText: 'Parsing..',
    });
    await this.sleep(1000);
    actions.parseToJSON(input, accumulator);
    this.setState({ buttonText: 'Parse' });
  };

  render() {
    const { input, buttonText } = this.state;
    const {
      parser: { error: parserError, parsedResultJSON },
    } = this.props;

    return (
      <>
        <div className="box">
          <div className="title-box">Custom parser to convert String to JSON</div>
          <div className="box-content">
            <div className="items-box noselect">
              <div className="half-column half-one">
                <div className="title-box heading">String goes here!</div>
                <CodeEditorComponent
                  id="input"
                  validate={false}
                  onChangeFunc={this.onInputChange}
                  data={input}
                />
              </div>
              <div className="half-column half-two">
                <div className="title-box heading">JSON response here!</div>
                <CodeEditorComponent id="output" data={parsedResultJSON} readOnly />
              </div>
              <div className="buttons-box button-column">
                <button type="button" onClick={() => this.handleClick()}>
                  {buttonText}
                </button>
                <Link to="/">Back</Link>
              </div>
            </div>
            {parserError.length > 0 && (
              <div className="error-box">
                <p>{parserError}</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StringParserComponent));
