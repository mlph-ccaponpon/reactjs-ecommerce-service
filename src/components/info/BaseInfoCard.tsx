import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { theme } from '../../styles/global';
import { NavLink, useHistory } from 'react-router-dom';
import RatingInfo from './RatingInfo';

const useStyles = makeStyles((materialTheme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: materialTheme.transitions.create('transform', {
        duration: materialTheme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: theme.primaryLight,
      width: materialTheme.spacing(6),
      height: materialTheme.spacing(6),
      fontSize: theme.fontLg,
      '&:hover': {
        backgroundColor: theme.secondaryDark,
        cursor: 'pointer'
    }
    },
    cardTitle: {
        fontSize: theme.fontLg,
        color: theme.secondaryDark
    },
    cardTitleLink: {
        fontSize: theme.fontLg,
        color: theme.primaryLight,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            color: theme.secondaryDark
        }
    },
    star: {
        color: theme.primaryLight
    },
    cardContent: {
        fontSize: theme.fontMd
    }
  }),
);

interface BaseInfoCardProps {
    title?: string,
    titleLink?: string,
    subtitle?: string,
    contentImg?: string, 
    contentTitle?: string,
    rating?: number,
    ratingHasLabel?: boolean,
    content?: string
}

function BaseInfoCard(props: BaseInfoCardProps) {
    const classes = useStyles();
    const history = useHistory();

    const navigateToPage = () => {
        props.titleLink && history.push(props.titleLink);
    }
    return (
        <Card>
            <CardHeader
                avatar={props.title && (
                    <div onClick={navigateToPage}>
                        <Avatar aria-label={props.title} className={classes.avatar}>
                                                {props.title.charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                )}
                title={props.title && props.titleLink ? (
                    <NavLink to={props.titleLink} className={classes.cardTitleLink}>
                        {props.title}
                    </NavLink>
                    ):(
                    <p className={classes.cardTitle}>
                        {props.title}
                    </p>
                    )
                }
                subheader={
                    <div>
                        {props.rating !== undefined && (
                            <RatingInfo rating={props.rating} hasLabel={props.ratingHasLabel}/>
                        )}
                        {props.subtitle && (
                            <p>{props.subtitle}</p>
                        )}
                    </div>
                }
            />
            {props.contentImg && (
                <CardMedia
                    className={classes.media}
                    image={props.contentImg}/>
            )}
            <CardContent>
                {props.contentTitle && (
                    <Typography variant="body2" color="inherit" className={classes.cardContent}>
                        {props.contentTitle}
                    </Typography>
                )}
                <Typography variant="body2" color="textSecondary" component="p" className={classes.cardContent}>
                    {props.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BaseInfoCard;
