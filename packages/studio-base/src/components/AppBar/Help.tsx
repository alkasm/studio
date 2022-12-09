// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Divider,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  IconButton,
  IconButtonProps,
} from "@mui/material";
// import Link from "next/link";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  subheader: {
    bgcolor: "transparent",
    border: "none",
  },
  paper: {
    width: 280,
  },
  menuItem: {
    gap: theme.spacing(1),
  },
  menuText: {
    whiteSpace: "normal",
  },
  iconButton: {
    padding: theme.spacing(1.25),
  },
}));

export function HelpIconButton(props: IconButtonProps): JSX.Element {
  const { classes } = useStyles();

  return (
    <IconButton {...props} className={classes.iconButton}>
      <ContactSupportOutlinedIcon />
    </IconButton>
  );
}

export function HelpMenu({
  anchorEl,
  handleClose,
  open,
}: {
  handleClose: () => void;
  anchorEl?: HTMLElement;
  open: boolean;
}): JSX.Element {
  const { classes } = useStyles();

  return (
    <Menu
      classes={{ paper: classes.paper }}
      id="help-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "help-button",
      }}
      PaperProps={{
        onMouseLeave: handleClose,
      }}
    >
      <ListSubheader className={classes.subheader} tabIndex={-1}>
        Documentation
      </ListSubheader>
      {/* <Link href="https://foxglove.dev/docs/studio" passHref> */}
      <MenuItem className={classes.menuItem} component="a" target="_blank" onClick={handleClose}>
        <VisibilityOutlinedIcon color="primary" />
        <ListItemText
          primary="Studio"
          secondary="Open source robotics visualization and debugging."
          secondaryTypographyProps={{ className: classes.menuText }}
        />
      </MenuItem>
      {/* </Link> */}
      {/* <Link href="https://foxglove.dev/docs/data-platform" passHref> */}
      <MenuItem className={classes.menuItem} component="a" target="_blank" onClick={handleClose}>
        <CloudOutlinedIcon color="primary" />
        <ListItemText
          primary="Data Platform"
          secondary="Scalable data management platform"
          secondaryTypographyProps={{ className: classes.menuText }}
        />
      </MenuItem>
      {/* </Link> */}
      <Divider />
      <ListSubheader className={classes.subheader} tabIndex={-1}>
        Community
      </ListSubheader>
      {/* <Link href="https://foxglove.dev/slack" passHref> */}
      <MenuItem className={classes.menuItem} component="a" target="_blank" onClick={handleClose}>
        <ForumOutlinedIcon color="primary" />
        <ListItemText
          primary="Join us on Slack"
          secondary=" Give us feedback, ask questions, and collaborate with other users."
          secondaryTypographyProps={{ className: classes.menuText }}
        />
      </MenuItem>
      {/* </Link> */}
    </Menu>
  );
}
