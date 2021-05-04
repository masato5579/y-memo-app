import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";

//Headerの上部固定（スクロール）用
const ElevationScroll = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

export default ElevationScroll;
