import { useState, memo, useEffect } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useRouter, } from 'next/navigation';
import { usePathname } from 'next/navigation';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Slide,
  Popper,
  InputBase,
  PopperProps,
  Autocomplete,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material';
// utils
import { bgBlur } from '@/utils/cssStyles';
import flattenArray from '@/utils/flattenArray';
// components
import Iconify from '@/components/iconify';
import { NavListProps } from '@/components/nav-section';
import { IconButtonAnimate } from '@/components/animate';
import SearchNotFound from '@/components/search-not-found';
//
import NavConfig from '../nav/config-navigation';

// ----------------------------------------------------------------------                                                                                                                 

const APPBAR_MOBILE = 32;
const APPBAR_DESKTOP = 46;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.paper }),
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  borderRadius: '12px',
  padding: theme.spacing(0, 2),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 2),
  },
}));

const StyledPopper = styled((props: PopperProps) => <Popper {...props} />)(({ theme }) => ({
  left: `8px !important`,
  top: `${APPBAR_MOBILE + 8}px !important`,
  width: 'calc(100% - 16px) !important',
  transform: 'none !important',
  [theme.breakpoints.up('md')]: {
    top: `${APPBAR_DESKTOP + 8}px !important`,
  },
  '& .MuiAutocomplete-paper': {
    padding: theme.spacing(1, 0),
  },
  '& .MuiListSubheader-root': {
    '&.MuiAutocomplete-groupLabel': {
      ...bgBlur({ color: theme.palette.background.default }),
      ...theme.typography.overline,
      top: 0,
      margin: 0,
      lineHeight: '48px',
      borderRadius: theme.shape.borderRadius,
    },
  },
  '& .MuiAutocomplete-listbox': {
    '& .MuiAutocomplete-option': {
      padding: theme.spacing(0.5, 2),
      margin: 0,
      display: 'block',
      border: `dashed 1px transparent`,
      // borderBottomColor: theme.palette.divider,
      '&:last-of-type': {
        borderBottomColor: 'transparent',
      },
      '&:hover': {
        // borderColor: theme.palette.primary.main,
        // backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      },
    },
  },
}));

// ----------------------------------------------------------------------

interface Option extends NavListProps {
  subheader: string;
}

function Searchbar() {
  const navigate = useRouter();

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const reduceItems = NavConfig.map((list) =>
    handleLoop(list.items, (list as any).subheader)
  ).flat();

  const allItems = flattenArray(reduceItems).map((option: any) => {
    const group = splitPath(reduceItems, option.path);

    return {
      group: group && group.length > 1 ? group[0] : (option as Option).subheader,
      title: option.title,
      path: option.path,
      indexKey: 'minimal',
    };
  });

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (path: string) => {
    if (path.includes('http')) {
      window.open(path);
    } else {
      navigate.push(path);
    }
    handleClose();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

  return (
    // <ClickAwayListener onClickAway={handleClose}>
    //   <div>
    //     {/* {!open && (
    //       <IconButtonAnimate onClick={handleOpen}>
    //         <Iconify icon="eva:search-fill" />
    //       </IconButtonAnimate>
    //     )} */}

    //     <Slide direction="down" in={open} mountOnEnter unmountOnExit>

    //     </Slide>
    //   </div>
    // </ClickAwayListener>
    <StyledSearchbar>
      <Autocomplete
        sx={{ width: 1, height: 1 }}
        autoHighlight
        disablePortal
        disableClearable
        popupIcon={null}
        slots={{ popper: StyledPopper }}
        onInputChange={(e, value) => setSearchQuery(value)}
        noOptionsText={<SearchNotFound query={searchQuery} sx={{ py: 10 }} />}
        options={allItems.sort((a: any, b: any) => -b.group.localeCompare(a.group))}
        groupBy={(option: any) => option.group}
        getOptionLabel={(option) => `${option.title} ${option.path} ${option.indexKey}`}
        renderInput={(params) => (
          <InputBase
            {...params.InputProps}
            inputProps={params.inputProps}
            fullWidth
            autoFocus
            placeholder="Search..."
            onKeyUp={handleKeyUp}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ height: 1, typography: 'h6' }}
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const { title, path } = option;

          const partsTitle = parse(title, match(title, inputValue));

          const partsPath = parse(path, match(path, inputValue));

          return (
            <Box component="li" {...props} onClick={() => handleClick(path)}>
              <div>
                {partsTitle.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      typography: 'subtitle2',
                      textTransform: 'capitalize',
                      color: part.highlight ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
              </div>

              <div>
                {partsPath.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      typography: 'caption',
                      color: part.highlight ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
              </div>
            </Box>
          );
        }}
      />
    </StyledSearchbar>
  );
}

export default memo(Searchbar);

// ----------------------------------------------------------------------

type ItemProps = {
  path: string[];
  currItem: NavListProps;
};

function splitPath(array: NavListProps[], key: string) {
  let stack = array.map((item) => ({
    path: [item.title],
    currItem: item,
  }));

  while (stack.length) {
    const { path, currItem } = stack.pop() as ItemProps;

    if (currItem.path === key) {
      return path;
    }

    if (currItem.children?.length) {
      stack = stack.concat(
        currItem.children.map((item: NavListProps) => ({
          path: path.concat(item.title),
          currItem: item,
        }))
      );
    }
  }
  return null;
}

// ----------------------------------------------------------------------

function handleLoop(array: any, subheader?: string) {
  return array?.map((list: any) => ({
    subheader,
    ...list,
    ...(list.children && {
      children: handleLoop(list.children, subheader),
    }),
  }));
}
