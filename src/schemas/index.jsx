import * as Yup from 'yup'

const signUpSchema = Yup.object({
    name : Yup.string().min(3 , "Name must be at least 3 characters").required('Name is required'),
    email : Yup.string().email().required('Email is required'),
    password : Yup.string().min(8 , "Password must be at least 8 characters").required('Password is required'),
    confirmPassword : Yup.string().min(8 , "Confirm password must be at least 8 characters").required('Confirm password is required').oneOf([Yup.ref('password'), null],
    'Password must match'),
});

const loginSchema = Yup.object({
    email : Yup.string().email().required('Email is required'),
    password : Yup.string().required('Password is required'),
});

const resetSchema = Yup.object({
    email : Yup.string().email().required('Email is required'),
});

const resetPasswordSchema = Yup.object({
    password : Yup.string().min(8 , "Password must be at least 8 characters").required('Password is required'),
    confirmPassword : Yup.string().min(8 , "Confirm password must be at least 8 characters").required('Confirm password is required').oneOf([Yup.ref('password'), null],
    'Password must match'),
});

const changePasswordSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    newPassword: Yup.string().min(8 , "Password must be at least 8 characters").required('Password is required'),
    confirmNewPassword: Yup.string().min(8 , "Confirm password must be at least 8 characters").required('Confirm password is required').oneOf([Yup.ref('newPassword'), null],
    'Password must match'),
});


export { signUpSchema , loginSchema , resetSchema , resetPasswordSchema , changePasswordSchema }