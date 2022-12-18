import styled from 'styled-components';

interface ColumnProps {
  align?: String;
  justify?: String;
  gap?: String;
}

const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(p: any) => p.align};
  justify-content: ${(p: any) => p.justify};
  gap: ${(p: any) => p.gap}; ;
`;

export default Column;
