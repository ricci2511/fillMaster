import { useState, KeyboardEvent, MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { SwipeableDrawer } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuTabs from './MenuTabs';

type Anchor = 'right';

const TemporaryDrawer = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <>
      <MenuIcon onClick={toggleDrawer('right', true)} />
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
        PaperProps={{
          sx: { width: '80%' },
        }}
      >
        <Box>
          <MenuTabs />
          <Divider />
          <List>Other stuff...</List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default TemporaryDrawer;
