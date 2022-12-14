import * as React from "react";
import styled from "styled-components";

interface IProps {
  onClick: () => void;
  type: "primary" | "secondary";
}

export const Button: React.FC<IProps> = (props) => {
  const { onClick, type = "primary" } = props;

  return <StyledButton onClick={onClick}></StyledButton>;
};

const StyledButton = styled.button<{ IProps }>`
  width: 8rem;
  height: 3rem;

  background-color: ${(props) => {
    if (props.type === "primary") {
      return "#22333B";
    } else {
      return "white";
    }
  }};
`;
