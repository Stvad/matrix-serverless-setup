import {Login} from 'matrix-rx'
import {ChakraProvider} from '@chakra-ui/react'
import {CreateMatrixPusher} from './CreateMatrixPusher.tsx'


function App() {

    return (
        <ChakraProvider>
            <Login>
                <CreateMatrixPusher/>
            </Login>
        </ChakraProvider>
    )
}

export default App
