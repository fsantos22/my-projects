import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: grid;
  grid-template-columns: 25% 65% 10%;
  align-items: center;
  justify-content: space-between;

  progress {
    height: 1.8rem;
    margin: 0 5px;
    width: 75%;
    margin-left: 20%;
  }

  span, p {
    font-weight: bold;
  }
`;

export const ProgressBar = (props) => {
  const { value, label, max } = props;
  return (
    <Bar>
      <p>{label}</p>
      <progress value={value} data-label={value} max="100" />
      <span>{value}</span>
    </Bar>
  );
};
