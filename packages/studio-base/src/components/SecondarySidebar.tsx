// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Divider, IconButton, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import JsonTree from "react-json-tree";
import { makeStyles } from "tss-react/mui";

import { EventsList } from "@foxglove/studio-base/components/DataSourceSidebar/EventsList";
import {
  MessagePipelineContext,
  useMessagePipeline,
} from "@foxglove/studio-base/components/MessagePipeline";
import Stack from "@foxglove/studio-base/components/Stack";
import { TabPanel } from "@foxglove/studio-base/components/TabPanel";
import VariablesSidebar from "@foxglove/studio-base/components/VariablesSidebar";
import { useCurrentUser } from "@foxglove/studio-base/context/CurrentUserContext";
import { useJsonTreeTheme } from "@foxglove/studio-base/util/globalConstants";

const useStyles = makeStyles()((theme) => ({
  root: {
    boxSizing: "content-box",
    borderLeft: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    minHeight: "auto",

    ".MuiTabs-indicator": {
      transform: "scaleX(0.5)",
      height: 2,
      bottom: -1,
    },
    ".MuiTab-root": {
      minHeight: 30,
      minWidth: theme.spacing(8),
      padding: theme.spacing(0, 1.5),
      color: theme.palette.text.secondary,
      fontSize: "0.6875rem",

      "&.Mui-selected": {
        color: theme.palette.text.primary,
      },
    },
  },
  tabPanel: {
    width: 300,
  },
  collapseButton: {
    fontSize: 20,
  },
}));

const selectPlayerSourceId = ({ playerState }: MessagePipelineContext) =>
  playerState.urlState?.sourceId;

export function SecondarySidebar(): JSX.Element {
  const { classes } = useStyles();
  const { currentUser } = useCurrentUser();
  const jsonTreeTheme = useJsonTreeTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  const playerSourceId = useMessagePipeline(selectPlayerSourceId);

  const showEventsTab = currentUser != undefined && playerSourceId === "foxglove-data-platform";

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Stack className={classes.root} flexShrink={0}>
      <Stack direction="row" justifyContent="space-between">
        {!collapsed && (
          <Tabs
            className={classes.tabs}
            textColor="inherit"
            value={activeTab}
            onChange={(_ev, newValue: number) => {
              if (newValue !== activeTab) {
                setActiveTab(newValue);
              }
            }}
          >
            <Tab label="Selected object" value={0} />
            <Tab label="Variables" value={1} />
            {showEventsTab && <Tab label="Events" value={2} />}
          </Tabs>
        )}

        <IconButton className={classes.collapseButton} size="small" onClick={toggleCollapsed}>
          {collapsed ? <ArrowLeftIcon fontSize="inherit" /> : <ArrowRightIcon fontSize="inherit" />}
        </IconButton>
      </Stack>
      <Divider />
      {!collapsed && (
        <>
          <TabPanel className={classes.tabPanel} value={activeTab} index={0}>
            <JsonTree theme={jsonTreeTheme} />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={activeTab} index={1}>
            <VariablesSidebar />
          </TabPanel>
          {showEventsTab && (
            <TabPanel className={classes.tabPanel} value={activeTab} index={2}>
              <EventsList />
            </TabPanel>
          )}
        </>
      )}
    </Stack>
  );
}
