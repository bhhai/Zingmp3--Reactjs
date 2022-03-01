import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";

LoadingHeroSlide.propTypes = {};

function LoadingHeroSlide(props) {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height={220} />
    </>
  );
}

export default LoadingHeroSlide;
