import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogContentUtilityClass } from './dialogContentClasses';
import dialogTitleClasses from '../DialogTitle/dialogTitleClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, dividers } = ownerState;

  const slots = {
    root: ['root', dividers && 'dividers'],
  };

  return composeClasses(slots, getDialogContentUtilityClass, classes);
};

const DialogContentRoot = styled('div', {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.dividers && styles.dividers];
  },
})(({ theme, ownerState }) => ({
  flex: '1 1 auto',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  overflowY: 'auto',
  padding: '20px 24px',
  ...(ownerState.dividers
    ? {
        padding: '16px 24px',
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }
    : {
        [`.${dialogTitleClasses.root} + &`]: {
          paddingTop: 0,
        },
      }),
}));

const DialogContent = React.forwardRef(function DialogContent(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDialogContent',
  });

  const { className, dividers = false, ...other } = props;
  const ownerState = { ...props, dividers };
  const classes = useUtilityClasses(ownerState);

  return (
    <DialogContentRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

DialogContent.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default DialogContent;
