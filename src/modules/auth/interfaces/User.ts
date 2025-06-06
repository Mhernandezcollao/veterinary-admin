export interface User {
    _id: string
    firstname: string
    lastname: string
    email: string
    username: string
    level: 'free' | 'vip' | 'premium'
    is_user: boolean
    is_admin: boolean
    login_attempts: number
    login_blocked: boolean
    balance: {
        $numberDecimal: string
    }
    balance_awards: {
        $numberDecimal: string
    }
    balance_unidos_tokens: {
        $numberDecimal: string
    }
    balance_special: {
        $numberDecimal: string
    }
    matrix_reward: {
        $numberDecimal: string
    }
    phone: string
    profile_picture: string
    security_2fa_phone_activated: boolean
    security_2fa_biometric_activated: boolean
    airdrop_wallet: string
    multimatrix_wallet: string
    createdAt: Date
    updatedAt: Date
    disclaimer_accepted: boolean
    has_answered_form: boolean
    member_vip: boolean
    member_vip_expiration_date: Date | null
    member_for_life: boolean
}