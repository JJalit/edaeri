import styled from 'styled-components/native';

const ImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 84px;
  height: 84px;
  margin: 8px 10px;

  background: #fff;
  box-shadow: 0 1px 5px rgba(15, 32, 91, 0.15);
  border: ${props => (props.active ? '1px solid  #828cf4' : '0.5px solid rgba(0, 0, 0, 0.13)')};
`;

export default ImageWrapper;
