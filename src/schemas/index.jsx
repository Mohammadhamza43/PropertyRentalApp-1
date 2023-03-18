import * as Yup from 'yup'

const signUpSchema = Yup.object({
    name : Yup.string().min(3).max(25).required('Please enter your name'),
    email : Yup.string().email().required('Please enter your email'),
    password : Yup.string().required('Please enter your password'),
    conformPassword : Yup.string().required('Please Enter Confirm password').oneOf([Yup.ref('password'), null],
    'Password must match'),
});

const loginSchema = Yup.object({
    email : Yup.string().email().required('Please enter your email'),
    password : Yup.string().required('Please enter your password'),
});


export { signUpSchema , loginSchema}