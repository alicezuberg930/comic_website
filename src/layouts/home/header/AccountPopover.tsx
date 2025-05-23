import { useState } from 'react';
import { useRouter } from 'next/navigation';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '@/routes/paths';
// auth
// import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '@/components/custom-avatar';
import { useSnackbar } from '@/components/snackbar';
import MenuPopover from '@/components/menu-popover';
import { IconButtonAnimate } from '@/components/animate';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: "PATH_DASHBOARD.user.profile",
  },
  {
    label: 'Settings',
    linkTo: "PATH_DASHBOARD.user.account",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useRouter();

  const user = {
    photoURL: 'https://cdn.aibooru.download/sample/ff/5d/__rem_re_zero_kara_hajimeru_isekai_seikatsu_generated_by_jery_ai__sample-ff5dd57131096fb35ca9c37667cfaa85.jpg',
    name: 'Tien nguyen',
    email: 'tien223431@gmail.com'
  }

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    // try {
    // logout();
    // navigate.push(PATH_AUTH.login, {});
    // handleClosePopover();
    // } catch (error) {
    //   console.error(error);
    //   enqueueSnackbar('Unable to logout!', { variant: 'error' });
    // }
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    navigate.push(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar alt={user?.name} src={user.photoURL} />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Đăng xuất
        </MenuItem>
      </MenuPopover>
    </>
  );
}
