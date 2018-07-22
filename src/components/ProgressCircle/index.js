import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProgressCircle extends React.Component {

    render() {
        return (
            <div >
                <Grid container spacing={8} align="center">
                    <Grid item sm={4} md={4}></Grid>
                    <Grid item sm={4} md={4}>
                        <Typography variant="display3">
                            <CircularProgress
                                style={{
                                marginTop: 100,
                                marginBottom: 100
                            }}
                                thickness={7}/>
                        </Typography>
                    </Grid>
                    <Grid item sm={4} md={4}></Grid>
                </Grid>
            </div>
        )}}

export default ProgressCircle;