import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export const StyledChip = styled(Chip)({
    backgroundColor: 'var(--accent-primary)',
    color: 'var(--text-primary)',
    minWidth: '50px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
});

export const StyledStack = styled(Stack)({
    flexWrap: 'wrap',
});
