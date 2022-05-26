import type { NextPage } from 'next'
import {
    useLoginContext,
    User,
    useSetLoginContext,
} from '../context/LoginContext'

const Home: NextPage = () => {
    const user = useLoginContext()
    const setUser = useSetLoginContext()

    return <div></div>
}

export default Home
