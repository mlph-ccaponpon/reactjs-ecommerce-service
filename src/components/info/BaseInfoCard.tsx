import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { theme } from '../../styles/global';
import { NavLink } from 'react-router-dom';
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
    },
    cardTitle: {
        color: theme.secondaryDark
    },
    cardTitleLink: {
        color: theme.secondaryDark,
        textDecoration: 'none',
        '&:hover': {
            textDecorationLine: 'underline'
        }
    },
    star: {
        color: theme.primaryLight
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
    content?: string
}

function BaseInfoCard(props: BaseInfoCardProps) {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader
                avatar={props.title && (
                    <Avatar aria-label={props.title} className={classes.avatar}>
                        {props.title.charAt(0)}
                    </Avatar>
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
                            <RatingInfo rating={props.rating} />
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
                    <Typography variant="body2" color="inherit">
                        {props.contentTitle}
                    </Typography>
                )}
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BaseInfoCard;
