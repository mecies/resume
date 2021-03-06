import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'react-feather';
import { Box, Dialog, makeStyles, Typography } from '@material-ui/core/';

import { IconButton } from '@/components/IconButton';
import { Tag } from '@/components/Tag';

import type { BlogPostDialogVariantProps } from './BlogPostDialog.types';

const useStyles = makeStyles((theme) => ({
  buttons: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.4,
  },
  img: {
    marginTop: theme.spacing(1, 2),
    width: '100%',
    height: 'auto',
  },
  wrapper: { boxShadow: theme.shadows[1] },
  textHeader: { marginBottom: theme.spacing(0.5) },
  subtitle: { margin: theme.spacing(0.5, 0, 1, 0) },
  contentHeader: { marginTop: theme.spacing(2) },
}));

export const BlogPostDialogMobile = (props: BlogPostDialogVariantProps) => {
  const classes = useStyles();

  return (
    <Box display="inline-block">
      <Dialog className={classes.wrapper} fullScreen open={props.isOpen}>
        <Box className={classes.buttons}>
          <Box display="flex">
            <Box mr="15px">
              <IconButton color="inherit" onClick={props.handlePrev} size="small">
                <ChevronLeft size={20} />
              </IconButton>
            </Box>
            <IconButton color="inherit" onClick={props.handleNext} size="small">
              <ChevronRight size={20} />
            </IconButton>
          </Box>
          <IconButton color="inherit" onClick={props.handleClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>
        <img className={classes.img} src={props.imgurl} alt={props.title} />
        <Box bgcolor="background.light" p={3}>
          <Typography className={classes.textHeader} variant="h4" color="textPrimary">
            {props.title}
          </Typography>
          <Typography className={classes.subtitle} variant="subtitle2" color="textPrimary">
            {props.subtitle}
          </Typography>
          <Tag label={props.tagtitle} color="secondary" />
          <Typography className={classes.contentHeader} variant="body1" color="textSecondary">
            {props.contentheader}
          </Typography>
        </Box>
        <Box p={4}>
          {' '}
          <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{ __html: props.contentmain }} />
        </Box>
      </Dialog>
    </Box>
  );
};
