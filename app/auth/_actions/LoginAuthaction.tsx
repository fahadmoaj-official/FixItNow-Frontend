'use server'
import { cookies } from 'next/headers';


type LoginState = {
    success: boolean,
    message: string,
    data: {
        
        accessToken: string,
        refreshToken: string
    }
};

export const loginActions = async (prevState: LoginState , formData: FormData) => {
    
    const email = formData.get('email') ;
    const password = formData.get('password') ;

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });



    const result = await response.json(); 
    if(result.success) {
        const cookiesStore = await cookies();

        cookiesStore.set('accessToken', result.data.accessToken, {
            httpOnly: true, 
            maxAge: 60 * 60 * 24, // 1 day
            sameSite: 'lax', 
        });

        cookiesStore.set('refreshToken', result.data.refreshToken, {
            httpOnly: true, 
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'lax', 
        });

        
    }
    return result;
       
}

