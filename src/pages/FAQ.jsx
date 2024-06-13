import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import LateralMenu from '../components/LateralMenu'

function FAQ() {
  return (
    <Container p={0} maxWidth="100%" centerContent>
        <Box
          display="flex"
          flexDirection="row"
          marginTop="40px"
          p={4}
          w="95%"
        >
          <LateralMenu />
          <Box bg="white" width="80%">
            FAQ
          </Box>
        </Box>
      </Container>
  )
}

export default FAQ