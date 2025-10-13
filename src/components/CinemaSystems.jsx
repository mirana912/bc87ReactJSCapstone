import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCinemaSystems, selectCinema } from '../features/cinemas/cinemasSlice';
import { fetchShowtimes } from '../features/showtimes/showtimesSlice';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';


export default function CinemaSystems(){
const dispatch = useAppDispatch();
const { items, status, selected } = useAppSelector(s=>s.cinemas);


useEffect(()=>{ dispatch(fetchCinemaSystems()); },[dispatch]);
useEffect(()=>{ if(selected){ dispatch(fetchShowtimes({ maHeThongRap: selected })); } },[dispatch, selected]);


if(status==='loading'){
return (
<List dense>
{Array.from({length:6}).map((_,i)=> (
<ListItemButton key={i}>
<ListItemAvatar><Skeleton variant="circular" width={32} height={32} /></ListItemAvatar>
<ListItemText primary={<Skeleton width={140} />} />
</ListItemButton>
))}
</List>
);
}


return (
<List dense sx={{ bgcolor:'background.paper', borderRadius:2 }}>
{items.map(sys => (
<ListItemButton
key={sys.maHeThongRap}
selected={selected===sys.maHeThongRap}
onClick={()=> dispatch(selectCinema(sys.maHeThongRap))}
>
<ListItemAvatar>
<Avatar src={sys.logo} alt={sys.tenHeThongRap} sx={{ bgcolor:'transparent' }} />
</ListItemAvatar>
<ListItemText primary={sys.tenHeThongRap} secondary={sys.maHeThongRap} />
</ListItemButton>
))}
</List>
);
}