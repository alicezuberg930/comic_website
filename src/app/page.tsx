import Image from "@/components/image";
import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material'
import { _homeComics } from '@/_mock/arrays/_comic'
import Label from "@/components/label";

export default function Home() {
  return (
    <Container maxWidth='xl'>
      <Stack direction='row' spacing={2}>
        <Stack flex={1} spacing={1}>
          <Typography variant="h6">
            Latest update
          </Typography>
          <Grid container>
            {_homeComics.map(comic => (
              <Grid item xs={12} sm={6} md={3} pb={2} pr={2} key={comic.id}>
                <Card sx={{ p: 1 }}>
                  <Image src={comic.coverUrl} sx={{ borderRadius: 1 }} />
                  <Stack direction='row' justifyContent='space-between' my={1}>
                    <Typography variant='body1'>{comic.rating}</Typography>
                    <Typography variant='body1'>{comic.status}</Typography>
                  </Stack>
                  <Typography variant='subtitle1' textAlign='center'>{comic.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack flex={0.35} spacing={1}>
          <Typography variant="h6">
            Trending
          </Typography>
          <Stack spacing={2}>
            {_homeComics.map(comic => (
              <Card sx={{ p: 2 }} key={comic.id}>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Image src={comic.coverUrl} width={80} />
                  <Stack spacing={2}>
                    <Typography>{comic.name}</Typography>
                    <Stack direction='row' spacing={1}>
                      <Typography>Chapter 22</Typography>
                      <Typography>{comic.rating}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                      {
                        comic.catergories.map(category => (
                          <Label>{category}</Label>
                        ))
                      }
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
