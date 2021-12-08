import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const LogoImage = styled.Image`
  height: 150px;
  width: ${Dimensions.get('window').width - 100}px;
`;

export default LogoImage;
