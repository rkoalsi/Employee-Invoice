import styled from 'styled-components';
import colors from '../../constants';

interface ButtonProps {
  align?: String;
  justify?: String;
  mb?: String;
  fontSize?: String;
}
const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: ${(p: any) => p.align ?? 'center'};
  justify-content: ${(p: any) => p.justify ?? 'center'};
  font-family: Poppins, sans-serif;
  font-size: ${(p: any) => p.fontSize ?? '16px'};
  background: ${colors.purple};
  border-radius: 16px;
  color: ${(p: any) => p.color ?? colors.black};
  margin-top: ${(p: any) => p.mt};
  margin-left: ${(p: any) => p.ml};
  margin-bottom: ${(p: any) => p.mb};
  margin-right: ${(p: any) => p.mr};
  border: none;
`;
export default Button;
