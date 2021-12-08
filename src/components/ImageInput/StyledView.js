import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  width: ${Dimensions.get('window').width - 100}px;
  height: 40px;
  margin: 10px;
`;

export default StyledView;
