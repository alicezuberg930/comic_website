import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// config 
import { NAV } from '@/utils/config-global';
// components
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';
import { NavSectionVertical } from '@/components/nav-section';
//
import navConfig from './config-navigation';
import NavAccount from './NavAccount';
import NavToggleButton from './NavToggleButton';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Logo />

        <NavAccount />
      </Stack>

      <NavSectionVertical data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box component="nav">
      {/* <NavToggleButton /> */}

      <Drawer
        open={openNav}
        onClose={onCloseNav}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          paper: {
            sx: {
              width: NAV.W_DASHBOARD,
            }
          }
        }}
      >
        {renderContent}
      </Drawer>

      {/* {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          slotProps={{
            paper: {
              sx: {
                width: NAV.W_DASHBOARD,
              }
            }
          }}
        >
          {renderContent}
        </Drawer>
      )} */}
    </Box>
  );
}
