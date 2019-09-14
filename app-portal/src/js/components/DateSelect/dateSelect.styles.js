import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: ${ ({ margin }) => margin }
`;

export const Field = styled(DatePicker)`

`;