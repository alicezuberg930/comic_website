import { Container, Grid, Stack, Typography } from '@mui/material'
import { _homeComics } from '~/_mock/arrays/_comic'
import Image from '~/components/image'
import { Route } from '../+types/root'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Trang chủ' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function page() {
  return (
    <Container maxWidth='xl'>
      <Stack direction='row'>
        <Grid container width='70%' spacing={2}>
          {_homeComics.map(comic => (
            <Grid size={3} key={comic.id}>
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
  )
}
