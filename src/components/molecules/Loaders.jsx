import { css } from '@emotion/core';
import styled from '@emotion/styled';
import LoaderIcon from '../../assets/loader.gif';

// Loader

export const Loader = styled('div')`
  position: relative;

  &::after {
      display: none;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff center center no-repeat;
      opacity: 0.8;
      
      ${({ showLoader }) => showLoader && css`
          display: block;
          background-image: url(${LoaderIcon});
      `}
  }
`;