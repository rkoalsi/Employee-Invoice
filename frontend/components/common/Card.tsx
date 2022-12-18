import styled from 'styled-components';
import colors from '../../constants';

interface CardProps {
  align?: String;
  justify?: String;
}

const Card = styled.div<CardProps>`
  padding: 16px;
  background: ${colors.blue};
  border-radius: 16px;
  display: flex;
  align-items: ${(p: any) => p.align ?? 'center'};
  justify-content: ${(p: any) => p.justify ?? 'center'};
`;

export default Card;
