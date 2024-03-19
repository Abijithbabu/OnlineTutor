import React, { useEffect, useState } from 'react'
import TutorLayout from '../../layouts/TutorLayout'
import Banner from '../../components/tutor/profile/Banner'
import { Button, CircularProgress, Container, IconButton, Stack } from '@mui/material'
import About from '../../components/tutor/profile/About'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../utils/api'

const Profile = () => {
   const user = useSelector((store) => store.data.user);
   const [loading, setLoading] = useState(false)
   const dispatch = useDispatch()
   const intialState = {
      _id: user._id,
      name: user.name,
      email: user.email,
      institution: user.institution ?? 'Educational Institution',
      image: user?.image,
      bio: `Joined TuT Finder on ${new Date(user.createdAt).toDateString()}.`,
   };
   const [data, setData] = useState(intialState);

   const handleSubmit = async () => {
      setLoading(true)
      const formData = new FormData();
      for (const key in data) {
         if (data.hasOwnProperty(key) && key !== "image") {
            formData.append(key, data[key]);
         }
      }
      typeof (data.image) == 'object' && formData.append("image", data.image, data?.image?.name);
      await updateProfile(formData).then(res =>
         dispatch({
            type: "user_login",
            payload: { user: { ...user, ...res?.data } },
         })).then(() => setLoading(false))
   }

   return (
      <TutorLayout>
         <Container sx={{ mt: { xs: 2, md: 4 } }} >
            <Banner data={data} dispatch={setData} />
            <About data={data} dispatch={setData} />
            <Stack>
               <Button variant='outlined' fullWidth sx={{ mt: 2, ml: 'auto', maxWidth: 200 }} onClick={handleSubmit}>
                  {loading && <CircularProgress color="inherit" size={18} />}
                  &nbsp;&nbsp;Save details
               </Button>
            </Stack>
         </Container>
      </TutorLayout>
   )
}

export default Profile