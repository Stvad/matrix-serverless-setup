import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react'
import {FormEvent, useState} from 'react'
import {useMatrixClient, useMatrixContext} from 'matrix-rx'

export const CreateMatrixPusher = () => {
    const [url, setUrl] = useState('')
    const [pushkey, setPushkey] = useState('')
    const [deviceDisplayName, setDeviceDisplayName] = useState('')
    const [appDisplayName, setAppDisplayName] = useState('')
    const [appId, setAppId] = useState('')
    const matrixCtx = useMatrixContext()
    const client = useMatrixClient()


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const result = await client.setPusher({
                kind: 'http',
                app_id: appId,
                app_display_name: appDisplayName,
                device_display_name: deviceDisplayName,
                lang: 'en',
                pushkey,
                data: {
                    url,
                },
            })

            console.log('Pusher created successfully:', result)
        } catch (error) {
            console.error('Error creating pusher:', error)
        }
    }

    return (
        <Box
            maxWidth={'40em'}
            margin={'auto'}
        >
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="url" isRequired>
                        <FormLabel>URL</FormLabel>
                        <Input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="pushkey" isRequired>
                        <FormLabel>Push Key</FormLabel>
                        <Input
                            type="text"
                            value={pushkey}
                            onChange={(e) => setPushkey(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="deviceDisplayName" isRequired>
                        <FormLabel>Device Display Name</FormLabel>
                        <Input
                            type="text"
                            value={deviceDisplayName}
                            onChange={(e) => setDeviceDisplayName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="appDisplayName" isRequired>
                        <FormLabel>App Display Name</FormLabel>
                        <Input
                            type="text"
                            value={appDisplayName}
                            onChange={(e) => setAppDisplayName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="appId" isRequired>
                        <FormLabel>App ID</FormLabel>
                        <Input
                            type="text"
                            value={appId}
                            onChange={(e) => setAppId(e.target.value)}
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="blue">
                        Create Pusher
                    </Button>
                </VStack>
            </form>
            <Box>{matrixCtx.credentials.userIdFull}</Box>
            <Button colorScheme="pink" onClick={() => matrixCtx.logout()}>Logout</Button>
        </Box>
    )
}
