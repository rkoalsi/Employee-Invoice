import styled from 'styled-components';
import colors from '../../constants';

interface LabelProps {
  align?: String;
  justify?: String;
  mb?: String;
  fontSize?: String;
}

const Label = styled.label<LabelProps>`
  font-size: ${(p: any) => p.fontSize ?? '16px'};
  color: ${(p: any) => p.color ?? colors.black};
  align-items: ${(p: any) => p.align};
  justify-content: ${(p: any) => p.justify};
  margin-bottom: ${(p: any) => p.mb};
  font-family: 'Poppins', sans-serif;
`;

export default Label;
