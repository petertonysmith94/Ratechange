import styled from 'styled-components';

export const TabWrapper = styled.div`
  border: 0;
  display: flex;

  &:focus {
    outline: 0;
  }
`;

export const TabButton = styled.div`
  appearance: none;
  border: 0;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 15px 30px;
  position: relative;
  border-radius: 5px 5px 0 0;
  cursor: pointer;

  ${ (props) => {
    if (props['aria-selected']) {
      return `
        box-shadow: 0px -1px 1px 0px #f1f1f1;
        background-color: #f0f0f0;
      `;
    }
    return '';
  } }

  &:focus {
    box-shadow: 0px -2px 2px 0px #f0f0f0;
  }

  &:active {
    top: 1px;
  }
`;

export const Pane = styled.div`
  padding: 30px;
  background-color: #f0f0f0;
  border-radius: 0 0 5px 5px;
  box-shadow: 1px 2px 1px 0px #f1f1f1;
`;