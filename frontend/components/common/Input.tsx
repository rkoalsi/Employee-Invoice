import styled from 'styled-components';
import colors from '../../constants';

interface InputProps {
  colors?: String;
}
const Input = styled.input<InputProps>`
  color: ${(p: any) => p.color ?? colors.black};
  height: 25px;
  width: 300px;
  border-radius: 8px;
`;

export default Input;
