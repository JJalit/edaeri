import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const StyledButton = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width - 150}px;
  height: 40px;

  background-color: #ffffff;

  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export default StyledButton;
