import React, { useState, useCallback } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DescriptionIcon from "@material-ui/icons/Description";
import HomeIcon from "@material-ui/icons/Home";
import NoteIcon from "@material-ui/icons/Note";
import CategoryIcon from "@material-ui/icons/Category";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/styles";
import { TextInput } from "../Ulkit/index";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32,
  },
}));

const ClosableDrawer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { container } = props;

  const [keyword, setKeyword] = useState("");

  const InputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  //クリックしたら選択したpathに飛ぶ
  const selectMenu = (e, path) => {
    dispatch(push(path));
    props.onClose(e);
  };

  //menu達
  const menus = [
    {
      func: selectMenu,
      label: "ホーム",
      icon: <HomeIcon />,
      id: "home",
      value: "/",
    },
    {
      func: selectMenu,
      label: "お気に入り一覧",
      icon: <FavoriteBorderIcon />,
      id: "favorite",
      value: "/favorite",
    },
    {
      func: selectMenu,
      label: "自分のメモ",
      icon: <NoteIcon />,
      id: "memolist",
      value: "/moviememo/list",
    },
    {
      func: selectMenu,
      label: "カテゴリ別",
      icon: <CategoryIcon />,
      id: "category",
      value: "/category",
    },
    {
      func: selectMenu,
      label: "使い方",
      icon: <DescriptionIcon />,
      id: "description",
      value: "/description",
    },
    {
      func: selectMenu,
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "/profile",
    },
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false}
              onChange={InputKeyword}
              required={false}
              rows={1}
              value={keyword}
              type={"text"}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
