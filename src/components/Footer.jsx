import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

export default function Footer() {
    return (
        <Box sx={{ bgcolor: '#f8f8f8', py: 6 }}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={2}>
                        <VolunteerActivismIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                            Rafiq
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>About Us</Typography>
                        <Typography>Freebies</Typography>
                        <Typography>Blog</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>Illustrations</Typography>
                        <Typography>Bills & Snippets</Typography>
                        <Typography>Affiliate Program</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>Contact Us</Typography>
                        <Typography>Knowledge Center</Typography>
                        <Typography>Custom Development</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>Terms & Conditions</Typography>
                        <Typography>Privacy Policy</Typography>
                        <Typography>Licenses (EULA)</Typography>
                    </Grid>
                </Grid>
                <Typography align="center" mt={4}>
                    Rafiq © 2022
                </Typography>
            </Container>
        </Box>
    );
}
