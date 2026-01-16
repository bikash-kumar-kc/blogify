import { ChakraProvider } from '@chakra-ui/react'
import system from './theme.js';


const ChakraProviderComponent = ({children})=>{
    return <ChakraProvider value={system}>{children}</ChakraProvider>
};

export default ChakraProviderComponent;