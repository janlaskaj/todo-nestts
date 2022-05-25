import { NextPage } from 'next'

const LoginPage: NextPage = () => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
            }}
        >
            <input type="text" />
            <input type="text" />
            <button type={'submit'}>Submit</button>
        </form>
    )
}

export default LoginPage
