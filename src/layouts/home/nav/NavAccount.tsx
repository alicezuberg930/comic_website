import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// auth
// import { useAuthContext } from '@/auth/useAuthContext';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// components
import { CustomAvatar } from '@/components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const user = {
    photoURL: 'https://cdn.aibooru.download/sample/ff/5d/__rem_re_zero_kara_hajimeru_isekai_seikatsu_generated_by_jery_ai__sample-ff5dd57131096fb35ca9c37667cfaa85.jpg',
    displayName: 'VInh Tien',
    role: 'user'
  }

  return (
    <Link component={NextLink} href={'/'} underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar alt={user.displayName} name={user.displayName} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user.role}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
