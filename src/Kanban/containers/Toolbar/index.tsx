import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {OutlinedInput as MuiOutlinedInput, withStyles} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import MuiToolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";

import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme as useMuiTheme } from "@material-ui/core/styles";

import { useTranslation } from "Kanban/providers/TranslationProvider";
import ColumnForm from "Kanban/components/ColumnForm";
import BoardForm from "Kanban/components/BoardForm";
import IconButton from "Kanban/components/IconButton";
import { Column } from "Kanban/types";
import { Board } from "Kanban/types";
import { useTheme } from "Kanban/providers/ThemeProvider";

type AddBoardButtonProps = {
  onSubmit: any;
};

const AddBoardButton: React.FC<AddBoardButtonProps> = (props) => {
  const { onSubmit } = props;

  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = React.useCallback(
    (board: Column) => {
      onSubmit({ board });
      handleCloseDialog();
    },
    [onSubmit, handleCloseDialog]
  );

  return (
    <Box display="block">
      <Button variant="outlined" color="secondary" onClick={handleOpenDialog} style={{ height: 30 }} >
        {t("addBoard")}
      </Button>
      <Dialog onClose={handleCloseDialog} open={open}>
        <DialogContent>
          <BoardForm onSubmit={handleSubmit} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

type AddColumnButtonProps = {
  onSubmit: any;
};

const AddColumnButton: React.FC<AddColumnButtonProps> = (props) => {
  const { onSubmit } = props;

  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = React.useCallback(
    (column: Column) => {
      onSubmit({ column });
      handleCloseDialog();
    },
    [onSubmit, handleCloseDialog]
  );

  return (
    <Box display="block">
      <Button variant="outlined" color="secondary" onClick={handleOpenDialog} style={{ height: 30 }} >
        {t("addColumn")}
      </Button>
      <Dialog onClose={handleCloseDialog} open={open}>
        <DialogContent>
          <ColumnForm onSubmit={handleSubmit} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

type ClearBoardButtonProps = {
  onClear: any;
  disabled?: boolean;
};

const ClearBoardButton: React.FC<ClearBoardButtonProps> = (props) => {
  const { disabled, onClear } = props;

  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleClear = React.useCallback(
    (e) => {
      onClear({ e });
      handleCloseDialog();
    },
    [onClear, handleCloseDialog]
  );

  return (
    <Box display="flex">
      <IconButton
        icon="delete"
        color="secondary"
        disabled={disabled}
        onClick={handleOpenDialog}
      ></IconButton>
      <Dialog onClose={handleCloseDialog} open={open}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h6"  color="secondary">
                {t("clearBoard")}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom  color="secondary">
                {t("clearBoardConfirmation")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleCloseDialog}  color="secondary">
                {t("cancel")}
              </Button>
              &nbsp;
              <Button color="secondary" variant="contained" onClick={handleClear}>
                {t("clear")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

type LanguageButtonProps = {};

const LanguageButton: React.FC<LanguageButtonProps> = (props) => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lng: string) => () => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <Box display="block">
      <IconButton
        icon={"language"}
        aria-controls="language-menu"
        aria-haspopup="true"
        color="secondary"
        onClick={handleClick}
      />
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleChangeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={handleChangeLanguage("fr")}>Fran??ais</MenuItem>
        <MenuItem onClick={handleChangeLanguage("es")}>Espa??ol</MenuItem>
        <MenuItem onClick={handleChangeLanguage("ru")}>P????????????</MenuItem>
        <MenuItem onClick={handleChangeLanguage("de")}>Deutsch</MenuItem>
        <MenuItem onClick={handleChangeLanguage("in")}>???????????????</MenuItem>
        <MenuItem onClick={handleChangeLanguage("jp")}>?????????</MenuItem>
        <MenuItem onClick={handleChangeLanguage("cn")}>??????</MenuItem>
      </Menu>
    </Box>
  );
};

const DarkThemeButton: React.FC<{}> = () => {
  const { darkTheme, handleToggleDarkTheme } = useTheme();
  return (
    <IconButton
      color="secondary"
      icon={darkTheme ? "invertColors" : "invertColorsOff"}
      onClick={handleToggleDarkTheme}
    />
  );
};


const useInfoButtonStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 300,
    minWidth: 300,
    maxHeight: 300,
    minHeight: 300,
    padding: theme.spacing(),
  },
  buttonGridItem: {
    textAlign: "center",
  },
}));


