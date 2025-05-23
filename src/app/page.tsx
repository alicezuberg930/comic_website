import Image from "@/components/image";
import { Container, Grid, Stack, Typography } from '@mui/material'
import { _homeComics } from '@/_mock/arrays/_comic'

export default function Home() {
  return (
    <Container maxWidth='xl'>
      <Stack direction='row'>
        <Grid container width='70%' spacing={2}>
          {_homeComics.map(comic => (
            <Grid item xs={12} sm={6} md={3} key={comic.id}>
              <Image src={comic.coverUrl} sx={{ borderRadius: 1 }} />
              <Stack direction='row' justifyContent='space-between' my={1}>
                <Typography variant='body1'>{comic.rating}</Typography>
                <Typography variant='body1'>{comic.status}</Typography>
              </Stack>
              <Typography variant='subtitle1' textAlign='center'>{comic.name}</Typography>

            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
