import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: "fixed",
    bottom: "17vh",
    backgroundColor: "#DCDCDC",
    color: "black",
    "&:hover,&.Mui-focusVisible": {
      transition: "0.3s",
      color: "#397BA6",
      backgroundColor: "#DCDCDC",
    },
    right: "35px",
    bottom: "100px",
  },
}));

const ScrollTop = ({ showBelow }) => {
  const classes = useStyles();
  const [showScrollTop, setScrollTop] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow && showScrollTop === false)
      setScrollTop(true);
    else if (window.pageYOffset < showBelow && showScrollTop === true)
      setScrollTop(false);
    else return;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleClick = () => {
    window["scrollTo"]({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {showScrollTop ? (
        <IconButton onClick={handleClick} className={classes.toTop}>
          <ExpandLessIcon />
        </IconButton>
      ) : null}
    </div>
  );
};

export default ScrollTop;
