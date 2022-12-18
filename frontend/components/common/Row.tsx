import styled from 'styled-components';

interface RowProps {
  align?: String;
  justify?: String;
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  align-items: ${(p: any) => p.align};
  justify-content: ${(p: any) => p.justify};
`;

export default Row;
