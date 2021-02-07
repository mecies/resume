import React from 'react';
import { ChevronLeft, ChevronRight, Code, ExternalLink, Image, X } from 'react-feather';
import { Box, Dialog, makeStyles, Typography } from '@material-ui/core/';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Tag } from '@/components/Tag';

import type { PortfolioProjectDialogVariantProps } from './PortfolioProjectDialog.types';

const useStyles = makeStyles((theme) => ({
  iconButtons: {
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
  contentHeader: { margin: theme.spacing(2, 0, 2) },
  content: { paddingRight: theme.spacing(3), paddingLeft: theme.spacing(3) },
  contentMain: { padding: theme.spacing(3, 3, 1.5, 3) },
  tags: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    padding: theme.spacing(0, 3, 3, 3),
    '& > *': {
      margin: theme.spacing(0.5, 1, 0.5, 0),
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'normal',
    margin: theme.spacing(1, 1, 1, 0),
  },
}));

export const PortfolioProjectDialogMobile = (props: PortfolioProjectDialogVariantProps) => {
  const classes = useStyles();

  return (
    <Box display="inline-block">
      <Dialog className={classes.wrapper} fullScreen open={props.isOpen}>
        <Box className={classes.iconButtons}>
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
          <Tag label={props.tagtitle} color="primary" />
          <Typography className={classes.contentHeader} variant="body1" color="textSecondary">
            {props.contentHeader}
          </Typography>
          {props.codeUrl ? (
            <Button
              href={props.codeUrl}
              className={classes.button}
              color="primary"
              variant="contained"
              startIcon={<Code size={16} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              See code
            </Button>
          ) : null}
          {props.mockupsUrl ? (
            <Button
              href={props.mockupsUrl}
              className={classes.button}
              color="primary"
              variant="contained"
              startIcon={<Image size={16} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              See mockups
            </Button>
          ) : null}
          {props.projectUrl ? (
            <Button
              href={props.projectUrl}
              className={classes.button}
              color="primary"
              variant="contained"
              startIcon={<ExternalLink size={16} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the app
            </Button>
          ) : null}
        </Box>
        <Typography className={classes.contentMain} variant="h5" color="textPrimary">
          Project description
        </Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: props.contentMainDescription }}
        />
        <Typography className={classes.contentMain} variant="h5" color="textPrimary">
          My role
        </Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: props.contentMainRole }}
        />
        <Typography className={classes.contentMain} variant="h5" color="textPrimary">
          Technologies
        </Typography>
        <Box className={classes.tags}>
          {props.tags.map((tag) => (
            <Tag key={tag.name} label={tag.name} />
          ))}
        </Box>
      </Dialog>
    </Box>
  );
};
