import {Box, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage} from '@chakra-ui/react'
import {FormEvent, useState} from 'react'
import {useMatrixClient, useMatrixContext} from 'matrix-rx'

export const CreateMatrixPusher = () => {
    const [url, setUrl] = useState('')
    const [pushkey, setPushkey] = useState('')
    const matrixCtx = useMatrixContext()
    const client = useMatrixClient()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const result = await client.setPusher({
                kind: 'http',
                app_id: pushkey,
                app_display_name: pushkey,
                device_display_name: pushkey,
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

    const urlPath = '/_matrix/push/v1/notify'
    return (
        <Box
            maxWidth={'40em'}
            margin={'auto'}
        >
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl
                        id="url"
                        isRequired
                        isInvalid={!!url && createUrl(url)?.pathname !== urlPath}
                    >
                        {/*todo validation to be of appropriate format*/}
                        <FormLabel>URL</FormLabel>
                        <Input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <FormErrorMessage>Must be HTTPS URL with path `{urlPath}`</FormErrorMessage>
                    </FormControl>

                    <FormControl id="pushkey" isRequired>
                        <FormLabel>Push Key</FormLabel>
                        <Input
                            type="text"
                            value={pushkey}
                            onChange={(e) => setPushkey(e.target.value)}
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="blue">
                        Create Pusher
                    </Button>
                    <Button colorScheme="pink" onClick={() => matrixCtx.logout()}>Logout</Button>
                </VStack>
            </form>
        </Box>
    )
}

function createUrl(url: string) {
    try {
        return new URL(url)
    } catch (e) {
        return null
    }
}
