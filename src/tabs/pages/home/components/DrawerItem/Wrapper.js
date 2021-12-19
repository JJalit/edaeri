import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #fff;

  width: 100%;
  padding: 24px 16px;
  border: ${props => (props.item ? '1px solid #f8f9fa' : 'none')};
`;

export default Wrapper;
