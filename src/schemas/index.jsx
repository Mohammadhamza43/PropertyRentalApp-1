import * as Yup from 'yup'

const signUpSchema = Yup.object({
    name : Yup.string().min(3).max(25).required('Please enter your name'),
    email : Yup.string().email().required('Please enter your email'),
    password : Yup.string().required('Please enter your password'),
    confirmPassword : Yup.string().required('Please Enter Confirm password').oneOf([Yup.ref('password'), null],
    'Password must match'),
});

const loginSchema = Yup.object({
    email : Yup.string().email().required('Please enter your email'),
    password : Yup.string().required('Please enter your password'),
});

const resetSchema = Yup.object({
    email : Yup.string().email().required('Please enter your email'),
});

const resetPasswordSchema = Yup.object({
    password : Yup.string().required('Please enter your password'),
    confirmPassword : Yup.string().required('Please Enter Confirm password').oneOf([Yup.ref('password'), null],
    'Password must match'),
});

const changePasswordSchema = Yup.object({
    password: Yup.string().required('Please enter your password'),
    newPassword: Yup.string().required('Please enter your password'),
    confirmNewPassword: Yup.string().required('Please Enter Confirm password').oneOf([Yup.ref('newPassword'), null],
    'Password must match'),
});


export { signUpSchema , loginSchema , resetSchema , resetPasswordSchema , changePasswordSchema }