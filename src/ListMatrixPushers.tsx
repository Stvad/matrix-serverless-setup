import {PusherParam, useMatrixClient, useMatrixContext} from 'matrix-rx'
import {useEffect, useState} from 'react'
import {Box, Button, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'


export const ListMatrixPushers = () => {
    const [pushers, setPushers] = useState<PusherParam[]>()
    const client = useMatrixClient()
    const matrixCtx = useMatrixContext()

    useEffect(() => {
        (async () => {
            const pushers = await client.getPushers()
            setPushers(pushers.pushers as PusherParam[])
        })()
    })

    const deletePusher = async (pusher: PusherParam) => {
        try {
            await client.setPusher({...pusher, kind: null})
            console.log('Pusher deleted successfully')
        } catch (error) {
            console.error('Error deleting pusher:', error)
        }
    }

    return (
        <Box overflowX="auto">
            <Table variant="simple">
                <TableCaption placement="top">Matrix Pushers ({matrixCtx.credentials.userIdFull})</TableCaption>
                <Thead>
                    <Tr>
                        <Th>App Display Name</Th>
                        <Th>App ID</Th>
                        <Th>URL</Th>
                        <Th>Device Display Name</Th>
                        <Th>Kind</Th>
                        <Th>Language</Th>
                        <Th>Profile Tag</Th>
                        <Th>Push Key</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {pushers?.map((pusher, index) => (
                        <Tr key={index}>
                            <Td>{pusher.app_display_name}</Td>
                            <Td>{pusher.app_id}</Td>
                            <Td>{pusher.data.url}</Td>
                            <Td>{pusher.device_display_name}</Td>
                            <Td>{pusher.kind}</Td>
                            <Td>{pusher.lang}</Td>
                            <Td>{pusher.profile_tag}</Td>
                            <Td>{pusher.pushkey}</Td>
                            <Td>
                                <Button colorScheme="red" onClick={() => deletePusher(pusher)}>
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}
