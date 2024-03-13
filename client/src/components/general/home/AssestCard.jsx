import { Box, Typography } from '@mui/material'
import React from 'react'

const AssestCard = ({ data }) => {

	return (
		<Box fullHeight sx={{ padding: '20px' }} >
			<Typography sx={{ fontWeight: 'bold' }}>{data.title}</Typography>
			<Typography variant="subtitle2" sx={{ fontSize: '11.5px', fontWeight: 'light' }}>{data.description}</Typography>
		</Box>
	)
}

export default AssestCard