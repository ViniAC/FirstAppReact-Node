import React from 'react';
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';



export default function UserForm(props) {


  return (

    <Container>
      <form>
        <Grid container item direction="column" justify="center" alignItems="center">

          <TextField
            margin="normal"
            disabled={true}
            variant="outlined"
            value={props.legal_client.name}
          />
          <TextField
            margin="normal"
            disabled={true}
            variant="outlined"
            value={props.legal_client.cnpj}
          />
          <TextField
            margin="normal"
            disabled={true}
            variant="outlined"
            value={props.legal_client.email}
          />
          <TextField
            margin="normal"
            disabled={true}
            variant="outlined"
            value={props.legal_client.city}
          />

          <TextField
            margin="normal"
            disabled={true}
            variant="outlined"
            value={props.legal_client.uf}
          />

          <Button>
            Salvar
          </Button>


        </Grid>
      </form>
    </Container>


  )
}