const useToolbarStyles =makeStyles(({ palette }) => ({
  paper: {
    padding: 0,
  },
  select: {
    '&:before': {
        borderColor: palette.secondary.main,
    },
    '&:after': {
        borderColor: palette.secondary.main,
    },
    '&:not(.Mui-disabled):hover::before': {
        borderColor: palette.secondary.main,
    },
  },
  icon: {
      fill: palette.secondary.main,
  },
  root: {
      color: palette.secondary.main,
  },

}));

const OutlinedInput = withStyles((theme) => ({
  notchedOutline: {
    borderColor: theme.palette.secondary.main, //"#1a80bf !important",
    borderWidth: "2px"
  },
}))(MuiOutlinedInput);

type ToolbarProps = {
  clearButtonDisabled?: boolean;
  onNewColumn: any;
  onClearBoard: any;
  onNewBoard: any;
  setBoard_id: any;
  //board_id: string;
  boards: Board[];
};

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { clearButtonDisabled, onNewColumn, onClearBoard, onNewBoard } = props;

  // const handleBoardChange = (event: React.ChangeEvent<{ value: string }>) => {
  //   setBoard_id(event.target.value);
  // };
  const handleBoardChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log('handleBoardChange value: '+event.target.value);
    props.setBoard_id(event.target.value as string);
  };
  // const handleBoardChange = (event: React.ChangeEvent<{ value: string }>, child: React.ReactNode) => {
  //   setBoard_id(event.target.value);
  // };
  const { t } = useTranslation();

  const classes = useToolbarStyles();

  const muiTheme = useMuiTheme();

  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <AppBar color="default" elevation={6} className={classes.paper}>
      <MuiToolbar>
        <Box display="flex" alignItems="center">
          <IconButton
            icon="Kanban"
            color="secondary"
            size="small"
            iconProps={{ fontSize: "large" }}
            disableRipple
            disableTouchRipple
            disableFocusRipple
          />
          &nbsp;
          <Typography variant={isMobile ? "body1" : "h6"} color="secondary">
            <b>{t("kanban")}</b>
          </Typography>
          &nbsp;
    
        </Box>
        <Box 
          sx={{
            display: "flex",
            flexGrow:1,
            alignItems:"center",
            justifyContent: "center",
            minWidth: 300,
          }}
        >
         <Typography variant={isMobile ? "body1" : "h6"} color="secondary">
            <b>{t("board")}</b>
          </Typography>
          &nbsp;          
          &nbsp;
          <Select native={true} onChange={handleBoardChange} defaultValue={props.boards[0].id}   
              className={classes.select}
              inputProps={{
                  classes: {
                      icon: classes.icon,
                      root: classes.root,
                  },
              }}
              input={<OutlinedInput />}
              style={{ height: 30, borderColor:'#ddebf7', borderBlockColor:'#ddebf7'}} >
              {
                props.boards.map( (x) => 
                  <option key={x.id} value={x.id}>{x.title}</option> )
              }

            </Select>
        </Box>
        <Box display="flex">  
          <AddColumnButton onSubmit={onNewColumn} />
          &nbsp;
          <AddBoardButton onSubmit={onNewBoard} />
          &nbsp;
          <ClearBoardButton
            disabled={clearButtonDisabled}
            onClear={onClearBoard}
          />
          &nbsp;
          <DarkThemeButton /> &nbsp;
          <LanguageButton /> &nbsp;
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;

