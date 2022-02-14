import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { productContext } from '../../../Contexts/ProductContext';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductCard({item}) {
    const { deleteProduct } = React.useContext(productContext)
    let icons = (
      <CardActions disableSpacing>
          <Link to={`edit/${item.id}`}>
              <IconButton>
                   <EditIcon />
               </IconButton>      
          </Link>
          <IconButton onClick={() => deleteProduct(item.id)}>
              <DeleteIcon />
          </IconButton>
      </CardActions>
    )
    
  return (
    <Card sx={{ maxWidth: 420 }}>
      <CardMedia
            component="img"
            height="300"
            image={item.image}
            alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography>
          ${item.price}
        </Typography>
      </CardContent>
      {icons}
    </Card>
  );
}
