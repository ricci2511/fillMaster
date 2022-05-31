import { useState, KeyboardEvent, MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { Drawer } from '@mui/material';
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
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <MenuIcon onClick={toggleDrawer('right', true)} />
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        PaperProps={{
          sx: { width: '80%' },
        }}
      >
        <Box>
          <MenuTabs />
          <Divider />
          <List>Other stuff...</List>
        </Box>
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
