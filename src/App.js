import React from "react";
import axios from "axios";
import styled from "styled-components";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      preparation_time: "",
      data_to_post: "",
      no_of_slices: "",
      diameter: "",
      spiciness_scale: "",
      slices_of_bread: "",
    };
  }

  handleType = (event) => {
    this.setState({ type: event.target.value });
  };

  handleName = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePreparationTime = (event) => {
    this.setState({ preparation_time: event.target.value });
  };

  handleNoOfSlices = (event) => {
    this.setState({ no_of_slices: event.target.value });
  };

  handleDiameter = (event) => {
    this.setState({ diameter: event.target.value });
  };

  handleSpicinessScale = (event) => {
    this.setState({ spiciness_scale: event.target.value });
  };

  handleSlicesOfBread = (event) => {
    this.setState({ slices_of_bread: event.target.value });
  };

  sendPostRequest = (e) => {
    e.preventDefault();
    let res = axios
      .post(
        "https://frosty-wood-6558.getsandbox.com:443/dishes",
        this.state.data_to_post
      )
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  prepareDataAndSend = (e) => {
    if (this.state.type === "pizza") {
      this.setState(
        {
          data_to_post: {
            name: this.state.name,
            preparation_time: this.state.preparation_time,
            type: this.state.type,
            no_of_slices: parseInt(this.state.no_of_slices, 10),
            diameter: parseFloat(this.state.diameter),
          },
        },
        () => {
          console.log(this.state.data_to_post);
          this.sendPostRequest(e);
        }
      );
    } else if (this.state.type === "soup") {
      this.setState(
        {
          data_to_post: {
            name: this.state.name,
            preparation_time: this.state.preparation_time,
            type: this.state.type,
            spiciness_scale: parseInt(this.state.spiciness_scale, 10),
          },
        },
        () => {
          this.sendPostRequest(e);
        }
      );
    } else if (this.state.type === "sandwich") {
      this.setState(
        {
          data_to_post: {
            name: this.state.name,
            preparation_time: this.state.preparation_time,
            type: this.state.type,
            slices_of_bread: parseInt(this.state.slices_of_bread, 10),
          },
        },
        () => {
          this.sendPostRequest(e);
        }
      );
    }
    return 0;
  };

  render() {
    return (
      <form>
        <FormContainer className="form-container">
          <StyledH>Form </StyledH>
          <InputContainer>
            <StyledP>Name</StyledP>
            <StyledTextArea
              value={this.state.name}
              onChange={this.handleName}
            />
          </InputContainer>
          <InputContainer>
            <StyledP>Preparation time</StyledP>
            <StyledInput
              type="time"
              step="1"
              min="00:00:00"
              max="20:00:00"
              value={this.state.preparation_time}
              onChange={this.handlePreparationTime}
            />
          </InputContainer>
          <InputContainer>
            <StyledP>Select</StyledP>
            <StyledSelect value={this.state.type} onChange={this.handleType}>
              <option value="" disabled hidden></option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </StyledSelect>
          </InputContainer>

          {this.state.type === "pizza" ? (
            <InputContainer>
              <InputPosition>
                <StyledP>No of slices</StyledP>
                <StyledInput
                  type="number"
                  min="1"
                  onChange={this.handleNoOfSlices}
                />
              </InputPosition>
              <InputPosition>
                <StyledP>Diameter </StyledP>
                <StyledInput
                  type="number"
                  step="0.1"
                  onChange={this.handleDiameter}
                />
              </InputPosition>
            </InputContainer>
          ) : null}
          {this.state.type === "soup" ? (
            <InputContainer>
              <InputPosition>
                <StyledP>Spiciness scale </StyledP>
                <StyledInput
                  type="number"
                  min="1"
                  max="10"
                  onChange={this.handleSpicinessScale}
                />
              </InputPosition>
            </InputContainer>
          ) : null}
          {this.state.type === "sandwich" ? (
            <InputContainer>
              <InputPosition>
                <StyledP>Slices of bread </StyledP>
                <StyledInput
                  id="number"
                  type="number"
                  onChange={this.handleSlicesOfBread}
                />
              </InputPosition>
            </InputContainer>
          ) : null}
          <ButtonContainer>
            <StyledButton onClick={this.prepareDataAndSend}>Send</StyledButton>
          </ButtonContainer>
        </FormContainer>
      </form>
    );
  }
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  border: 1px solid black;
  margin: 50px auto;
  padding: 20px;
  background: #1c1c1c;
`;

const InputContainer = styled.div`
  display: block;
  width: 500px;
  margin-bottom: 20px;
  border-top: 1px solid #262626;
`;

const StyledInput = styled.input`
  width: 100px;
  height: 15px;
  background: #262626;
  color: #ffffff;
`;

const StyledSelect = styled.select`
  width: 100px;
  background: #262626;
  color: #ffffff;
`;

const StyledTextArea = styled.textarea`
  width: 100px;
  height: 15px;
  background: #262626;
  color: #ffffff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;
const StyledButton = styled.button`
  width 100px;
  background: #CC0000;
  border-bottom: 1px double #660000;
  border-top: 1px double #660000;
  border-left: 1px double #FF0033;
  border-right: 1px double #FF0033;
  color: #ffffff;
`;

const InputPosition = styled.div`
  display: block;
  margin-bottom: 20px;
  border-top: 1px solid #262626;
`;

const StyledP = styled.p`
  color: #bbbbbb;
`;

const StyledH = styled.h1`
  color: #bbbbbb;
`;
