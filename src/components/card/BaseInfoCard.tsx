import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { MdMoreVert } from 'react-icons/md';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";
import { theme } from '../../styles/global';
import { Link } from '@material-ui/core';

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
    star: {
        color: theme.primaryLight
    }
  }),
);

interface BaseInfoCardProps {
    title: string,
    contentTitle: string,
    content: string
}

function BaseInfoCard(props: BaseInfoCardProps) {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {props.title.charAt(0)}
                </Avatar>
                }
                title={
                    <Link href="#" className={classes.cardTitle}>
                        {props.title}
                    </Link>
                }
                subheader={
                    <Typography>
                        <TiStarFullOutline className={classes.star}/>
                        <TiStarFullOutline className={classes.star}/>
                        <TiStarFullOutline className={classes.star}/>
                        <TiStarHalfOutline className={classes.star}/>
                        <TiStarOutline className={classes.star}/>
                    </Typography>
                }
            />
            <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1530886607837-eaf9a00f9a7f"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="inherit">
                    {props.contentTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BaseInfoCard;
