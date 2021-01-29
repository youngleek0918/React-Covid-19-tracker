import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import "./InfoBox.css";

function InfoBox({ title, cases, isRed, total, active, ...props  }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                {/* title (Coronavirus cases) */}
                <Typography classname="infoBox__title" color="textSecondary"> {title} </Typography>

                {/* Number of cases (+120k) */}
                <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}> {cases} </h2>

                {/* Total (1.2M) */}
                <Typography className="infoBox__total" color="textSecondary"> {total} </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
