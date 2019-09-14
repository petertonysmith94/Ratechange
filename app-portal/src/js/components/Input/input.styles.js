import styled from 'styled-components';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: ${ ({ margin }) => margin }
`;

export const Field = styled.input`
  width: 100%;
`;