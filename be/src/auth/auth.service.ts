import { Injectable } from '@nestjs/common'

@Injectable({})
export class AuthService {
    signIn() {
        return 'signin'
    }

    signUp() {
        return 'signup'
    }
}
