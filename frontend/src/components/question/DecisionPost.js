import React, { Component } from "react";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class DecisionPost extends Component {
  constructor(props) {
    // console.log("props", props);
    super(props);
    this.state = {
      answersArray: [],
      newAnswer: "",
      decisionCode: this.props.decisionCode,
      jwtToken: localStorage.getItem("token")
    };
  }

  // auto load answers from database
  componentDidMount() {
    const decisionCode = this.state.decisionCode;
    console.log("state", this.state);
    const headers = {
      Authorization: this.state.jwtToken
    };
    axios
      .get(`${ROOT_URL}/api/decision/${decisionCode}`, { headers })
      .then(res => {
        // console.log("GET res.data", res.data);
        this.setState({
          // decision: res.data[0].decisionText,
          answersArray: res.data[0].answers.map(x => x.answerText)
        });
      })

      .catch(error => {
        // console.log("erorr", error.response.data.error);
        this.setState({ decision: error.response.data.error });
      });
    // console.log("answersArray,", this.state.answersArray);
  }

  handleAnswerInput = e => {
    e.preventDefault();
    this.setState({ newAnswer: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const decisionCode = this.state.decisionCode;
    const answersObject = { answer: this.state.newAnswer };
    // const newAnswersArray = this.state.answersArray;
    // newAnswersArray.push(answersObject);
    this.setState({
      newAnswer: ""
    });

    // use decisionCode to save answers in the database
    axios
      .put(`${ROOT_URL}/api/decision/${decisionCode}/answer`, answersObject)
      .then(res => {
        this.setState({
          answersArray: res.data.answers.map(x => x.answerText)
        });
        console.log("res.data put", res.data);
      })
      .catch(error => {
        console.log("error.response", error.response);
      });
  };

  render() {
    // console.log("this.props", this.props);
    // console.log("this.state", this.state);
    const answersArray = this.state.answersArray.length;
    return (
      <div className="post-container">
        <div className="answers-container">
          {answersArray !== 0 ? (
            <div>
              {this.state.answersArray.map((answers, i) => (
                <div className="answer-container" key={i}>
                  <div className="answer-text">{answers}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-answer">Suggest an answer</div>
          )}
          {/* {answersArray === 0 ? (
            <div className="no-answer">Suggest an answer</div>
          ) : (
            <div>
              {this.state.answersArray.map((answers, i) => (
                <div className="answer-container" key={i}>
                  <div className="answer-text">{answers}</div>
                </div>
              ))}
            </div>
          )} */}
        </div>
        <div className="hr-decisions " />
        <div className="answer-form-container">
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              className="answer-input"
              placeholder="Suggest an answer..."
              value={this.state.newAnswer}
              onChange={this.handleAnswerInput}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default DecisionPost;
