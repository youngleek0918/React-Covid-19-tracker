import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

function InfoBox({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                {/* title (Coronavirus cases) */}
                <Typography classname="infoBox__title" color="textSecondary"> {title} </Typography>

                {/* Number of cases (+120k) */}
                <h2 className="infoBox__cases"> {cases} </h2>

                {/* Total (1.2M) */}
                <Typography className="infoBos__total" color="textSecondary"> {total} </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
