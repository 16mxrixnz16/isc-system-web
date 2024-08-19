import { Card, CardActionArea, CardContent, Typography } from "@mui/material"

type Role = {
    roleName: string
}

const RoleComponent = ({role}:{role:Role} ) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography>
                        {role.roleName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default RoleComponent