import {Login} from 'matrix-rx'
import {ChakraProvider} from '@chakra-ui/react'
import {CreateMatrixPusher} from './CreateMatrixPusher.tsx'
import {ListMatrixPushers} from './ListMatrixPushers.tsx'


function App() {

    return (
        <ChakraProvider>
            <Login>
                <ListMatrixPushers/>
                <br/>
                <CreateMatrixPusher/>
            </Login>
        </ChakraProvider>
    )
}

export default App
