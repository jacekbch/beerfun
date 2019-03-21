import React from 'react';
import { ClipLoader } from 'react-spinners';
import scssVariables from './../../scss/_variables.scss';

const Loader = () => (
  <ClipLoader loading={true} color={scssVariables.primarycolor} size={25}></ClipLoader>
);

export default Loader;
